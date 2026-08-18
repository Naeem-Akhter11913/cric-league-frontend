import React from 'react'

const DashboardFooter = () => {
    return (
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-sm text-slate-400 sm:flex-row">
            <span>© 2026 Cric League. All rights reserved.</span>
            <div className="flex items-center gap-3">
                <a href="#" className="hover:text-slate-600">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-slate-600">Terms of Service</a>
            </div>
        </div>
    )
}

export default DashboardFooter