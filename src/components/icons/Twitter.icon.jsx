// src/components/SocialButtons/TwitterIcon.jsx
import React from 'react';

const TwitterIcon = ({ size = 18, color = '#fff' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color} // Sử dụng stroke cho màu icon
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-17 11.6c2.2.1 4.4-.6 6-2C3 15.5.5 9.4 3 4c2.5 2.1 5.8 2.5 9 2.2c0-1.6 1-3.2 3-4.5C18 3.5 20 2 22 4z"/>
    </svg>
  );
};

export default TwitterIcon;