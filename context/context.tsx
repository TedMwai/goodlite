import { createContext, useContext, useMemo, useState } from "react";
import { Cart } from "@/types/types";
import { Addresses } from "@prisma/client";

interface ContextType {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sideNav: boolean;
  setSideNav: React.Dispatch<React.SetStateAction<boolean>>;
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  shippingPrice: number;
  setShippingPrice: React.Dispatch<React.SetStateAction<number>>;
  selectedRegionIndex: number;
  setSelectedRegionIndex: React.Dispatch<React.SetStateAction<number>>;
  shippingRegion: string;
  setShippingRegion: React.Dispatch<React.SetStateAction<string>>;
  shippingRegionIndex: number;
  setShippingRegionIndex: React.Dispatch<React.SetStateAction<number>>;
  billingDetails: Addresses;
  setBillingDetails: React.Dispatch<React.SetStateAction<Addresses>>;
}

interface Props {
  children: React.ReactNode;
}

const defaultContext: ContextType = {
  cartOpen: false,
  setCartOpen: () => {},
  sideNav: false,
  setSideNav: () => {},
  searchOpen: false,
  setSearchOpen: () => {},
  cart: [],
  setCart: () => {},
  shippingPrice: 200,
  setShippingPrice: () => {},
  selectedRegionIndex: 0,
  setSelectedRegionIndex: () => {},
  shippingRegion: "",
  setShippingRegion: () => {},
  shippingRegionIndex: 1,
  setShippingRegionIndex: () => {},
  billingDetails: {
    id: "",
    userId: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setBillingDetails: () => {},
};

const Context = createContext<ContextType>(defaultContext);

export const ContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [sideNav, setSideNav] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<Cart>([]);
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);
  const [shippingRegion, setShippingRegion] = useState<string>("");
  const [shippingRegionIndex, setShippingRegionIndex] = useState<number>(1);
  const [billingDetails, setBillingDetails] = useState<Addresses>({
    id: "",
    userId: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const contextValue: ContextType = useMemo(
    () => ({
      cartOpen,
      setCartOpen,
      sideNav,
      setSideNav,
      searchOpen,
      setSearchOpen,
      cart,
      setCart,
      shippingPrice,
      setShippingPrice,
      selectedRegionIndex,
      setSelectedRegionIndex,
      shippingRegionIndex,
      setShippingRegionIndex,
      shippingRegion,
      setShippingRegion,
      billingDetails,
      setBillingDetails,
    }),
    [
      cart,
      cartOpen,
      sideNav,
      searchOpen,
      shippingPrice,
      selectedRegionIndex,
      shippingRegionIndex,
      shippingRegion,
      billingDetails,
    ]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useShop = (): ContextType => useContext(Context);
