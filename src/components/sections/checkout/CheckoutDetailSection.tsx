"use client";

import { Separator } from "@/components/ui/separator";
import { cartAtom } from "@/lib/storage/jotai";
import { useAtomValue } from "jotai";
import CheckoutButton from "../payment/paymentBtn";

function CheckoutDetailSection() {
  const products = useAtomValue(cartAtom);

  const computeSubTotal = () => {
    let total = 0;
    for (const product of products) {
      total += Number(product.quantity) * Number(product.price);
    }
    return total;
  };

  const totalPrice = computeSubTotal();

  return (
    <section className="w-full sm:w-1/2 mx-auto px-4">
      <div className="flex justify-between text-sm sm:text-base">
        <p className="font-bold">Product</p>
        <p className="font-bold">Subtotal</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 justify-between">
        {products.map((product, index) => (
          <div key={index} className="flex justify-between items-center">
            <p className="text-customGray2">
              {product.title}{" "}
              <span className="font-bold text-black">X {product.quantity}</span>
            </p>
            <p>
              ${Number(product.price) * Number(product.quantity)} (${Number(product.price)} x {Number(product.quantity)})
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 justify-between">
        <div className="flex justify-between items-center">
          <p className="text-customGray2 text-sm">Total</p>
          <p className="text-primary font-bold text-lg sm:text-xl">${totalPrice}</p>
        </div>
      </div>

      <div className="my-[30px]">
        <Separator />
      </div>

      <p className="text-sm sm:text-base">
        Your personal data will be used to support your experience throughout
        this website, to manage access to your account, and for other purposes
        described in our <strong>privacy policy</strong>.
      </p>

      <div className="my-16 flex justify-center">
        <CheckoutButton
          products={products.map((item) => ({
            name: item.title,
            price: item.price,
            quantity: item.quantity,
          }))}
          totalPrice={totalPrice}
        />
      </div>
    </section>
  );
}

export default CheckoutDetailSection;
