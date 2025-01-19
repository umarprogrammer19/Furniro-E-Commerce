"use client"
import BinIcon from "@/components/icons/bin-icon";
import CountIncrement from "@/components/sections/count-icrement";
import EmptyCartState from "@/components/sections/empty-cart-state";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImportedData } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function CartList() {
  const [cartItems, setCartItems] = useState<ImportedData[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("CART_ITEMS");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);  // Only runs on component mount

  const updateCart = (updatedCart: ImportedData[]) => {
    localStorage.setItem("CART_ITEMS", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const increaseItemCount = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.quantity && item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseItemCount = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.quantity! > 1
        ? { ...item, quantity: (item.quantity && item.quantity - 1) }
        : item
    );
    updateCart(updatedCart);
  };

  if (cartItems.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <section className="col-span-4 lg:w-[750px] h-fit overflow-y-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="bg-[#F9F1E7] hover:bg-[#F9F1E7]">
            <TableHead className="text-myBlack sm:text-center">Product</TableHead>
            <TableHead className="text-myBlack hidden sm:table-cell">Price</TableHead>
            <TableHead className="text-myBlack">Quantity</TableHead>
            <TableHead className="text-myBlack"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item._id} className="hover:bg-transparent">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="w-16 h-16 rounded-[7px]"
                  />
                  <div className="flex flex-col">
                    <p>{item.title}</p>
                    <p className="text-[#9F9F9F] text-xs flex sm:hidden">
                      Rs: {(item.quantity! * Number(item.price)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-myBlack hidden sm:table-cell align-middle">
                Rs: {Number(item.price).toLocaleString()}
              </TableCell>
              <TableCell>
                {item.quantity && <CountIncrement
                  increaseFunction={() => increaseItemCount(item._id)}
                  decreaseFunction={() => decreaseItemCount(item._id)}
                  count={item.quantity}
                  type="cart"
                />}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  className="bg-transparent group hover:bg-transparent"
                  onClick={() => removeFromCart(item._id)}
                >
                  <BinIcon className="w-[22px] h-[22px] fill-[#b88e2fcc] group-hover:fill-myOrange transition-all duration-300" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
