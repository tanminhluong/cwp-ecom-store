import { NEXT_PUBLIC_API_URL } from "@/constants/configGlobal";

export const getCollections = async () => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/collections`);

  return res.json();
};

export const getProducts = async () => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/products`);

  return res.json();
};

export const getProductDetails = async (productId: string) => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/products/${productId}`);
  return res.json();
};
