import React, { useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md animate-slide-in
        ${type === "success"
          ? "bg-emerald-500/15 text-emerald-100 border-emerald-400/20"
          : "bg-rose-500/15 text-rose-100 border-rose-400/20"
        }`}
    >
      {isSuccess ? (
        <CheckCircleIcon className="h-6 w-6 flex-shrink-0 text-emerald-300" />
      ) : (
        <XCircleIcon className="h-6 w-6 flex-shrink-0 text-rose-300" />
      )}
      <span className="font-medium text-sm sm:text-base">{message}</span>

      <button
        onClick={onClose}
        className="ml-2 text-slate-300 hover:text-white transition"
      >
        ✖
      </button>
    </div>
  );
};

export default Toast;
