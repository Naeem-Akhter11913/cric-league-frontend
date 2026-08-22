import React, { useState } from 'react'

const UserLogout = ({ onLogout, onCancel }) => {

  

  return (
    <div>
      <p className="mt-2 text-sm text-gray-400">
        Are you sure you want to log out of your account? You'll need to sign in again to continue.
      </p>

      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          onClick={onCancel}
          // disabled={isLoggingOut}
          className="inline-flex justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold
                     text-white shadow-sm ring-1 ring-white/20 ring-inset transition-colors
                     hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-red-500
                     disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          onClick={onLogout}
          // disabled={isLoggingOut}
          className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold
                     text-white shadow-sm transition-colors hover:bg-red-500 focus:outline-none
                     focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800
                     disabled:cursor-not-allowed disabled:opacity-60"
        >
          {/* {isLoggingOut ? 'Logging out...' : 'Log out'} */}
          Log out
        </button>
      </div>
    </div>
  )
}

export default UserLogout