import Grid from '@mui/material/Grid';
import {  
  NewsLinkButton,
  SlackButton,  
  TitleStyled,
  TitleContainer,
  CaptionContainer,
  MoreNewsStyle,
  ButtonContainersSmall,
  TextMuted,  
  EventCards,
  BlankContainer,
} from './styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { trackEvent, initFacebookPixel } from '../../lib/ga';
import React from 'react';

import Image from 'next/image'

import Link from 'next/link';

function SingleNews( {newsItem} ) {
  console.log("NEWS ITEM:", newsItem)

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Initialize Facebook Pixel
  useEffect(() => {
    initFacebookPixel();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text + " More at www.ohack.dev/blog"); // Copy the text to clipboard
    setSnackbarMessage('Text copied!');
    setSnackbarOpen(true);
    gaButton("button_copy",text);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
 
  
  const gaButton = async (action, actionName) => {
    console.log("gaButton", "action:", action, "actionName:", actionName);
    
    // Track Google Ads conversion
    trackEvent({ 
      action: "conversion",
      params: {
        send_to: "AW-11474351176/JCk6COG-q4kZEMjost8q"  
      }      
    });

    // Track regular event
    trackEvent({
      action: action,
      params: {
        action_name: actionName,
      },
    });    
  };

  return (
    <EventCards container direction='row' style={{ margin: '2px', padding: '8px' }}>      
        
        <Link prefetch={false} href="/blog">        
        <MoreNewsStyle>        
          <ArrowBackIcon/>
          Back to news
        </MoreNewsStyle>   
        </Link>

        <Link prefetch={false} href="/about">        
        <MoreNewsStyle style={{marginLeft:'5px'}}>        
          <InfoIcon/>&nbsp;
          Read more about us
        </MoreNewsStyle>   
        </Link>

        <BlankContainer xs={12} md={12} lg={12}  key={newsItem.id}>
          <TitleContainer container>          
            <Grid item xs={12} md={12} lg={12}>                          
              {newsItem?.image && (
              <Image
                src={newsItem.image}
                alt={newsItem.title}

                height={150}
                width={150}
                                
                style={{
                  marginBottom: '0.5em',
                  maxWidth: '100%',                  
                }}
              />                              
              )}
                  
                <Typography variant="h2">
                    {newsItem.title}
                </Typography>                
            
                <Typography>This was summarized by AI, see the Slack post for specific details.</Typography>
                <TitleStyled variant="h1">

                <SlackButton onClick={() => gaButton("button_slack_post", newsItem.slack_permalink)} target="_blank" variant="outlined" >
                  <Link href={newsItem.slack_permalink} target='_blank'>
                    Original Slack Post
                  </Link>
                </SlackButton>
              
                <FileCopyIcon // Add the FileCopy icon button
                  onClick={() => handleCopy(`${newsItem.title} ${newsItem.description}`)} // Call handleCopy function on click
                  style={{ cursor: 'pointer', marginLeft: '5px' }}
                />
                
                

              </TitleStyled>
              
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextMuted>
                <CalendarTodayIcon style={{ marginRight: '5px' }} />
                {newsItem.slack_ts_human_readable}
              </TextMuted>
            </Grid>
          </TitleContainer>
          <CaptionContainer style={{ fontSize: '15px'}}>
            {newsItem.description}
          </CaptionContainer>
          {
            // If there are newsItem.links, render them as a button where name is the title, and url is the <Link> href attribute
            // Filter for links where name starts with #
            // 

          } 
          
          <ButtonContainersSmall style={{ justifyContent: 'center', justifyItems: 'center', textAlign: 'center' }}>
          {            
            newsItem.links && newsItem.links.filter((link) => !link.url.startsWith('#')).map((link) => (            
              <NewsLinkButton key={link.name} onClick={ ()=> gaButton("button_news", link.name+":"+link.url) } variant="contained" href={link.url} target="_blank">
                {link.name}
              </NewsLinkButton>
            
          ))}
          </ButtonContainersSmall>

          <ButtonContainersSmall style={{ marginTop: '10px', justifyContent: 'center', justifyItems: 'center', textAlign: 'center' }}>
          {            
            newsItem.links && newsItem.links.filter((link) => link.url.startsWith('#')).map((link) => (            
                <SlackButton 
                  key={link.name} 
                  onClick={ ()=> gaButton("button_slack", link.name+":"+link.url) } 
                  variant="outlined" 
                  size="small" 
                  href={`https://opportunity-hack.slack.com/app_redirect?channel=${link.name}`} 
                  target="_blank">
                #{link.name}
              </SlackButton>
            
          ))}
          </ButtonContainersSmall>    
        </BlankContainer>         
      
      

    

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </EventCards>
  );

}
export default SingleNews;
