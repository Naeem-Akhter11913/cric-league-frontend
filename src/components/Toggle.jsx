import React from "react";

const Toggle = ({ checked, onChange }) => {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer"
        style={{display:'none'}}
      />
      <div
        className="
          relative h-5 w-9 flex-shrink-0 rounded-full bg-slate-300
          transition-colors
          after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4
          after:rounded-full after:bg-white after:shadow-sm
          after:transition-transform after:content-['']
          peer-checked:bg-indigo-600 peer-checked:after:translate-x-4
          peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100
        "
      />      
    </label>
  );
};

export default Toggle;