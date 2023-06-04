import React, { useEffect, useState } from 'react';
import {
  ButtonStyled,
  ButtonBasicStyle,
  ButtonGoldStyle,
  GridStyled,
  TextStyled,
  TitleStyled,
  TitleContainer,
  CaptionContainer,
  ButtonContainers,
  SpanText,
  BlankContainer,
  BackgroundGrid,
} from './styles';
import Typewriter from 'typewriter-effect';
// import { Player } from '@lottiefiles/react-lottie-player';
// import ohack from '../../../public/ohack.png'
import Logo from './Logo'
import { useEnv } from '../../context/env.context';
import ReactPixel from 'react-facebook-pixel';

import * as ga from '../../lib/ga';

function HeroBanner() {
  const { slackSignupUrl } = useEnv();

  const options = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
  };
  const advancedMatching = null; // { em: 'someemail@.com' }; // optional
  ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID, advancedMatching, options);
  

  const openCodeSample = () => {    
    gaButton('slack_button', 'open_join_slack');
    window.open(slackSignupUrl, '_blank', 'noopener noreferrer');
  };

  const gaButton = (action, actionName) => {
    ReactPixel.track(action, { action_name: actionName });

    ga.event({
      action: action,
      params: {
        action_name: actionName,
      },
    });
  };

  // get width of window on resize
  const [width, setWidth] = useState();
  const functionName = () => {
    setInterval(() => {
      setWidth(window.screen.width);
    }, 500);
  };

  window.addEventListener('resize', functionName);

  useEffect(() => {
    setWidth(window.screen.width);
  }, []);

  return (
    <GridStyled
      container
      direction='row'
      justifyContent='center'
      alignItem='center'
    >
      <BackgroundGrid />
      {/* Left Container */}
      <BlankContainer xs={12} md={7} lg={7}>
        <TitleContainer container>
          <TitleStyled variant='h1'>
            The place where
            <SpanText variant='h1'>
              <Typewriter
                options={{
                  strings: ['Nonprofits', 'Hackers', 'Mentors', 'Volunteers'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </SpanText>
            unite
          </TitleStyled>
        </TitleContainer>

        <CaptionContainer right={'true'} container>
          <TextStyled>
            Want to code for social good? Join us!
          </TextStyled>
          <ButtonContainers container>
          {/* Disable for new nonprofit form instead
            <ButtonStyled
              onClick={gaButton('button_build_ohack', 'find_a_problem')}
              href='/nonprofit/tRK5YPrc8vpHQabMYIDO'
            >
              Help us build ohack.dev
            </ButtonStyled>
            */
          }
            <ButtonStyled
              onClick={gaButton('Nonprofit Apply', 'button_nonprofit_apply')}
              href='/nonprofits/apply'
            >
              ⭐️ Nonprofit application
            </ButtonStyled>
            <ButtonGoldStyle onClick={openCodeSample}>
              Join us on Slack to get involved
            </ButtonGoldStyle>
            <ButtonBasicStyle
              onClick={gaButton('button_see_all', 'see_all_nonprofit_projects')}
              href='/nonprofits'
            >
              See all nonprofit projects
            </ButtonBasicStyle>
          </ButtonContainers>
        </CaptionContainer>
      </BlankContainer>
      {/* Right Container */}
      <BlankContainer xs={12} md={5} lg={5} flex justifyContent="center" alignItems="center">
        {width >= 900 && (
          // <Box component='img' src='/ohack.png' maxWidth="450px" />
  //   <svg
  //   width='100%'
  //   height='100%'
  //   viewBox='0 0 2048 978'
  //   version='1.1'
  //   xmlns='http://www.w3.org/2000/svg'
  //   xmlnsXlink='http://www.w3.org/1999/xlink'
  // >
  //   <defs></defs>
  //   <g
  //     id='Cropped_Pay-Blue'
  //     stroke='none'
  //     stroke-width='1'
  //     fill='none'
  //     fill-rule='evenodd'
  //   >
  //     <g
  //       id='Glyphs_Pay-Blue'
  //       transform='translate(104.000000, 63.000000)'
  //       stroke='#003087'
  //     >
  //       <g id='Glyphs'>
  //         <path
  //           d='M219.905803,319.780016 L319.085102,200.980661 C331.689043,186.315068 350,151.818695 350,124.751813 C350,70.7630943 308.800346,27 257.982893,27 C222.437202,27 191.613252,48.4101531 176.303595,79.7639001 C175.833694,80.6663981 174.05262,80.5132957 173.567562,79.5141015 C158.197272,48.2973409 127.433954,27 91.9943699,27 C41.1844955,27 0,70.7630943 0,124.751813 C0,153.567284 13.4755305,180.182917 31.5363794,200.980661 L174.5301,377 L219.905803,319.780016 Z M176.553245,79.4574213 C81.2998881,213.583126 279.091087,208.97394 173.522659,79.4574213'
  //           id='Stroke-9600'
  //           stroke-width='10'
  //           stroke-linecap='round'
  //           stroke-linejoin='round'
  //         ></path>
  //         <path
  //           d='M764.69998,313.003763 L764.69998,50.2378058 C764.69998,37.0882906 776.108868,27 790.111014,27 L1161.0194,27 C1172.89913,27 1183.4605,37.0810537 1184.25007,49.8108265 L1184.30077,338.593574 L1251.99351,338.593574 C1249.36403,360.232016 1230.92148,377 1208.55281,377 L740.4407,377 C718.072035,377 699.636721,360.232016 697,338.593574 L1130.92891,338.593574'
  //           id='Stroke-9262'
  //           stroke-width='10'
  //           stroke-linecap='round'
  //           stroke-linejoin='round'
  //         ></path>
  //         <path
  //           d='M1725.17461,199.630061 L1768.08956,151.328941 C1771.72519,147.353283 1776.18377,137.022817 1781.46533,120.337543 L1630.02229,120.337543 C1633.90585,135.359702 1638.45298,145.690167 1643.6637,151.328941 L1705.53911,222.893904 L1705.53911,283.618435 L1658.24266,297.303232 C1647.07639,300.353665 1635.98514,295.904467 1635.98514,282.453838 L1635.98514,253.929013 L1635.03508,253.376376 C1594.38901,229.81592 1568,186.432334 1568,136.123611 C1568,60.9462104 1629.03786,0 1704.33904,0 C1779.63085,0 1840.67496,60.9462104 1840.67496,136.123611 C1840.67496,185.501906 1814.34533,228.735624 1774.94308,252.60206 L1774.94308,263.367558 L1774.94308,286.138087 C1774.94308,298.105649 1767.102,305.624014 1757.46395,309.420663 L1654.97372,338.92275 L1654.97372,350.528132 C1654.97372,364.999735 1666.72127,376.73313 1681.21897,376.73313 L1731.27808,376.73313 C1745.77266,376.73313 1757.52333,364.999735 1757.52333,350.528132 L1757.52333,331.544887'
  //           id='Stroke-8738'
  //           stroke-width='10'
  //           stroke-linecap='round'
  //           stroke-linejoin='round'
  //         ></path>
  //         <path
  //           d='M426.5,211 L628.314271,211'
  //           style={{transition: "2s"}}
  //           id='Line'
  //           stroke-width='18'
  //           stroke-linecap='square'
  //           stroke-dasharray='15, 50, 15'
  //           // stroke-dasharray='10,43,10'
  //         ></path>
  //         <path
  //           d='M1292.5,211 L1494.31427,211'
  //           id='Line'
  //           stroke-width='18'
  //           stroke-linecap='square'
  //           stroke-dasharray='10,43,10'
  //         ></path>
  //       </g>
  //     </g>
  //     <g
  //       id='Opportunity-Hack_Pay-Blue'
  //       transform='translate(91.000000, 543.000000)'
  //       fill='#003087'
  //     >
  //       <g id='Opportunity-Hack' transform='translate(0.500000, 0.000000)'>
  //         <g id='Hack' transform='translate(1299.000000, 29.000000)'>
  //           <g id='Group-3' transform='translate(10.583009, 0.519110)'>
  //             <path
  //               d='M193.209504,163.990565 C186.38646,171.345568 178.521404,188.678786 170.656347,184.475928 C162.798428,180.265921 171.705497,163.461634 178.521404,156.649858 C185.344448,149.823786 200.025411,131.961637 204.229148,136.1502 C208.040346,139.981377 200.025411,156.649858 193.209504,163.990565 M260.861837,200.758431 C256.12282,193.93236 243.404552,178.021538 236.72425,139.309492 C234.104943,124.077703 235.667963,110.940196 222.564293,109.367697 C209.44635,107.802347 178.521404,129.338424 163.312297,145.620928 C163.312297,145.620928 155.975384,137.193767 122.409721,133.534135 C122.409721,133.534135 120.832427,48.4476891 121.367708,34.2737625 C121.881577,20.0998359 125.043301,2.24483409 109.306051,0.665188206 C93.575938,-0.900162235 93.0477944,14.324479 93.575938,19.0419735 C94.1040815,23.7880589 101.440995,130.903774 98.2792703,136.1502 L49.5401856,137.208063 L49.5401856,45.3098405 C49.5401856,33.7662745 50.5607873,10.6505515 45.3293114,8.02733868 C40.0835613,5.40412584 26.9798917,4.33911573 24.8815917,13.7884001 C22.7904287,23.2448322 20.6921287,30.0709038 21.7341416,34.8169892 C22.7904287,39.5416314 25.9378788,139.831275 25.9378788,139.831275 C25.9378788,139.831275 8.61619791,140.353059 4.94060431,140.889138 C1.28642195,141.418069 0.230134855,148.236993 0.7582784,151.403432 C1.28642195,154.548429 4.94060431,160.838421 10.7144979,161.881988 C16.4883916,162.939851 28.0219047,161.881988 28.0219047,161.881988 C28.0219047,161.881988 29.0710547,203.374497 29.0710547,208.113434 C29.0710547,212.830929 30.1202047,217.040935 37.4642548,217.040935 C44.7940308,217.040935 51.6170744,220.193079 51.6170744,205.490221 L51.6170744,160.302342 L98.2792703,158.736992 C98.2792703,158.736992 104.053164,235.41772 105.109451,241.207373 C106.165738,246.975582 108.785045,248.019149 117.178245,248.019149 C125.557171,248.019149 128.711758,244.859857 128.190751,233.823779 C127.655471,222.816292 123.987014,157.671982 123.987014,157.671982 C123.987014,157.671982 150.222902,158.736992 152.299791,159.265923 C152.299791,159.265923 134.999521,192.345566 150.736771,204.946995 C166.466884,217.569866 194.258654,206.012005 214.706374,164.512349 C214.706374,164.512349 226.760893,194.454143 230.943219,201.794851 C235.154093,209.164149 247.743894,222.816292 256.12282,217.040935 C264.523157,211.25843 265.56517,207.584503 260.861837,200.758431'
  //               id='Fill-1'
  //             ></path>
  //           </g>
  //           <path
  //             d='M323.352079,126.174315 C327.527268,130.941843 326.485255,141.935035 317.064316,145.080031 C307.621966,148.232175 297.123328,151.384319 295.553172,157.695755 C293.983015,163.9786 290.842702,180.261104 299.742635,183.942179 C308.663979,187.630402 317.064316,186.050756 334.878455,178.688606 C352.706868,171.347898 370.021412,161.884318 375.795305,169.239321 C381.562062,176.587176 365.310942,191.840408 357.431612,195.492893 C349.587966,199.181116 329.111698,213.876826 303.418228,213.347895 C277.724759,212.826111 266.705115,190.753955 268.810552,170.27574 C270.894578,149.811821 286.631828,129.219243 296.602322,124.8091 C306.565679,120.406106 315.993755,117.775745 323.352079,126.174315'
  //             id='Fill-4'
  //           ></path>
  //           <path
  //             d='M386.805671,126.70539 C386.805671,126.70539 387.31954,45.8360986 387.847684,32.1625123 C388.375827,18.5103692 396.769028,19.5610838 400.951353,19.5610838 C405.162228,19.5610838 410.921847,23.7639426 410.921847,34.7928728 C410.921847,45.8360986 407.781534,109.372172 407.781534,114.089666 C407.781534,114.089666 435.04516,103.589667 443.416949,100.458966 C451.824424,97.292527 470.69485,96.7778912 473.32843,101.488238 C475.9406,106.227176 477.503619,117.777889 455.49288,122.488236 C433.46073,127.220026 416.681467,133.831666 410.921847,136.047459 C405.162228,138.248956 405.676097,142.444667 414.06216,145.611107 C422.441086,148.756103 482.2355,176.053242 487.488387,179.219681 C492.712726,182.364677 496.395457,190.777543 491.142569,196.031116 C485.911094,201.277542 479.08805,201.799325 469.638563,196.031116 C460.217624,190.248611 406.197104,166.089322 406.197104,166.089322 C406.197104,166.089322 408.302541,201.277542 407.781534,207.574682 C407.253391,213.871822 403.577797,228.060044 394.677865,228.060044 C385.756521,228.060044 382.58766,221.233973 382.58766,205.473253 C382.58766,189.712533 383.658221,157.168968 383.658221,157.168968 C383.658221,157.168968 368.977258,151.386464 370.019271,143.238064 C371.075558,135.111108 386.805671,126.70539 386.805671,126.70539'
  //             id='Fill-6'
  //           ></path>
  //           <g id='Group-10' transform='translate(0.000000, 252.038938)'>
  //             <path
  //               d='M471.843919,31.3222931 C494.746792,33.9169151 518.42047,37.3978542 526.513913,40.0996919 C534.62163,42.8086774 548.110702,36.7259686 553.513467,34.6960164 C558.930507,32.6660643 569.036605,27.255241 566.331654,21.8587133 C563.626703,16.4478901 523.152351,14.4250856 505.595146,11.7232479 C488.045079,9.00711466 342.919797,-11.2709639 221.453919,9.67900024 C99.9737663,30.6432598 -0.601893747,73.8941069 0.0761283722,84.7157534 C0.739876341,95.5231044 20.331147,85.3876389 28.4174529,81.3348823 C36.518033,77.274978 151.260787,32.0013264 224.151733,27.255241 C245.784207,25.8399927 365.216019,19.1497278 471.843919,31.3222931'
  //               id='Fill-8'
  //             ></path>
  //           </g>
  //         </g>
  //         <text
  //           id='Opportunity'
  //           font-family='PayPalSansSmall-Regular, PayPal Sans Small'
  //           font-size='230'
  //           font-weight='normal'
  //         >
  //           <tspan x='0.44140625' y='234'>
  //             Opportunity
  //           </tspan>
  //         </text>
  //       </g>
  //     </g>
  //   </g>
  // </svg>
  <Logo />
          // <Player
          //   src="https://assets1.lottiefiles.com/packages/lf20_vnikrcia.json"
          //   className="player"
          //   loop
          //   autoplay
          //   speed={1}
          //   style={{
          //     width: width >= 1200 ? "100%" : "100%",
          //     height: "50rem",
          //     padding: "0 0",
          //     right: "0",
          //     position: "absolute",
          //   }}
          // />
        )}
      </BlankContainer>
    </GridStyled>
  );
}

export default HeroBanner;
