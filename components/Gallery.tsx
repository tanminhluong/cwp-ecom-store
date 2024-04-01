"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  media: string[];
};
const Gallery = ({ media }: Props) => {
  const [mainImage, setMainImage] = useState(media[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px] ">
      <Image
        src={mainImage}
        alt="media gallery"
        title="media gallery"
        width={500}
        height={500}
        className="object-cover  rounded-lg w-96 h-96 shadow-xl"
      />
      <div className="flex items-center gap-3 tailwind-scrollbar-hide overflow-auto">
        {media.map((image: string, index: number) => (
          <Image
            onClick={() => setMainImage(image)}
            key={index}
            src={image}
            alt="media gallery"
            title="media gallery"
            width={200}
            height={200}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer  ${
              mainImage === image ? "border-2 border-black" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
