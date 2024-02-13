import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { trpc } from "@/utils/trpc";
import { WalletProvider } from "@/context/UseWalletContext";
import Layout from "@/layout/layout";
import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <WalletProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
