import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Assuming a common aspect ratio for demonstration purposes.
  // You may need a more dynamic approach if your images vary significantly.
  const aspectRatio = 3 / 2; // Common aspect ratio (for example, 3:2)
  const width = 1000; // Base width for high-resolution images

  return (
    <div
      className={`image-container ${className || ""}`}
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
      }}
    >
      {isLoading && <div className="loader"></div>}
      <Image
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={isLoading ? "hidden" : ""}
        width={width}
        height={width / aspectRatio}
      />
    </div>
  );
};

export default ImageWithLoader;
