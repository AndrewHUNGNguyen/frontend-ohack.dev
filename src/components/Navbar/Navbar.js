import React from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import * as ga from "../../lib/ga";
import ReactPixel from 'react-facebook-pixel';


import Button from "@mui/material/Button";


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
  [ 'About Us', '/about' ],
  [ 'Mentors?', '/about/mentors' ],
  [ 'Rewards ❤️', '/about/hearts' ],
  [ 'Hackathon?' ,'/hack']
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

    const advancedMatching = {
      em: user.email,
      ct: '', // Add the missing properties
      country: '',
      db: '',
      fn: '',
      // Add the remaining properties
    };
    const options = {
      autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
      debug: false, // enable logs
    };
    
    ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID, advancedMatching, options);
    ReactPixel.track('Login Email Set');
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    // Check if logged in
    if (isAuthenticated && user && user.email) {
      ga.event({
        category: 'User',
        action: 'Open User Menu',
        label: user.email,
      });
    }    
  };

  const handleOpenAboutMenu = (event) => {
    setAnchorElAbout(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleCloseAboutMenu = () => {
    setAnchorElAbout(null);
  }


  return (
    <AppBar position="fixed">
       
      <Container maxWidth="xl">
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
                src="https://i.imgur.com/A3FpKQQ.png"
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
                <Link href={setting[1]}>                  
                    <Typography textAlign="center">{setting[0]}</Typography>                  
                </Link>
                </MenuItem>
              ))
              }

              {pages.map((page) => (
                <Link href={page[1]}>
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
            <Link href="/" passHref>
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
              <NavbarLink href={page[1]}><Button                
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
                <Link href={setting[1]}>
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
                <Link href={setting[1]}>
                  <MenuItem key={setting[0]} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting[0]}</Typography>
                  </MenuItem>
                </Link>
              ))
              }
              <MenuItem onClick={() => logout({
                    logoutParams: { returnTo: window.location.href }
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
                <svg
                  fill="none"
                  viewBox="0 0 10 10"
                  stroke="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path className="arrow" d="M3,2 L6,5 L3,8" />
                  <path className="line" d="M3,5 L8,5" />
                </svg>
              </LoginButton>             
            }           


        </Toolbar>
      </Container>
    </AppBar>    
  );
}
