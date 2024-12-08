import { Button } from "@/components/ui/button";
import Link from "next/link";
import EmptyCart from "@/components/icons/empty-cart";

export default function EmptyCartState() {
  return (
    <section className="col-span-4 lg:w-full h-fit flex flex-col items-center justify-center gap-5">
      <EmptyCart className="w-[100px] h-[100px] fill-myBlack" />
      <div className="flex flex-col gap-3 items-center">
        <p className="text-xl text-myBlack font-semibold">
          Your cart is empty.
        </p>
        <Button
          asChild
          className="font-white bg-myOrange font-medium hover:bg-[#b88e2fcc]"
        >
          <Link href={`/shop`}>Add Items</Link>
        </Button>
      </div>
    </section>
  );
}
