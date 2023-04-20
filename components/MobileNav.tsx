import Accordion from "@/components/Accordion";
import { useShop } from "@/context/context";
import { useUser } from "@auth0/nextjs-auth0/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiX } from "react-icons/fi";

const MobileNav = () => {
  const { setSideNav } = useShop();
  const { user } = useUser();

  const handleCloseMobileNav = () => {
    setSideNav(false);
    document.body.classList.remove("overflow-y-hidden");
  };

  return (
    <div className={`overflow-y-hidden`}>
      <motion.div
        className="fixed top-0 h-full w-full bg-[#c0c0c099] z-10 flex justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.3, ease: "easeOut", delay: 0.3 },
        }}
        onClick={handleCloseMobileNav}
      >
        <motion.div
          className="w-[85%] md:w-[55%] lg:w-6/12 xl:w-[35%] bg-white px-6 relative"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mt-4">
            <FiX
              className="text-2xl cursor-pointer"
              onClick={handleCloseMobileNav}
            />
            {user && (
              <div className="relative flex items-center cursor-pointer">
                <div>
                  <Image
                    src={user.picture ?? "/user-icon.png"}
                    alt={"User Icon"}
                    height={30}
                    width={30}
                    className="rounded-full p-1"
                  />
                </div>
                <h1 className="text-sm font-medium border-a-expand">
                  Hi, {user.name}
                </h1>
              </div>
            )}
          </div>
          <div className="mt-8 flex flex-col overflow-hidden h-full">
            <div className="mt-4 overflow-y-scroll scrollbar h-full">
              <Link
                href="/"
                className="flex items-center justify-between border-t-2 border-gray-400 py-4 px-4"
              >
                HOME
              </Link>
              <Link
                href="/products/all"
                className="flex items-center justify-between border-t-2 border-gray-400 py-4 px-4"
              >
                SHOP ALL
              </Link>
              <Accordion title="DISCOVER">
                <li className="ml-4 list-disc">lorem ipsum</li>
                <li className="ml-4 list-disc">lorem ipsum</li>
                <li className="ml-4 list-disc">lorem ipsum</li>
                <li className="ml-4 list-disc">lorem ipsum</li>
              </Accordion>
              <Accordion title="PRODUCTS">
                <li className="ml-4 list-disc">
                  <Link
                    href="/category/adidas"
                    className="text-base text-black border-b-expand"
                  >
                    Adidas
                  </Link>
                </li>
                <li className="ml-4 list-disc">
                  <Link
                    href="/category/nike"
                    className="text-base text-black border-b-expand"
                  >
                    Nike
                  </Link>
                </li>
                <li className="ml-4 list-disc">
                  <Link
                    href="/category/jordan"
                    className="text-base text-black border-b-expand"
                  >
                    Jordan
                  </Link>
                </li>
              </Accordion>
              <Accordion title="ABOUT">
                <li className="ml-4 list-disc">
                  <Link href="/contact" className="text-black border-a-expand">
                    About Us
                  </Link>
                </li>
                <li className="ml-4 list-disc">
                  <Link href="/contact" className="text-black border-a-expand">
                    Contact
                  </Link>
                </li>
                <li className="ml-4 list-disc">
                  <Link
                    href="/accessibility"
                    className="text-black border-a-expand"
                  >
                    Accessibility
                  </Link>
                </li>
              </Accordion>
              <Accordion title="RESOURCES">
                <li className="ml-4 list-disc py-1">
                  <Link
                    href="/privacy-policy"
                    className="text-base text-black border-b-expand"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="ml-4 list-disc py-1">
                  <Link
                    href="/shipping-policy"
                    className="text-base text-black border-b-expand"
                  >
                    Shipping Policy
                  </Link>
                </li>
                <li className="ml-4 list-disc py-1">
                  <Link
                    href="/refund-policy"
                    className="text-base text-black border-a-expand"
                  >
                    Refund Policy
                  </Link>
                </li>
              </Accordion>
            </div>
            <div className="mb-24 py-4 border-t-2 border-gray-400">
              {user ? (
                <div className="flex items-center justify-between">
                  <Link
                    href="/api/auth/logout"
                    className="flex items-center justify-between px-4 text-lg text-green-700"
                  >
                    Logout
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center justify-between px-6 text-lg bg-green-900 text-white py-2 rounded-3xl"
                  >
                    Account
                  </Link>
                </div>
              ) : (
                <Link href="/api/auth/login" className="text-lg">
                  LogIn
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MobileNav;
