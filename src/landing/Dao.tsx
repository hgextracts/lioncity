import Image from "next/image";

const Dao = () => {
  return (
    <div className="grid grid-cols-1 p-4 lg:grid-cols-2 gap-2">
      <Image
        width={745}
        height={806}
        className="w-[300px] justify-self-center rounded-md border-[1px] border-text"
        src="/Executiveweb.png"
        alt="newlion"
      />
      <div className="flex flex-col h-full items-center justify-between gap-4 p-2 xl:text-xl">
        <div className="flex flex-col bg-radial-shade-background-opposite rounded-md p-2">
          <h1 className="text-2xl lg:text-3xl">
            Lion City Executives need YOU!
          </h1>
          <ul className="flex flex-col gap-1 my-2 pl-6">
            <li>-Physical Products</li>
            <li>-Health Supplements Brand</li>
            <li>-Product Manufacturing</li>
          </ul>
          <p className="">We are dedicated to Community governance!</p>
        </div>
        <div className="flex flex-col text-center bg-radial-shade-background p-2 rounded-md">
          <h1>You need 20 Lucky Lions</h1>{" "}
          <h1 className="font-bold">and / or</h1>
          <h1> Foo Dogs to join the Executives of Lion City!</h1>
        </div>
      </div>
    </div>
  );
};

export default Dao;
