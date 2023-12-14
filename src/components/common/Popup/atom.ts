import { atom } from "jotai";
import type { ReactNode } from "react";

export const popupAtom = atom<{ open: boolean; component?: ReactNode }>({
  open: false,
});
