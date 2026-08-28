import React from "react";

const DeleteComponent = ({ onCancel, onDelete }) => {
  return (
    <div className="w-full">
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg bg-slate-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-600"
        >
          Cancel
        </button>

        <button
          onClick={onDelete}
          className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};


export default DeleteComponent