import React, { useState } from "react";
import { categories } from "./whitepaperData";
import Image from "next/image";
import Link from "next/link";

const WhitepaperHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const previousCategoryName =
    currentIndex > 0 ? categories[currentIndex - 1].name : null;
  const nextCategoryName =
    currentIndex < categories.length - 1
      ? categories[currentIndex + 1].name
      : null;

  const goForward = () => {
    if (currentIndex < categories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const imageUrl = categories[currentIndex].image1
    ? categories[currentIndex].image1
    : null;
  const imageUrl2 = categories[currentIndex].image2
    ? categories[currentIndex].image2
    : null;
  const imageUrl3 = categories[currentIndex].image3
    ? categories[currentIndex].image3
    : null;
  const linkUrl = categories[currentIndex].link
    ? categories[currentIndex].link
    : null;
  const jpgUrl = categories[currentIndex].jpgUrl
    ? categories[currentIndex].jpgUrl
    : null;

  return (
    <div className="flex justify-center gap-6 px-4">
      <div className="hidden md:inline-flex flex-col bg-shade rounded-md w-72 mr-6 py-2 max-h-fit">
        {categories.map((category, index) => (
          <div key={category.id} className="pl-4">
            <button
              onClick={() => setCurrentIndex(index)}
              className="hover:pl-4 border-white p-1 px-2 rounded-md"
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>

      <div className="w-full md:w-1/2 rounded-md bg-shade">
        {/* Display information based on the current index */}
        <div className="p-4 overflow-auto h-[600px] scrollbar-track-transparent scrollbar-w-2 scrollbar-thin scrollbar-thumb-white scrollbar-thumb-rounded-md">
          {/* Adjust max-h value as needed */}
          <h1 className="text-4xl underline font-semibold">
            {categories[currentIndex].name}
          </h1>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle}
          </h2>
          <p className="mt-4">{categories[currentIndex].content}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle1}
          </h2>
          <p className="mt-4">{categories[currentIndex].content1}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle2}
          </h2>
          <p className="mt-4">{categories[currentIndex].content2}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle3}
          </h2>
          <p className="mt-4">{categories[currentIndex].content3}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle4}
          </h2>
          <p className="mt-4">{categories[currentIndex].content4}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle5}
          </h2>
          <p className="mt-4">{categories[currentIndex].content5}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle6}
          </h2>
          <p className="mt-4">{categories[currentIndex].content6}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle7}
          </h2>
          <p className="mt-4">{categories[currentIndex].content7}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle8}
          </h2>
          <p className="mt-4">{categories[currentIndex].content8}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle9}
          </h2>
          <p className="mt-4">{categories[currentIndex].content9}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle10}
          </h2>
          <p className="mt-4">{categories[currentIndex].content10}</p>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].subtitle11}
          </h2>
          <p className="mt-4">{categories[currentIndex].content11}</p>

          <h2 className="mt-4">{categories[currentIndex].totalsupply}</h2>
          <h2 className="mt-4">{categories[currentIndex].mintday}</h2>
          <h2 className="mt-4">{categories[currentIndex].price}</h2>
          <h1 className="mt-4 underline text-2xl">
            {categories[currentIndex].utility}
          </h1>
          <h2 className="mt-4 underline text-2xl">
            {categories[currentIndex].util1}
          </h2>
          <h2 className="mt-4">{categories[currentIndex].util2}</h2>
          {linkUrl && (
            <Link href={linkUrl}>
              <div className="p-4 text-black bg-white rounded-md text-center border-black border-2 text-2xl hover:bg-black hover:text-white hover:border-white">
                Foo Dog Traits
              </div>
            </Link>
          )}
          <h2 className="mt-4">{categories[currentIndex].util3}</h2>
          <h2 className="mt-4">{categories[currentIndex].util4}</h2>
          {categories[currentIndex].otherUtil && (
            <h2 className="mt-6 underline text-1xl">
              {categories[currentIndex].otherUtil}
            </h2>
          )}

          <h2 className="mt-4">{categories[currentIndex].util5}</h2>
          <h2 className="mt-4">{categories[currentIndex].util6}</h2>
          <h2 className="mt-4">{categories[currentIndex].util7}</h2>
          <h2 className="mt-4">{categories[currentIndex].util8}</h2>
          <h2 className="mt-6 underline text-2xl">
            {categories[currentIndex].team}
          </h2>
          <p className="mt-4">{categories[currentIndex].teamvesting1}</p>
          <p className="mt-4">{categories[currentIndex].teamvesting2}</p>
          <p className="mt-4">{categories[currentIndex].teamvesting3}</p>
          <div>
            <div className="flex flex-col items-center lg:flex-row gap-4 justify-center">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Description of Image"
                  width={300}
                  height={300}
                  className="mt-4 border-white border-2 rounded-sm"
                />
              )}
              {imageUrl2 && (
                <Image
                  src={imageUrl2}
                  alt="Description of Image"
                  width={300}
                  height={300}
                  className="mt-4 border-white border-2 rounded-sm"
                />
              )}
              {imageUrl3 && (
                <Image
                  src={imageUrl3}
                  alt="Description of Image"
                  width={600}
                  height={600}
                  className="mt-4 border-white border-2 rounded-sm"
                />
              )}
            </div>
          </div>

          <h2 className="mt-4">{categories[currentIndex].note}</h2>
          {jpgUrl && (
            <Link href={jpgUrl}>
              <div className="p-4 text-black bg-white rounded-md text-center border-black border-2 text-2xl hover:bg-black hover:text-white hover:border-white">
                → Buy {categories[currentIndex].subtitle} from jpg.store ←
              </div>
            </Link>
          )}
        </div>
        {/* Adding navigation buttons at the bottom */}
        <div className="p-4 flex gap-2 justify-center ">
          {currentIndex > 0 && (
            <button onClick={goBackward} className="w-1/2 button">
              {previousCategoryName ? `← ${previousCategoryName}` : "Previous"}
            </button>
          )}

          {currentIndex < categories.length - 1 && (
            <button
              onClick={goForward}
              className="w-1/2 button"
              disabled={!nextCategoryName}
            >
              {nextCategoryName ? `${nextCategoryName} →` : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhitepaperHero;
