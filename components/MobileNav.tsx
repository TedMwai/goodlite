import Accordion from "@/components/Accordion";
import { useShop } from "@/context/context";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiX } from "react-icons/fi";

const MobileNav = () => {
  const { setSideNav } = useShop();

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
          <div className="mt-4">
            <FiX
              className="text-2xl cursor-pointer"
              onClick={handleCloseMobileNav}
            />
          </div>
          <div className="mt-8 flex flex-col overflow-hidden h-full">
            <div className="mt-4 overflow-y-scroll scrollbar h-full">
              <div className="flex items-center justify-between border-t-2 border-gray-400 py-4">
                <h1 className="px-4">HOME</h1>
              </div>
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
            <div className="mb-24 py-4">
              <div className="flex items-center gap-4 border-2 border-black py-2 px-3">
                <h1 className="text-center text-lg w-full px-2">
                  Account
                </h1>
                <Image
                  src="/userIcon.svg"
                  alt="Cart SVG"
                  height={24}
                  width={24}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MobileNav;
