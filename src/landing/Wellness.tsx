import Image from "next/image";

const Wellness = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center md:flex-row gap-4 rounded-md">
        <div className="flex flex-col px-8 py-4 items-center justify-center text-center text-4xl gap-4 ">
          <h1>Lion City</h1>
          <Image
            src={"/LClogosmall.png"}
            alt="Logo"
            width={500}
            height={500}
            className="w-[150px]"
          />
          <h1>Wellness</h1>
        </div>
        <Image
          width={963}
          height={1186}
          className="rounded-md w-[300px]"
          src="/wellnessdropsweb.png"
          alt="lclogo"
        />
      </div>
      <div className="text-lg lg:text-2xl p-2 bg-shade rounded-md text-center">
        <h1>Hemp CBD Products coming soon!</h1>
        <h1>Join our discord for a chance to try these products early!</h1>
      </div>
    </div>
  );
};

export default Wellness;
