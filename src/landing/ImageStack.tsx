import Image from "next/image";

const ImageStack = () => {
  return (
    <div className="image-stack">
      <Image
        src="/images/image1.png"
        alt="Image 1"
        className="stacked-image"
        style={{ transform: "rotate(-10deg)" }}
      />
      <Image
        src="/images/image2.png"
        alt="Image 2"
        className="stacked-image"
        style={{ transform: "rotate(5deg)" }}
      />
      <Image
        src="/images/image3.png"
        alt="Image 3"
        className="stacked-image"
        style={{ transform: "rotate(-5deg)" }}
      />
    </div>
  );
};

export default ImageStack;
