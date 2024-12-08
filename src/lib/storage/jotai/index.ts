import { atomWithStorage } from "jotai/utils";

const cartAtom = atomWithStorage<IProduct[]>("CART_ITEMS", []);
const billingAtom = atomWithStorage<null>("BILLING_ITEM", null);

export { cartAtom, billingAtom };
