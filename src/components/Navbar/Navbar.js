import React, { useEffect } from 'react';
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import * as ga from "../../lib/ga";

import Button from "@mui/material/Button";
import ReactPixel from "react-facebook-pixel";


import {  
  LoginButton,
  // LogoutButton,
  
  NavbarLink,
  NavbarButton,  
} from "./styles";
import {  
  Typography,
} from "@mui/material";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';


import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuth0 } from "@auth0/auth0-react";


/*
TODO: In the future we may want to show notifications using something like this
import NotificationsActive from '@mui/icons-material/NotificationsActive';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
*/


const pages = [
  [ 'Submit Project', '/nonprofits/apply' ],
  [ 'Projects', '/nonprofits' ],      
  [ 'Join Slack', '/signup'],
  [ 'GitHub', 'https://github.com/opportunity-hack/' ]
];

const about_settings = [
  [ 'ℹ️ About Us', '/about' ],
  [ '🙏 Mentors?', '/about/mentors' ],
  [ '❤️ Rewards', '/about/hearts' ],
  [ '✅ Project Completion', '/about/completion' ],
  [ '🎉 Hackathon?' ,'/hack']
];

const auth_settings = [
  [ 'Profile', '/profile' ],  
];





export default function NavBar() {  
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElAbout, setAnchorElAbout] = React.useState(null);  

  if (isAuthenticated && user && user.email) {    
    ga.set(user.email);  
    
    ReactPixel.track('Login Email Set');
  }

  
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      var advancedMatching = undefined;
      if( isAuthenticated && user && user.email )
      {
        advancedMatching = {
          em: user.email,
          ct: '', // Add the missing properties
          country: '',
          db: '',
          fn: '',
          // Add the remaining properties
        };
      }
      
      const options = {
        autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
        debug: false, // enable logs
      };

      ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID, advancedMatching, options);
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    // Check if logged in
    if (isAuthenticated && user && user.email) {
      ga.event({
        action: "Open User Menu",
        params: {
          category: 'User',          
          label: user.email,
        }
      });

      /*
      <!-- Event snippet for Page view conversion page
      In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button. -->
      <script>
      function gtag_report_conversion(url) {
        var callback = function () {
          if (typeof(url) != 'undefined') {
            window.location = url;
          }
        };
        gtag('event', 'conversion', {
            'send_to': 'AW-11474351176/JCk6COG-q4kZEMjost8q',
            'event_callback': callback
        });
        return false;
      }
      </script>
      */    

      ga.event({ 
        action: "conversion",
        params: {
          send_to: "AW-11474351176/JCk6COG-q4kZEMjost8q"  
        }      
      });

    }    
  };

  const handleOpenAboutMenu = (event) => {
    ga.event({ 
        action: "conversion",        
        params: {
          "category": "handleOpenAboutMenu",
          send_to: "AW-11474351176/JCk6COG-q4kZEMjost8q"  
        }      
      });

    setAnchorElAbout(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    ga.event({ 
        action: "conversion",        
        params: {
          "category": "handleCloseNavMenu",
          send_to: "AW-11474351176/JCk6COG-q4kZEMjost8q"  
        }      
      });

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    ga.event({ 
        action: "conversion",        
        params: {
          "category": "handleCloseUserMenu",
          send_to: "AW-11474351176/JCk6COG-q4kZEMjost8q"  
        }      
      });

    setAnchorElUser(null);
  };
  
  const handleCloseAboutMenu = () => {
    ga.event({ 
        action: "conversion",        
        params: {
          "category": "handleCloseAboutMenu",
          send_to: "AW-11474351176/JCk6COG-q4kZEMjost8q"  
        }      
      });

    setAnchorElAbout(null);
  }


  return (
    <AppBar key="navbar" position="fixed">
       <Head>
        <link rel="preload" href="https://cdn.ohack.dev/ohack.dev/ohack_white.webp" as="image" />
       </Head>
      <Container key="navbarcontainer" maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >            
            <Image
                className="nav-bar__logo"
                src="https://cdn.ohack.dev/ohack.dev/ohack_white.webp"
                alt="Opportunity Hack logo"
                width={100}
                height={86}            
                justifyContent="center"
                alignItems="center"
                alignContent="center"                              
                style={{ cursor: "pointer" }}
              />            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >              

              {about_settings.map((setting) => (
                <MenuItem key={setting[0]} onClick={handleCloseNavMenu}>
                <Link prefetch={false} href={setting[1]}>                  
                    <Typography textAlign="center">{setting[0]}</Typography>                  
                </Link>
                </MenuItem>
              ))
              }

              {pages.map((page) => (
                <Link prefetch={false} href={page[1]}>
                  <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page[0]}</Typography>
                  </MenuItem>
                </Link>
              ))}
            

            </Menu>
          </Box>
          
          {
            // Only display Image on mobile
          }
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Link prefetch={false} href="/" passHref>
              <Image                                    
                  src="https://i.imgur.com/A3FpKQQ.png"
                  alt="Opportunity Hack logo"
                  width={100}
                  height={46}                                              
                />
            </Link>
          </Box>          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavbarLink prefetch={false} href={page[1]}><Button                
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >                
                {page[0]}
              </Button>
              </NavbarLink>
            ))}

            <Tooltip title="About Us">
              <NavbarButton                
                onClick={handleOpenAboutMenu}
                sx={{ my: 1, color: 'white', display: 'block' }}
              >
                About
              </NavbarButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElAbout}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElAbout)}
              onClose={handleCloseAboutMenu}
            >
              {about_settings.map((setting) => (
                <Link prefetch={false} href={setting[1]}>
                  <MenuItem key={setting[0]} onClick={handleCloseAboutMenu}>
                    <Typography textAlign="center">{setting[0]}</Typography>
                  </MenuItem>
                </Link>
              ))
              }
            </Menu> 
          </Box>

          { isAuthenticated && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile details">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.nickname} src={user?.picture} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {auth_settings.map((setting) => (
                <Link prefetch={false} href={setting[1]}>
                  <MenuItem key={setting[0]} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting[0]}</Typography>
                  </MenuItem>
                </Link>
              ))
              }
              <MenuItem onClick={() => logout({
                    logoutParams: { returnTo: window.location.origin }
                  })}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>


              
            </Menu>         
          </Box>
        }

        { !isAuthenticated && <LoginButton
                variant="contained"
                disableElevation
                  onClick={() => loginWithRedirect({
                    appState: {
                      returnTo: window.location.pathname,
                      redirectUri: window.location.pathname,
                    },
                  })}
                className="login-button"
              >
                Log In                
              </LoginButton>             
            }           


        </Toolbar>
      </Container>
    </AppBar>    
  );
}
