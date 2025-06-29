import axios from "axios";
import { useEnv } from "../context/env.context";
import { useAuthInfo } from '@propelauth/react';
import { useState, useEffect, useMemo, useCallback } from "react";

export default function useProfileApi(){
    
    const { user } = useAuthInfo();
    
    const { apiServerUrl } = useEnv();

    const [badges, setBadges] = useState(null);
    const [hackathons, setHackathons] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
     
    const default_profile = useMemo(() => {
        return {
            "profile_url": "",
            "profile_image": "https://i.imgur.com/RdOsE7s.png"
        }
    }, []);

    const [profile, setProfile] = useState(default_profile);
    const [feedback_url, setFeedbackUrl] = useState("");


    const update_profile_metadata = async (metadata, onComplete) => {
        if (!user)
            return null;

        const response = await axios({
            // TODO: Cut over to this eventually
            //url: `${apiServerUrl}/api/users/profile`,
            url: `${apiServerUrl}/api/messages/profile`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: {
                // user_id: user_id,
                metadata: metadata
            }
        });
            
        const { data } = response;

        // TODO: When we cut over to the user service, this will return a profile object. There won't be a "text" field.
        onComplete(data.text); // Comes from backend, something like "Updated NPO" when successful
        return data;
    };


    const handle_help_toggle = async (status, problem_statement_id, mentor_or_hacker, npo_id) => {
        if (!user)
            return null;

        if (!status || !problem_statement_id || !mentor_or_hacker || !npo_id){
            console.error("handle_help_toggle: Missing required parameters");
            console.error("status: ", status);
            console.error("problem_statement_id: ", problem_statement_id);
            console.error("mentor_or_hacker: ", mentor_or_hacker);
            console.error("npo_id: ", npo_id);
            return null;
        }
        
        const response = await axios({
            url: `${apiServerUrl}/api/messages/profile/helping`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: {
                // user_id: user_id,
                status: status, // helping or not_helping
                problem_statement_id: problem_statement_id,
                type: mentor_or_hacker, // mentor or hacker
                npo_id: npo_id
            }
        });

        const { data } = response;
        // onComplete(data.text); // Comes from backend, something like "Updated NPO" when successful
        return data;
    };

    // Handle calling /profile/ endpoint by user id using the db id of the user (not the Propel ID or the Slack ID)
    const get_user_by_id = async (user_id, onComplete) => {
        if (!user_id)
            return null;
        
        const response = await axios({  
            url: `${apiServerUrl}/api/users/${user_id}/profile`,
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });

        const { data } = response;

        onComplete(data);
        return data;
    };

    const get_user_profile_by_id = useCallback(async (userId) => {
        if (!userId) return null;
        
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/users/${userId}/profile`
            );
            
            if (!response.ok) {
                throw new Error(`Failed to fetch user profile: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    }, []);
    
    /*
    User is already signed in via Auth0 SDK
    Pass profile data to backend to save the fact that they have logged in
    Also allow backend to link together data from other sources like GitHub/DevPost, etc.
    */

    useEffect(() => {
        const getProfileDetails = async () => {
            console.log("*** getProfileDetails user_id: ", user);
            
            setIsLoading(true);
            
            if (!user) {
                setIsLoading(false);
                return null;
            }

            try {
                const response = await axios({  
                    url: `${apiServerUrl}/api/messages/profile`,
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                });

                const { data } = response;

                if (data) {     
                    console.log("*** getProfileDetails data: ", data);               
                    // TODO: update backend user service to return badges and consume them here
                    setBadges(data.text.badges);
                    // TODO: update backend user service to return hackathons and consume them here
                    setHackathons(data.text.hackathons);

                    /* profileData is expected to have the form:
                        {role: '', education: '', shirt_size: '', profile_url: ''}
                    */
                        
                    var profileData = {
                        role: data.text.role,
                        education: data.text.education,
                        shirt_size: data.text.shirt_size,
                        expertise: data.text.expertise,
                        why: data.text.why,
                        company: data.text.company,
                        github: data.text.github,
                        history: data.text.history,
                        profile_url: window.location.href + "/" + data.text.id,  // /profile/<db id>
                        linkedin_url: data.text.linkedin_url,
                        instagram_url: data.text.instagram_url,  
                        propel_id: data.text.propel_id,
                        // Added address fields
                        street_address: data.text.street_address,
                        street_address_2: data.text.street_address_2,
                        city: data.text.city,
                        state: data.text.state,
                        postal_code: data.text.postal_code,
                        country: data.text.country,
                        // Added sticker preference
                        want_stickers: data.text.want_stickers,
                    };

                    setProfile(profileData);
                    setFeedbackUrl(window.location.href.replace("profile", "feedback") + "/" + data.text.id);
                }
                else {
                    setBadges(null);
                    setHackathons(null);
                    setProfile(default_profile);
                    setFeedbackUrl("");
                }
            } catch (error) {
                console.error("Error fetching profile details:", error);
                setBadges(null);
                setHackathons(null);
                setProfile(default_profile);
                setFeedbackUrl("");
            } finally {
                setIsLoading(false);
            }
        };

        getProfileDetails();
    }, [user, apiServerUrl, default_profile]);
    

    return {              
        badges,
        hackathons,
        profile,
        get_user_by_id,
        feedback_url,
        handle_help_toggle,
        update_profile_metadata,
        get_user_profile_by_id,
        isLoading
    };
};
