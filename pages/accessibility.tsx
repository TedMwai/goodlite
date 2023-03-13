import Head from "next/head";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Accessibility = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div
        className={`${montserrat.className} px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl`}
      >
        <h1 className="text-center text-5xl">Accessibility</h1>
        <h3 className="text-gray-600 my-8">
          Goodlite Kenya is committed to making our website&apos;s content
          accessible and user friendly to everyone, including people with
          disabilities.
        </h3>
        <h3 className="text-gray-600 my-8">
          If you are having difficulty viewing or navigating the content on this
          website, or notice any content, feature, or functionality that you
          believe is not fully accessible to people with disabilities, please
          email our team at <span className=" cursor-pointer border-a-expand">goodlite@gmail.com</span> with the word “Accessibility” in
          the subject line and provide a description of the specific feature you
          feel is not fully accessible or a suggestion for improvement.
        </h3>
        <h3 className="text-gray-600 my-8">
          We take your feedback seriously and will consider it as we evaluate
          ways to accommodate all of our customers and our overall accessibility
          policies.
        </h3>
      </div>
      <Footer />
    </>
  );
};

export default Accessibility;
