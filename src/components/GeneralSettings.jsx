import React, { useState } from 'react'
import { Save, Upload } from 'lucide-react'
import FieldLabel from './FieldLabel'
import Select from './Select'
import Toggle from './Toggle'

const GeneralSettings = () => {
    const [maintenance, setMaintenance] = useState(false);
    return (
        <div className="min-w-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">General Settings</h3>
                    <p className="text-sm text-slate-400">Configure basic application settings</p>
                </div>
                <button className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50">
                    <Save size={15} />
                    Save Changes
                </button>
            </div>

            {/* Application name */}
            <div className="border-b border-slate-100 pb-6">
                <FieldLabel title="Application Name" subtitle="This name will be shown across the application" />
                <input
                    defaultValue="Cric League"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-300"
                />
            </div>

            {/* Application logo */}
            <div className="border-b border-slate-100 py-6">
                <FieldLabel title="Application Logo" subtitle="Upload your tournament or organization logo" />
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-2xl">
                        🏏
                    </div>
                    <div>
                        <button className="flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50">
                            <Upload size={15} />
                            Change Logo
                        </button>
                        <p className="mt-1.5 text-xs text-slate-400">PNG, JPG or SVG (Max. 2MB)</p>
                    </div>
                </div>
            </div>

            {/* Timezone / Date format */}
            <div className="grid grid-cols-1 gap-6 border-b border-slate-100 py-6 sm:grid-cols-2">
                <div>
                    <FieldLabel title="Default Timezone" subtitle="Set the default timezone for the application" />
                    <Select value="(UTC+05:30) Asia/Kolkata" options={["(UTC+00:00) London", "(UTC-05:00) New York"]} />
                </div>
                <div>
                    <FieldLabel title="Date Format" subtitle="Select the date format" />
                    <Select value="DD MMM YYYY (25 May 2026)" options={["MM/DD/YYYY", "YYYY-MM-DD"]} />
                </div>
            </div>

            {/* Time format / Currency */}
            <div className="grid grid-cols-1 gap-6 border-b border-slate-100 py-6 sm:grid-cols-2">
                <div>
                    <FieldLabel title="Time Format" subtitle="Select the time format" />
                    <Select value="12 Hour (01:30 PM)" options={["24 Hour (13:30)"]} />
                </div>
                <div>
                    <FieldLabel title="Currency" subtitle="Select default currency" />
                    <Select value="INR (₹) - Indian Rupee" options={["USD ($) - US Dollar", "EUR (€) - Euro"]} />
                </div>
            </div>

            {/* Language */}
            <div className="border-b border-slate-100 py-6 sm:w-1/2 sm:pr-3">
                <FieldLabel title="Language" subtitle="Select application language" />
                <Select value="English" options={["Hindi", "Spanish"]} />
            </div>

            {/* Maintenance mode */}
            <div className="flex items-center justify-between pt-6">
                <div>
                    <p className="text-sm font-semibold text-slate-800">Maintenance Mode</p>
                    <p className="text-xs text-slate-400">
                        Enable maintenance mode to restrict access to the application
                    </p>
                </div>
                <Toggle checked={maintenance} onChange={() => setMaintenance((v) => !v)} />
            </div>
        </div>
    )
}

export default GeneralSettings