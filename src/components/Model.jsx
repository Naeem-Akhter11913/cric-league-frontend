import React, { useEffect, useRef } from 'react'
import Register from '../pages/Register'
import Login from '../pages/Login'

const Model = ({ children }) => {
    const dialogRef = useRef(null)


    const handleDialogClick = (e) => {
        if (e.target === dialogRef.current) {
            onClose?.()
        }
    }

    return (
        <el-dialog>
            <dialog
                id="dialog"
                aria-labelledby="dialog-title"
                className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
                ref={dialogRef}
                onClick={handleDialogClick}
            >
                <el-dialog-backdrop className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

                <div tabindex="0" className="flex min-h-full items-end justify-center text-center focus:outline-none sm:items-center sm:p-0">
                    <el-dialog-panel className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[80vw] max-w-[80vw] data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                    <button
                            type="button"
                            command="close"
                            commandfor="dialog"
                            aria-label="Close"
                            className="absolute top-3 right-3 z-10 rounded-md p-1 text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="bg-gray-800">
                            <div className="sm:flex sm:items-start">
                                {/* <Register /> */}
                                {/* <Login /> */}
                                {children}
                            </div>
                        </div>
                        {/* <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" command="close" commandfor="dialog" className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto">Deactivate</button>
                            <button type="button" command="close" commandfor="dialog" className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto">Cancel</button>
                        </div> */}
                    </el-dialog-panel>
                </div>
            </dialog>
        </el-dialog>
    )
}

export default Model