import { createContext, useContext, useMemo, useState } from "react";

interface ContextType {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  sideNav: boolean;
  setSideNav: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: React.ReactNode;
}

const defaultContext: ContextType = {
  cartOpen: false,
  setCartOpen: () => {},
  isMobile: false,
  setIsMobile: () => {},
  sideNav: false,
  setSideNav: () => {},
};

const Context = createContext<ContextType>(defaultContext);

export const ContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [sideNav, setSideNav] = useState<boolean>(false);

  const contextValue: ContextType = useMemo(
    () => ({
      cartOpen,
      setCartOpen,
      isMobile,
      setIsMobile,
      sideNav,
      setSideNav,
    }),
    [cartOpen, isMobile, sideNav]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useShop = (): ContextType => useContext(Context);
