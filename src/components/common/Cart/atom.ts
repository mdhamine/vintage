import { atomWithStorage } from "jotai/utils";

interface Cart {
  slug: string;
  size?: string;
  color?: string;
  quantity?: number;
}

export const cartAtom = atomWithStorage("cart", [] as Cart[]);
