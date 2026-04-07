"use client"

import { useAtom } from "jotai";
import BinIcon from "@/components/icons/bin-icon";
import CountIncrement from "@/components/sections/count-icrement";
import EmptyCartState from "@/components/sections/empty-cart-state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICart } from "@/types";
import Image from "next/image";
import { cartAtom } from "@/lib/storage/jotai";
import { getSingleProduct } from "@/lib/api/products";

export default function CartList() {
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const { toast } = useToast();

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    toast({
      title: "Removed",
      description: "Item removed from cart.",
    });
  };

  const increaseItemCount = async (item: ICart) => {
    // Check current stock from server
    try {
      const product = await getSingleProduct(item._id);

      if (item.quantity >= product.stock) {
        toast({
          title: "Stock Limit Reached",
          description: `Only ${product.stock} items available in stock.`,
          variant: "destructive",
        });
        return;
      }

      const updatedCart = cartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error checking stock:", error);
      // If we can't verify stock, still allow increment if we have stock data cached
      if (item.stock && item.quantity >= item.stock) {
        toast({
          title: "Stock Limit Reached",
          description: `Only ${item.stock} items available in stock.`,
          variant: "destructive",
        });
        return;
      }
      const updatedCart = cartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    }
  };

  const decreaseItemCount = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  // Validate cart on mount - remove items with 0 stock
  useEffect(() => {
    const validateCart = async () => {
      const validatedCart: ICart[] = [];

      for (const item of cartItems) {
        try {
          const product = await getSingleProduct(item._id);
          if (product.stock > 0) {
            // Update stock info and ensure quantity doesn't exceed available stock
            validatedCart.push({
              ...item,
              stock: product.stock,
              quantity: Math.min(item.quantity, product.stock),
            });
          } else {
            toast({
              title: "Item Unavailable",
              description: `${item.title} is now out of stock and has been removed from your cart.`,
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error(`Error validating cart item ${item._id}:`, error);
          // Keep item if we can't verify
          validatedCart.push(item);
        }
      }

      if (validatedCart.length !== cartItems.length) {
        setCartItems(validatedCart);
      }
    };

    if (cartItems.length > 0) {
      validateCart();
    }
  }, []); // Run once on mount

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
                      ${(item.quantity * item.price).toLocaleString()}
                    </p>
                    {/* Stock indicator */}
                    {item.stock && item.quantity >= item.stock && (
                      <p className="text-error text-xs">Max stock reached</p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-myBlack hidden sm:table-cell align-middle">
                ${item.price.toLocaleString()}
              </TableCell>
              <TableCell>
                <CountIncrement
                  increaseFunction={() => increaseItemCount(item)}
                  decreaseFunction={() => decreaseItemCount(item._id)}
                  count={item.quantity}
                  type="cart"
                  maxCount={item.stock}
                />
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

// Need to import useEffect
import { useEffect } from "react";
