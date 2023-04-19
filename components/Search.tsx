import { useShop } from "@/context/context";
import { myFetch } from "@/util/fetch";
import { Products } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

type SearchProducts = (Products & {
  discount: {
    discount: number;
  } | null;
  images: {
    image: string;
  }[];
  category: {
    id: number;
    name: string;
  };
})[];

const SearchComponent = () => {
  const { setSearchOpen } = useShop();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchProducts>([]);
  const router = useRouter();

  // Animation variance
  const card = {
    hidden: { opacity: 0, scale: 0.8, y: 20, x: 20 },
    show: { opacity: 1, scale: 1, y: 0, x: 0 },
  };

  const cards = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
    document.body.classList.remove("overflow-y-hidden");
  };

  const handleSearch = async (input: string) => {
    setSearchQuery(input);
    // check if search query is greater than 1 characters
    if (searchQuery.length < 1) {
      return;
    }
    try {
      const res = await myFetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ searchQuery }),
      });
      const products: SearchProducts = await res.json();
      setSearchResults(products);
    } catch (error: unknown) {
      console.log("Unable to search", error);
    }
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
        onClick={handleCloseSearch}
      >
        <motion.div
          className="w-[85%] md:w-[55%] lg:w-6/12 xl:w-[35%] bg-white px-6 relative"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mt-4 flex items-center gap-8 border-b-2 flex-row-reverse">
            <div>
              <FiX
                className="text-2xl cursor-pointer"
                onClick={handleCloseSearch}
              />
            </div>
            <div className="flex gap-2 items-center">
              <FiSearch className="text-2xl cursor-pointer" />
              <input
                type="search"
                className="px-4 py-2 w-11/12 focus:border-0 outline-none"
                placeholder="Search products..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="my-8 pb-4 flex flex-col overflow-hidden h-full">
            <div className="overflow-y-scroll scrollbar basis-4/5">
              {searchQuery.length < 1 ? (
                <Link href="/products/all">See all products</Link>
              ) : (
                <motion.div
                  layout
                  variants={cards}
                  initial="hidden"
                  animate="show"
                >
                  {searchResults.map((product) => (
                    <motion.div layout variants={card} key={product.id}>
                      <Link href={`/product/${product.productSlug}`}>
                        <div className="flex gap-4 py-4 border-b-2 cursor-pointer">
                          <div className="relative w-20 h-20 md:w-24 md:h-24 aspect-square">
                            <Image
                              src={product.coverImage}
                              alt="product"
                              fill={true}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <div>
                              <h3 className="text-lg">{product.name}</h3>
                              <p className="text-sm text-gray-500">
                                {product.category.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-lg font-medium">
                                {product.discount ? (
                                  <span>
                                    Ksh {product.discount.discount}.00
                                  </span>
                                ) : (
                                  <span>Ksh {product.price}.00</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
            {searchQuery.length > 1 && (
              <div className="pt-4 basis-1/5">
                <button
                  className="bg-black text-white py-3 px-4 text-lg w-full hover:bg-gray-800"
                  onClick={() =>
                    router.push(`/search?query=${searchQuery}`)
                  }
                >
                  View All Results
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SearchComponent;
