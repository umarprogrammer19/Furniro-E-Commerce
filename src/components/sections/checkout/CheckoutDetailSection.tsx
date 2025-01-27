"use client";

import { Separator } from "@/components/ui/separator";
import { cartAtom } from "@/lib/storage/jotai";
import { useAtomValue } from "jotai";
import { useState } from "react";
import CheckoutButton from "../payment/paymentBtn";

function CheckoutDetailSection() {
  const [loading, setLoading] = useState(false);
  const products = useAtomValue(cartAtom);

  const computeSubTotal = () => {
    let total = 0;
    for (const product of products) {
      total += Number(product.quantity) * Number(product.price);
    }
    return total;
  };

  return (
    <section>
      <div className="flex justify-between">
        <p className="font-bold text-[18px]">Product</p>
        <p className="font-bold text-[18px]">Subtotal</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 justify-between">
        {products.map((product, index) => (
          <div key={index} className="flex justify-between">
            <p className="text-customGray2 text-sm ">
              {product.title}{" "}
              <span className="font-bold text-black">X {product.quantity}</span>
            </p>
            <p>{Number(product.price) * Number(product.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 justify-between">
        <div className="flex justify-between">
          <p className="text-customGray2 text-sm ">Total</p>
          <p className="text-primary font-bold text-[20px]">
            Rs. {computeSubTotal()}
          </p>
        </div>
      </div>

      <div className="my-[30px]">
        <Separator />
      </div>

      <p>
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
        />
      </div>
    </section>
  );
}

export default CheckoutDetailSection;
