import React from 'react';

const GithubIcon = ({ size = 18, color = '#fff' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.2-1 4-6 4-6a3.5 3.5 0 0 0-1-3c.2-1 .2-2-0.8-3.5c0 0-1.5 0-3 1.5c-1.6-.5-3.2-.5-4.8 0C6 2 4.5 2 4.5 2c-1 1.5-1 2.5-.8 3.5a3.5 3.5 0 0 0-1 3c0 0 .8 5 4 6a4.8 4.8 0 0 0-1 3.5v4" />
      <path d="M9 18c-4.5 1-4.5-2-4.5-2" />
    </svg>
  );
};

export default GithubIcon;