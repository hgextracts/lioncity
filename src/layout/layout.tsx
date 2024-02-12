import NavBar from "./NavBar";
import { Exo_2 } from "next/font/google";
import Head from "next/head";
import { ReactNode, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

const exo_2 = Exo_2({ subsets: ["latin"], display: "swap" });

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const [isMenuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  return (
    <div className={`${exo_2.className}`}>
      <Head>
        <title>Lion City</title>
        <meta name="A Blockchain Community" content="Cardano" />
        <link rel="icon" href="/LClogosmall.png" />
      </Head>
      <NavBar />
      <main className="flex flex-col w-full mt-[6rem] ">{children}</main>
      {/* Dark Mode Toggle Button */}
      <div className="fixed bottom-0 left-0 p-4">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Layout;

// isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}
