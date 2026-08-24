import { ChevronDown } from "lucide-react";
import React from "react";

const SelectInput = ({ icon: Icon, value, onChange, placeholder, options }) => {
    return (
        <div className="relative">
            <Icon className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
                value={value}
                onChange={onChange}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                style={{ color: value ? "#334155" : "#94a3b8" }}
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                {options.map((opt) =>
                    typeof opt === "string" ? (
                        <option key={opt} value={opt} className="text-slate-700">
                            {opt}
                        </option>
                    ) : (
                        <option key={opt.value} value={opt.value} className="text-slate-700">
                            {opt.label}
                        </option>
                    )
                )}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
    );
}

export default SelectInput