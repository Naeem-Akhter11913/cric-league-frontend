import React from 'react'

const ScoreCrest = ({ color, size = 40 }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 40 46" fill="none">
            <path d="M20 1 L37 8 V22 C37 33 30 41 20 45 C10 41 3 33 3 22 V8 Z" fill={color} opacity="0.16" />
            <path d="M20 1 L37 8 V22 C37 33 30 41 20 45 C10 41 3 33 3 22 V8 Z" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="20" cy="20" r="8" fill={color} opacity="0.9" />
            <path d="M15 20 L18.5 23.5 L25.5 16.5" stroke="#0a0a14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default ScoreCrest