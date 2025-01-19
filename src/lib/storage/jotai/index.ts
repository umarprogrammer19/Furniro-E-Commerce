import { ICart } from "@/types";
import { atomWithStorage } from "jotai/utils";

const cartAtom = atomWithStorage<ICart[]>("CART_ITEMS", []);
const billingAtom = atomWithStorage<null>("BILLING_ITEM", null);

export { cartAtom, billingAtom };
