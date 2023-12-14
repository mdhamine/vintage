"use client";

import { useAtom } from "jotai";
import { popupAtom } from "./atom";

interface Props {}

export const Popup = (props: Props) => {
  const [popupState, setPopupState] = useAtom(popupAtom);

  return popupState.open ? (
    <div
      className="fixed inset-0 z-10 bg-black/40 grid place-items-center"
      onClick={() => setPopupState({ open: false, component: undefined })}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-aos="fade-up"
        className="w-full grid place-items-center"
      >
        {popupState?.component}
      </div>
    </div>
  ) : null;
};
