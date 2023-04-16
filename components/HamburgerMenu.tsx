import { useState, FC } from "react";

const HamburgerMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      type="button"
      className="relative w-6 h-6 bg-transparent border-none z-10 transition-all duration-200 cursor-pointer focus:outline-none"
      onClick={handleToggle}
    >
      <span
        className={`absolute top-0 left-0 w-full h-0.5 bg-black transition-all duration-500 transform ${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
      />
      <span
        className={`absolute top-0 left-0 w-full h-0.5 bg-black transition-all duration-500 transform ${
          isOpen ? "opacity-0" : "translate-y-2"
        }`}
      />
      <span
        className={`absolute top-0 left-0 w-full h-0.5 bg-black transition-all duration-500 transform ${
          isOpen ? "-rotate-45 translate-y-1.5" : "translate-y-4"
        }`}
      />
    </button>
  );
};

export default HamburgerMenu;
