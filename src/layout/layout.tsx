import NavBar from "./NavBar";
import { Exo_2 } from "next/font/google";
import Head from "next/head";
import { ReactNode, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import Footer from "./Footer";

const exo_2 = Exo_2({ subsets: ["latin"], display: "swap" });

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`${exo_2.className} flex flex-col w-full h-full px-6`}>
      <Head>
        <title>Lion City</title>
        <meta name="A Blockchain Community" content="Cardano" />
        <link rel="icon" href="/LClogosmall.png" />
      </Head>
      <NavBar />
      <main className="flex flex-col mt-[6rem]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
