"use client";

import { Plus } from "lucide-react";
import { Toaster, ToastBar, toast } from "react-hot-toast";

export const AppToaster = () => {
  return (
    <Toaster>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="rotate-45 bg-gray-100 p-0.5 rounded-full grid place-items-center"
                >
                  <Plus size={20} />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
