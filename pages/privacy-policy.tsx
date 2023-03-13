import Head from "next/head";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Policy = () => {
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
        <div>
          <h1 className="text-center text-5xl">Privacy Policy</h1>
          <h3 className="text-gray-600 my-8">
            This Privacy Policy describes how goodlite.co.ke (the “Site” or
            “we”) collects, uses, and discloses your Personal Information when
            you visit or make a purchase from the Site.
          </h3>
        </div>
        <div>
          <h1 className="text-center text-4xl font-semibold">
            Collecting Personal Information
          </h1>
          <p className="mt-8 text-gray-600">
            When you visit the Site, we collect certain information about your
            device, your interaction with the Site, and information necessary to
            process your purchases. We may also collect additional information
            if you contact us for customer support. In this Privacy Policy, we
            refer to any information that can uniquely identify an individual
            (including the information below) as “Personal Information”. See the
            list below for more information about what Personal Information we
            collect and why.
          </p>
          <h3 className="my-8 text-gray-600">Device Information</h3>
          <ul className="ml-8">
            <li className="list-disc text-gray-600">
              Examples of Personal Information collected: version of web
              browser, IP address, time zone, cookie information, what sites or
              products you view, search terms, and how you interact with the
              Site.
            </li>
            <li className="list-disc text-gray-600">
              Purpose of collection: to load the Site accurately for you, and to
              perform analytics on Site usage to optimize our Site.
            </li>
            <li className="list-disc text-gray-600">
              Source of collection: Collected automatically when you access our
              Site using cookies, log files, web beacons, tags, or pixels.
            </li>
          </ul>
          <h3 className="my-8 text-gray-600">Order Information</h3>
          <ul className="ml-8">
            <li className="list-disc text-gray-600">
              Examples of Personal Information collected: name, billing address,
              shipping address, payment information (including credit card
              numbers), email address, and phone number.
            </li>
            <li className="list-disc text-gray-600">
              Purpose of collection: to fulfill your order, to communicate with
              you about your order, and for internal business purposes.
            </li>
            <li className="list-disc text-gray-600">
              Source of collection: Collected from you.
            </li>
          </ul>
          <h3 className="my-8 text-gray-600">Customer support Information</h3>
          <ul className="ml-8">
            <li className="list-disc text-gray-600">
              Examples of Personal Information collected: name, email address,
              phone number, and message.
            </li>
            <li className="list-disc text-gray-600">
              Purpose of collection: to provide you with support and to
              communicate with you about your account.
            </li>
            <li className="list-disc text-gray-600">Source of collection: Collected from you.</li>
          </ul>
          <h1 className="text-center text-4xl my-10 font-semibold">Sharing Personal Information</h1>
          <p className="text-gray-600">
            We share your Personal Information with third parties to help us use
            your Personal Information, as described above. We use Google
            Analytics to help us understand how our customers use the Site--you
            can read more about how Google uses your Personal Information here:
            https://www.google.com/intl/en/policies/privacy/. You can also opt-
            out of Google Analytics here:
            https://tools.google.com/dlpage/gaoptout.
          </p>
          <h2 className="text-2xl my-8 font-semibold">Behavioral Advertising</h2>
          <p className="text-gray-600">
            As described above, we use your Personal Information to provide you
            with targeted advertisements or marketing communications we believe
            may be of interest to you. For example:
          </p>
          <ul className="ml-8 mt-8">
            <li className="list-disc text-gray-600">
              We use Google Analytics to help us understand how our customers
              use the Site. You can read more about how Google uses your
              Personal Information here:
              https://policies.google.com/privacy?hl=en.
            </li>
            <li className="list-disc text-gray-600">
              We share information about your use of the Site, your purchases,
              and your interaction with our ads on other websites with our
              advertising partners. We collect and share some of this
              information directly with our advertising partners, and in some
              cases through the use of cookies or other similar technologies
              (which you may consent to, depending on your location).
            </li>
          </ul>
          <h1 className="my-8 text-4xl font-semibold text-center">Using Personal Information</h1>
          <p className="text-gray-600">
            We use your personal Information to provide our services to you,
            which includes: offering products for sale, processing payments,
            shipping and fulfillment of your order, and keeping you up to date
            on new products, services, and offers.
          </p>
          <h1 className="my-8 text-4xl font-semibold text-center">Cookies</h1>
          <p className="text-gray-600">
            To enrich and perfect your online experience, goodlite.co.ke uses
            “Cookies”, similar technologies and services provided by others to
            display personalized content, appropriate advertising and store your
            preferences on your computer. A cookie is a small amount of
            information that&apos;s downloaded to your computer or device when
            you visit our Site. We use a number of different cookies, including
            functional, performance, advertising, and social media or content
            cookies. Cookies make your browsing experience better by allowing
            the website to remember your actions and preferences (such as login
            and region selection). This means you don&apos;t have to re-enter
            this information each time you return to the site or browse from one
            page to another. Cookies also provide information on how people use
            the website, for instance whether it&apos;s their first time
            visiting or if they are a frequent visitor
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Policy;
