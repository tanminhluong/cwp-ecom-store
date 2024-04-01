"use client";

import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "../types";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearCart: () => void;
}

const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentCartItems = get().cartItems;
        const isExsisting = currentCartItems.find(
          (cartItem) => cartItem.item._id === item._id
        );

        if (isExsisting) {
          toast.error("Item already in cart", { icon: "🛒" });
        }

        set({ cartItems: [...currentCartItems, data] });
        toast.success("Item added to cart", { icon: "🛒" });
      },
      removeItem: (idToRemove: string) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== idToRemove
        );
        set({ cartItems: newCartItems });
        toast.success("Item removed from cart");
      },
      increaseQuantity: (idToIncrease: string) => {
        const newCartItems = get().cartItems.map((cartItem) => {
          return cartItem.item._id === idToIncrease
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem;
        });

        set({ cartItems: newCartItems });
        toast.success("Item quantity increased");
      },
      decreaseQuantity: (idToDecrease: string) => {
        const newCartItems = get().cartItems.map((cartItem) => {
          return cartItem.item._id === idToDecrease
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem;
        });

        set({ cartItems: newCartItems });
        toast.success("Item quantity decreased");
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
