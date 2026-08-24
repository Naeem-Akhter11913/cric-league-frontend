import React from "react";

const SectionHeader = ({ icon: Icon, title, subtitle }) => {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

export default SectionHeader