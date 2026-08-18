import React from 'react'
import { MEDAL_COLORS } from '../data/ranking.utils';

const RankBadge = ({ rank }) => {
  const medal = MEDAL_COLORS[rank];
    if (!medal) {
      return (
        <span className="font-body font-semibold" style={{ color: "var(--color-text-onLight-faint)", fontSize: "var(--fs-sm)" }}>
          {rank}
        </span>
      );
    }
    return (
      <span
        className="inline-flex items-center justify-center w-6 h-6 rounded-full font-display font-bold"
        style={{ backgroundColor: `${medal}26`, color: medal, fontSize: "var(--fs-xs)" }}
      >
        {rank}
      </span>
    );
}

export default RankBadge