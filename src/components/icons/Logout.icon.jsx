import React from 'react';

const LogoutIcon = ({ size = 18, color = '#fff' }) => {
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
            <line x1="12" y1="2" x2="12" y2="12" />
            <path d="M5.5 7.5a9 9 0 1 0 13 0" />
        </svg>
    );
};

export default LogoutIcon;
