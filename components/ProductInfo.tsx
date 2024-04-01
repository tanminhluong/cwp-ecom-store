"use client";

import { ProductType } from "@/lib/types";
import { useState } from "react";
import LikeButton from "./LikeButton";
import { MinusCircle, PlusCircle } from "lucide-react";
import useCartStore from "@/lib/hooks/useCart";

type Props = {
  product: ProductType;
};
const ProductInfo = ({ product }: Props) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const cart = useCartStore();
  return (
    <div className="max-w-[400px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-heading3-bold">{product.title}</p>
        <LikeButton product={product} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium">Category:</p>
        <p className="text-base-bold">{product.category}</p>
      </div>

      <p className="text-heading3-bold">$ {product.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Description</p>
        <p className="text-small-medium text-justify">{product.description}</p>
      </div>

      {product.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Colors:</p>
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <p
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedColor === color ? "bg-black text-white" : ""
                }`}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Sizes:</p>
          <div className="flex gap-2">
            {product.sizes.map((size, index) => (
              <p
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSize === size ? "bg-black text-white" : ""
                }`}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Quantity:</p>
        <div className="flex items-center gap-4">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity((prev) => prev - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity((prev) => prev + 1)}
          />
        </div>
      </div>

      <button
        onClick={() =>
          cart.addItem({
            item: product,
            color: selectedColor,
            size: selectedSize,
            quantity,
          })
        }
        className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductInfo;
