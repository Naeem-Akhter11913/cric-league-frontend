import React from 'react'
import { teamColors } from '../utils/teams.utils';

const FeaturedBanner = ({ name }) => {

    const c = teamColors[name] || { bg: "#6366F1", fg: "#FFFFFF" };
    return (
        <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${c.bg}, ${c.bg}99)` }}
        >
            <span className="text-white text-sm font-semibold tracking-wide">{name}</span>
        </div>
    );
}

export default FeaturedBanner