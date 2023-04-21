import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ContextProvider } from "@/context/context";
import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ContextProvider>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
        <Analytics />
        <Footer />
      </UserProvider>
    </ContextProvider>
  );
}
