import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import lclogo from "../../public/lclogo.png";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("var(--text)");

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("var(--primary)");
        setTextColor("var(--background)");
      } else {
        setColor("transparent");
        setTextColor("var(--text)");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);
  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed flex left-0 top-0 w-full px-4 py-2 z-10 ease-in duration-300"
    >
      <div className="flex w-full justify-between items-center">
        <Link href="/" passHref>
          <div className="flex items-center">
            <Image
              src={lclogo}
              alt="Logo"
              className="w-[75px]"
              priority={true}
            />

            <div
              style={{ color: `${textColor}` }}
              className="flex flex-col pl-2"
            >
              <h1 className="text-4xl font-semibold tracking-wide">
                Lion City
              </h1>
              <h2 className="font-semibold tracking-wide">
                A Blockchain Community
              </h2>
            </div>
          </div>
        </Link>
        <ul
          style={{ color: `${textColor}` }}
          className="hidden lg:flex font-bold text-xl space-x-6"
        >
          <li>
            <Link href="/dashboard">
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/dao">
              <span>DAO</span>
            </Link>
          </li>

          <li>
            <Link href="/gangs">
              <span>Gangs</span>
            </Link>
          </li>
          <li>
            <Link href="/mint">
              <span>Mint</span>
            </Link>
          </li>

          <li>
            <Link href="/wellness">
              <span>Wellness</span>
            </Link>
          </li>

          <li>
            <Link href="/staking">
              <span>$Mane</span>
            </Link>
          </li>
          <li>
            <Link href="/team">
              <span>Team</span>
            </Link>
          </li>
          <li>
            <Link href="/whitepaper">
              <span>Whitepaper</span>
            </Link>
          </li>
        </ul>
        {/* mobile button */}
        <div
          onClick={handleNav}
          className="block lg:hidden z-10 border-2 p-1 rounded-md"
          style={{ borderColor: `${textColor}`, color: `${textColor}` }}
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        {/* mobile Menu */}
        <div
          onClick={handleNav}
          className={
            nav
              ? "lg:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen menuBackground text-center ease-in duration-300"
              : "lg:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen menuBackground text-center ease-in duration-300"
          }
        >
          <div className="flex flex-col gap-[3rem]">
            <Link href="/" passHref>
              <div className="flex items-center">
                <Image
                  src={lclogo}
                  alt="Logo"
                  className="w-[75px]"
                  priority={true}
                />

                <div className="flex flex-col pl-2">
                  <h1 className="text-4xl font-semibold tracking-wide">
                    Lion City
                  </h1>
                  <h2 className="font-semibold tracking-wide">
                    A Blockchain Community
                  </h2>
                </div>
              </div>
            </Link>
            <ul className="text-xl space-y-8">
              <li>
                <Link href="/dashboard" onClick={handleNav}>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/dao" onClick={handleNav}>
                  <span>DAO</span>
                </Link>
              </li>

              <li>
                <Link href="/gangs" onClick={handleNav}>
                  <span>Gangs</span>
                </Link>
              </li>
              <li>
                <Link href="/mint" onClick={handleNav}>
                  <span>Mint</span>
                </Link>
              </li>

              <li>
                <Link href="/wellness" onClick={handleNav}>
                  <span>Wellness</span>
                </Link>
              </li>

              <li>
                <Link href="/staking" onClick={handleNav}>
                  <span>$Mane</span>
                </Link>
              </li>
              <li>
                <Link href="/team" onClick={handleNav}>
                  <span>Team</span>
                </Link>
              </li>
              <li>
                <Link href="/whitepaper" onClick={handleNav}>
                  <span>Whitepaper</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
