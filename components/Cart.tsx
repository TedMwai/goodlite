import { useShop } from "@/context/context";
import { Cart as CartType } from "@/types/types";
import { myFetch } from "@/util/fetch";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const Cart: FC = () => {
  const { setCartOpen, cart, setCart } = useShop();
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
        delayChildren: 0.4,
        staggerChildren: 0.15,
      },
    },
  };

  function handleCloseCart() {
    document.body.classList.remove("overflow-y-hidden");
    setCartOpen(false);
  }

  const getTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      // check if there's a discount
      if (item.product.discount) {
        total += item.product.discount.discount * item.quantity;
      } else {
        total += item.product.price * item.quantity;
      }
    });
    return total;
  };
  const total = getTotal();

  const handleDelete = async (cartId: string, productId: number) => {
    try {
      const res = await myFetch("/api/cart/deleteFromCart", {
        method: "DELETE",
        body: JSON.stringify({ id: cartId, productId }),
      });
      const cartItems: CartType = await res.json();
      setCart(cartItems);
    } catch (error: unknown) {
      console.log("Unable to add product to cart", error);
    }
  };

  const handleIncrease = async (cartId: string, productId: number) => {
    try {
      const res = await myFetch("/api/cart/increaseQuantity", {
        method: "PUT",
        body: JSON.stringify({ id: cartId, productId }),
      });
      const cartItems: CartType = await res.json();
      setCart(cartItems);
    } catch (error: unknown) {
      console.log("Unable to add product to cart", error);
    }
  };

  const handleDecrease = async (cartId: string, productId: number) => {
    try {
      const res = await myFetch("/api/cart/decreaseQuantity", {
        method: "PUT",
        body: JSON.stringify({ id: cartId, productId }),
      });
      const cartItems: CartType = await res.json();
      setCart(cartItems);
    } catch (error: unknown) {
      console.log("Unable to add product to cart", error);
    }
  };

  return (
    <div className={`z-10 fixed top-0 right-0 h-full w-full overflow-hidden`}>
      <motion.div
        className="h-full bg-[#c0c0c099] z-10 flex justify-end overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
        onClick={handleCloseCart}
      >
        <motion.div
          className="w-full h-full md:w-[60%] lg:w-6/12 xl:w-[32%] bg-white p-8 relative"
          initial={{ x: "50%" }}
          animate={{ x: 0 }}
          exit={{ x: "50%" }}
          transition={{ type: "tween" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b-2 pb-2 border-black">
            <div className="relative flex gap-2">
              <h1 className="text-xl">Cart</h1>
              <div className="relative">
                <Image src="/cart.svg" alt="Cart SVG" height={30} width={30} />
                <div className="absolute top-0 left-2 bg-black text-white rounded-full border-2 border-black h-4 w-4 flex items-center justify-center">
                  <span className="text-xs">{cart.length}</span>
                </div>
              </div>
            </div>
            <div onClick={handleCloseCart}>
              <FiX className="text-2xl cursor-pointer" />
            </div>
          </div>
          <div className="my-8 flex flex-col overflow-hidden h-full">
            <div className="overflow-y-scroll scrollbar h-5/6">
              {cart.length === 0 && (
                <div>
                  <h1 className="text-lg text-center">Your cart is empty</h1>
                </div>
              )}
              <motion.div
                layout
                variants={cards}
                initial="hidden"
                animate="show"
              >
                {cart.length > 0 &&
                  cart.map((product) => (
                    <motion.div
                      layout
                      variants={card}
                      className="flex gap-4 mb-8"
                      key={product.id}
                    >
                      <div className="relative w-20 h-20 md:w-24 md:h-24 aspect-square">
                        <Image
                          src={product.product.coverImage}
                          alt="product"
                          fill={true}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <h1 className="text-base md:text-lg">
                            {product.product.name}
                          </h1>
                          <Image
                            src="/delete.svg"
                            alt="remove"
                            width={24}
                            height={24}
                            className="cursor-pointer"
                            onClick={() =>
                              handleDelete(product.id, product.product.id)
                            }
                          />
                        </div>
                        <div className="flex justify-between mt-4">
                          <div className="w-24 md:w-36 flex gap-4 items-center">
                            <FiMinus
                              className="cursor-pointer"
                              onClick={() =>
                                handleDecrease(product.id, product.product.id)
                              }
                            />
                            <p>{product.quantity}</p>
                            <FiPlus
                              className="cursor-pointer"
                              onClick={() =>
                                handleIncrease(product.id, product.product.id)
                              }
                            />
                          </div>
                          <h1>
                            Ksh.{" "}
                            {product.product.discount !== null
                              ? product.product.discount?.discount *
                                product.quantity
                              : product.product.price * product.quantity}
                          </h1>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
            <div className="mb-8 pt-4">
              <div className="flex justify-between">
                <h1 className="text-lg">Subtotal:</h1>
                <h1 className="text-lg">Ksh. {total}.00</h1>
              </div>
              <button
                className="bg-[#123026] text-white py-3 px-4 text-lg mb-4 w-full hover:bg-[#1e4f3f] transition duration-300 ease-in-out"
                onClick={() => {
                  router.push("/checkout");
                  handleCloseCart();
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Cart;
