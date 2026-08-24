import React from 'react'

const FieldLabel = ({ title, subtitle }) => {
    return (
        <div className="mb-2">
            <p className="text-sm font-semibold text-slate-800">{title}</p>
            {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
    );
}

export default FieldLabel;