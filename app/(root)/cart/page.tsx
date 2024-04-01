"use client";

import useCartStore from "@/lib/hooks/useCart";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartPage = () => {
  const cart = useCartStore();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );

  const totalRounded = parseFloat(total.toFixed(2));
  return (
    <div className="flex  gap-20 py-16 px-10 max-lg:flex-col">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length > 0 ? (
          <div className="flex flex-col gap-3">
            {cart.cartItems.map((cartItem, index) => (
              <div
                key={index}
                className="flex hover:bg-grey-1 px-6 py-5 justify-between items-center w-full gap-4 max-sm:flex-col max-sm:items-start"
              >
                <div className="flex gap-3 w-1/2">
                  <Image
                    src={cartItem.item.media[0]}
                    alt={cartItem.item.title}
                    title={cartItem.item.title}
                    width={120}
                    height={120}
                    className="object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                    <p className="text-small-medium">${cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() =>
                      cartItem.quantity > 1 &&
                      cart.decreaseQuantity(cartItem.item._id)
                    }
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-body-bold">No item in cart</p>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full rounded-lg px-4 py-5 bg-grey-1 flex flex-col gap-8">
        <p className="text-heading4-bold pb-4">
          Order Summary{" "}
          <span>{`(${cart.cartItems.length}) ${
            cart.cartItems.length > 1 ? "items" : "item"
          }`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total</span>
          <span>${totalRounded}</span>
        </div>
        <button className="bg-black text-white text-body-semibold rounded-lg py-4 hover:opacity-90">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
