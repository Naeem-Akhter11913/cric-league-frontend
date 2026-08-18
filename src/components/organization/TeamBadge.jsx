import React from 'react'
import { TEAM_COLORS } from '../../data/player';
import { initials } from '../../utils/org.utils';

const TeamBadge = ({ name, size = 36 }) => {
    const c = TEAM_COLORS[name] || { bg: "#9CA3AF", text: "#FFFFFF" };
    return (
        <div
            className="rounded-full flex items-center justify-center font-bold shrink-0"
            style={{ width: size, height: size, background: c.bg, color: c.text, fontSize: size * 0.34 }}
        >
            {initials(name)}
        </div>
    );
};

export default TeamBadge