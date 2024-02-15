import React, { useState, useEffect } from "react";
import Image from "next/image";
import images from "./images.json"; // Make sure this path is correct

const ImageRotator = () => {
  // Initialize a state with an array of starting indexes for each image slot
  const [imageIndexes, setImageIndexes] = useState<number[]>([0, 1, 2]);

  // Effect to rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) =>
        prevIndexes.map((index) => (index + 1) % images.length)
      );
    }, 3000); // Rotate images every 3 seconds

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // Helper function to get the image source from the array
  const getImageSrc = (index: number): string => `/${images[index]}`;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="mr-[-100px]">
        <Image
          src={getImageSrc(imageIndexes[0])}
          alt="Dynamic Image"
          priority
          width={250}
          height={250} // Adjust height based on your image aspect ratio
        />
      </div>
      <div>
        <Image
          src={getImageSrc(imageIndexes[1])}
          alt="Dynamic Image"
          priority
          width={300}
          height={300} // Adjust height based on your image aspect ratio
        />
      </div>
      <div className="ml-[-100px]">
        <Image
          src={getImageSrc(imageIndexes[2])}
          alt="Dynamic Image"
          priority
          width={350}
          height={350} // Adjust height based on your image aspect ratio
        />
      </div>
    </div>
  );
};

export default ImageRotator;
