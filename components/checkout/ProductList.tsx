import { FC } from "react";
import Image from "next/image";
import { useShop } from "@/context/context";

type Props = {
  shipping: boolean;
};

const ProductList: FC<Props> = ({ shipping }) => {
  const { cart, shippingPrice } = useShop();
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
  return (
    <>
      {cart.length === 0 ? (
        <h1 className="text-xl text-center font-semibold">
          Your cart is empty. Continue shopping
        </h1>
      ) : (
        cart.map((item) => (
          <div className="flex gap-4 mb-8 " key={item.id}>
            <div className="relative w-16 h-16 md:w-24 md:h-24 aspect-square">
              <Image
                src={item.product.coverImage}
                alt="Product"
                fill={true}
                className="w-full h-full object-cover object-center rounded-md"
              />
              <div className="absolute -top-2 -right-3 bg-[#7f7f7f] text-white rounded-full border-2 border-[#7f7f7f] h-6 w-6 flex items-center justify-center">
                <span className="text-xs">{item.quantity}</span>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-base md:text-lg">{item.product.name}</h1>
                <h1 className="font-semibold">
                  Ksh.{" "}
                  {item.product.discount !== null
                    ? item.product.discount?.discount * item.quantity
                    : item.product.price * item.quantity}
                  .00
                </h1>
              </div>
            </div>
          </div>
        ))
      )}
      <div>
        <div className="flex items-center justify-between pt-2">
          <h1 className="text-lg">SUBTOTAL</h1>
          <h1 className="text-base">Ksh. {total}.00</h1>
        </div>
        <div className="flex items-center justify-between pb-2">
          <h1>Shipping</h1>
          <h1>
            {shipping ? `Ksh ${shippingPrice}.00` : "Calculated at next step"}
          </h1>
        </div>
        <div className="mt-6 border-t-2">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold">Total</h1>
            <h1 className="text-xl font-semibold">
              Ksh. {total + shippingPrice}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
