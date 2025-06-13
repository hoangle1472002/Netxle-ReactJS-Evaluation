import React, { useState } from 'react';
import { Button } from 'reactstrap';
import FacebookIcon from './icons/Facebook.icon';
import TwitterIcon from './icons/Twitter.icon';
import MailIcon from './icons/Mail.icon';
import GithubIcon from './icons/Github.icon';

const SocialButtons = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const commonButtonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '5px',
    padding: '0',
    transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
    border: '1px solid transparent',
  };

  const socialColors = {
    facebook: {
      base: '#3B5998',
      hover: '#314A7F',
    },
    twitter: {
      base: '#00ACEE',
      hover: '#008CC6',
    },
    mail: {
      base: '#DB3236',
      hover: '#B5292D',
    },
    github: {
      base: '#211F1F',
      hover: '#0A0A0A',
    },
  };

  const getButtonStyle = (iconName) => {
    const { base, hover } = socialColors[iconName];
    const currentBackground = hoveredIcon === iconName ? hover : base;

    return {
      ...commonButtonStyle,
      backgroundColor: currentBackground,
      borderColor: currentBackground,
      color: 'white'
    };
  };


  return (
    <div className="d-flex justify-content-center gap-3 w-100">
      {/* Facebook Button */}
      <Button
        className="social-button"
        style={getButtonStyle('facebook')}
        onMouseEnter={() => setHoveredIcon('facebook')}
        onMouseLeave={() => setHoveredIcon(null)}
        aria-label="Login with Facebook"
      >
        <FacebookIcon />
      </Button>

      {/* Twitter Button */}
      <Button
        className="social-button"
        style={getButtonStyle('twitter')}
        onMouseEnter={() => setHoveredIcon('twitter')}
        onMouseLeave={() => setHoveredIcon(null)}
        aria-label="Login with Twitter"
      >
        <TwitterIcon />
      </Button>

      {/* Mail Button (Google) */}
      <Button
        className="social-button"
        style={getButtonStyle('mail')}
        onMouseEnter={() => setHoveredIcon('mail')}
        onMouseLeave={() => setHoveredIcon(null)}
        aria-label="Login with Google"
      >
        <MailIcon />
      </Button>

      {/* Github Button */}
      <Button
        className="social-button"
        style={getButtonStyle('github')}
        onMouseEnter={() => setHoveredIcon('github')}
        onMouseLeave={() => setHoveredIcon(null)}
        aria-label="Login with GitHub"
      >
        <GithubIcon />
      </Button>
    </div>
  );
}

export default SocialButtons;