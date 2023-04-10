import { Dialog, Transition } from "@headlessui/react";
import { Montserrat } from "next/font/google";
import { FC, Fragment, useRef } from "react";
import { FadeLoader } from "react-spinners";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: FC<Props> = ({open, setOpen}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`${montserrat.className} fixed z-10 inset-0 overflow-y-auto`}
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full">
                  <FadeLoader color="#36d7b7" />
                </div>
              </div>
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h1"
                    className="text-xl leading-6 font-medium text-gray-900"
                  >
                    We are waiting for your payment
                  </Dialog.Title>
                  <div className="mt-3">
                    <h3 className="text-lg">
                      Please follow the instructions and do not refresh or leave
                      this modal
                    </h3>
                    <h3 className="text-lg">This may take upto 2 minutes</h3>
                  </div>
                  <div className="mt-5">
                    <p className="text-lg text-gray-500">
                      You will receive a prompt on your mobile number to enter
                      your pin to authorize your payment request
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
