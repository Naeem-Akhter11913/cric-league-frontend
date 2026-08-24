import React from "react";

const Field = ({ label, hint, children }) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
                {label}
            </label>
            {children}
            {hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
        </div>
    );
}

export default Field