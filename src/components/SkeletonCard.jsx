import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-[var(--color-bg-dark)] border border-[var(--color-border-dark)]">
      <div className="h-40 bg-white/5 animate-pulse" />
      <div className="p-5 pt-9 space-y-3">
        <div className="h-4 w-2/3 mx-auto bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-1/2 mx-auto bg-white/10 rounded animate-pulse" />
        <div className="h-8 w-full bg-white/10 rounded animate-pulse mt-4" />
      </div>
    </div>
  );
}