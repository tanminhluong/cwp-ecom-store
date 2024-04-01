import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails } from "@/lib/actions";
import React from "react";

type Props = {
  params: {
    productId: string;
  };
};
const ProductDetails = async ({ params }: Props) => {
  const product = await getProductDetails(params.productId);
  return (
    <div className="flex justify-center items-start gap-16 px-5 py-10 max-md:flex-col max-md:items-center">
      <Gallery media={product.media.reverse()} />
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductDetails;
