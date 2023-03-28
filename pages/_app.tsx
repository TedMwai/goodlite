import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ContextProvider } from "@/context/context";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ContextProvider>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
    </ContextProvider>
  );
}
