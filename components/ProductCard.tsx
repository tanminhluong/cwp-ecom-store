"use client";

import Image from "next/image";
import Link from "next/link";

import { ProductType, UserType } from "@/lib/types";
import LikeButton from "./LikeButton";

type ProductCardProps = {
  product: ProductType;
};
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Link href={`/products/${product._id}`} className="flex flex-col gap-2">
        <Image
          src={product.media[0]}
          alt={product.title}
          title={product.title}
          width={250}
          height={250}
          className="h-[250px] rounded-lg object-cover"
        />
        <div>
          <p className="text-base-bold">{product.title}</p>
          <p className="text-small-medium text-grey-2">{product.category}</p>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <p className="text-body-bold">${product.price}</p>
        <LikeButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
