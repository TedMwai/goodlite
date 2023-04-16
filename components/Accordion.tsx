import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode, useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.div className="border-t-2 border-gray-400 py-4">
      <motion.div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleAccordion}
      >
        <h1 className="px-4">{title}</h1>
        {isOpen ? <MdRemove className="mr-4" /> : <MdAdd className="mr-4" />}
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Accordion;
