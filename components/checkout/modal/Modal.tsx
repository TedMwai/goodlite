import { useUser } from "@auth0/nextjs-auth0/client";
import { AnimatePresence, motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import { FC } from "react";
import { HiCheck, HiXMark } from "react-icons/hi2";
import { FadeLoader } from "react-spinners";

interface Props {
  loading: boolean;
  success: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const loaderVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    x: "50%",
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.5,
    },
  },
};

const successVariants = {
  initial: {
    opacity: 0,
    x: "-10%",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.5,
    },
  },
};

const Modal: FC<Props> = ({ loading, success, setModal }) => {
  const router = useRouter();
  const { user } = useUser();

  const handleClick = () => {
    // check if user is logged in
    if (!user) {
      router.push("/");
      setModal(false);
      return;
    }
    router.push("/orders");
    setModal(false);
  };
  return (
    <div
      className={`${montserrat.className} fixed inset-0 z-10 flex items-center justify-center h-full w-full bg-[#c0c0c099]`}
    >
      <AnimatePresence>
        {loading && !success && (
          <div>
            <motion.div className="bg-white rounded-lg shadow-lg p-6 w-80 md:w-[30rem] lg:w-[35rem]">
              <motion.div
                variants={loaderVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                key="loader-container"
              >
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full">
                  <FadeLoader color="#36d7b7" />
                </div>
                <div className="mx-auto mt-4 text-center">
                  <h1 className="text-xl leading-6 font-medium text-gray-900">
                    We are currently awaiting payment for your transaction.
                  </h1>
                  <div className="mt-3">
                    <h3 className="text-sm">
                      To complete your payment, follow the instructions
                      carefully and wait for a prompt on your mobile number to
                      enter your PIN. Do not refresh or leave this page. Thank
                      you.
                    </h3>
                    <h3 className="mt-4 text-base font-medium">
                      This may take up to 2 minutes
                    </h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
        {!loading && (
          <div>
            <motion.div className="bg-white rounded-lg shadow-lg p-6 w-80 md:w-[30rem] lg:w-[35rem]">
              <motion.div
                variants={successVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                key="success-container"
              >
                <div className="mx-auto flex items-center justify-center">
                  {success ? (
                    <HiCheck className="text-6xl text-[#36d7b7] bg-green-100 rounded-full p-2" />
                  ) : (
                    <HiXMark className="text-6xl text-[#d73636] bg-red-100 rounded-full p-2" />
                  )}
                </div>
                <div className="mx-auto mt-4 text-center">
                  {success ? (
                    <h1 className="text-xl leading-6 font-medium text-green-500">
                      Transaction Successful
                    </h1>
                  ) : (
                    <h1 className="text-xl leading-6 font-medium text-red-500">
                      Transaction Failed
                    </h1>
                  )}
                  <div className="mt-3">
                    {success ? (
                      <h3 className="text-sm">
                        Your transaction was successful. You will receive a
                        confirmation email shortly.
                      </h3>
                    ) : (
                      <h3 className="text-sm">
                        Your transaction failed. Please try again.
                      </h3>
                    )}
                  </div>
                  <div>
                    {success ? (
                      <button
                        className="mt-4 bg-[#123026] text-white px-4 py-2 rounded-full"
                        onClick={handleClick}
                      >
                        {user ? "View Orders" : "Close Modal"}
                      </button>
                    ) : (
                      <button
                        className="mt-4 bg-[#123026] text-white px-4 py-2 rounded-full"
                        onClick={() => setModal(false)}
                      >
                        Close Modal
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
