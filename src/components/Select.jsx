import { ChevronDown } from "lucide-react";
import React from "react";

const Select = ({ value, options = [] }) => {
    return (
        <div className="relative">
            <select
                defaultValue={value}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
            >
                <option>{value}</option>
                {options.map((o) => (
                    <option key={o}>{o}</option>
                ))}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
    );
}

export default Select