import { X } from "lucide-react";

const Modal = ({
  open,
  onClose,
  children,
  onSave,
  onSaveAndAddAnother,
  islogin,
  isModelOpenForUpdate,
  handleUpdate,
  loading
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-fit max-w-[95vw] flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex h-0 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-1 top-1 rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </div>

        {!islogin && <div className="z-20 flex shrink-0 items-center justify-end gap-3 px-2 py-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>

          {isModelOpenForUpdate ?

            <button
              type="button"
              onClick={() => handleUpdate(false)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
            >
              {loading ? "Update...": "Update"}
            </button>
            :
            <>
              <button
                type="button"
                onClick={() => onSaveAndAddAnother(true)}
                className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 cursor-pointer"
              >
                Save & Add Another
              </button>

              <button
                type="button"
                onClick={() => onSave(false)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
              >
                Save
              </button>
            </>}
        </div>}
      </div>
    </div>
  );
};

export default Modal;