"use client";

import { ProductType, UserType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  product: ProductType;
};

const LikeButton = ({ product }: Props) => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users`);

        const data = await res.json();

        setSignedInUser(data);
        setIsLiked(data.wishlist.includes(product._id));
        setLoading(false);
      } catch (error) {
        console.log("[users_GET]", error);
      }
    };

    if (user) {
      getUser();
    }
  }, [user, product._id]);

  const toggleWishList = async () => {
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      }
      setLoading(true);
      const res = await fetch(`/api/users/wishlist`, {
        method: "POST",
        body: JSON.stringify({ productId: product._id }),
      });

      const updatedUser = await res.json();
      setSignedInUser(updatedUser);
      setIsLiked(updatedUser.wishlist.includes(product._id));
      setLoading(false);
    } catch (error) {
      console.log("[wishlish_POST]", error);
    }
  };
  return (
    <button onClick={toggleWishList}>
      <Heart fill={`${isLiked ? "red" : "none"}`} />
    </button>
  );
};

export default LikeButton;
