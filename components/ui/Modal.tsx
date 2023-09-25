import React, { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";


type ModalProps = {
  isOpen: boolean;
  position: string;
  width?: string;
  onClose: () => void;
  children: ReactNode;
  closeButton?: boolean;
  heightStyle?: string;
};
type TransitionStyles = {
  enter: string;
  enterFrom: string;
  enterTo: string;
  leave: string;
  leaveFrom: string;
  leaveTo: string;
};

const Modal = ({
  isOpen,
  position,
  width = `w-72`,
  onClose,
  heightStyle,
  closeButton = false,
  children,
}: ModalProps) => {
  const getTransitionStyles = () => {
    const defaultStyles: TransitionStyles = {
      enter: "ease-in-out duration-300",
      enterFrom: "opacity-0 -translate-y-4",
      enterTo: "opacity-100 translate-y-0",
      leave: "ease-in-out duration-300 -translate-y-4",
      leaveFrom: "opacity-100 translate-y-0",
      leaveTo: "opacity-0 -translate-y-4",
    };

    const positionStyles: { [key: string]: TransitionStyles } = {
      leftSidebar: {
        enter: "ease-in-out duration-200 transform",
        enterFrom: "-translate-x-full",
        enterTo: "translate-x-0",
        leave: "ease-in-out duration-200 transform",
        leaveFrom: "translate-x-0",
        leaveTo: "-translate-x-full",
      },

      rightSidebar: {
        enter: " ease-in-out duration-300 transform",
        enterFrom: "translate-x-full",
        enterTo: "translate-x-0",
        leave: "   ease-in-out duration-300 transform",
        leaveFrom: "translate-x-0",
        leaveTo: "translate-x-full",
      },
    };

    return positionStyles[position] || defaultStyles;
  };

  return (
    <Transition  appear={true}  show={isOpen} as={Fragment}>
      <Dialog as="div"  className="relative z-50 " onClose={onClose}>
      
        <div className="fixed inset-0 w-screen    ">
        <div className={`fixed inset-0 z-40  bg-[#12263f]/50 `} aria-hidden="true" />
          <div className={`flex min-h-full    ${position}  text-center `}>

            <Transition.Child
              as={Fragment}
              enter={getTransitionStyles().enter}
              enterFrom={getTransitionStyles().enterFrom}
              enterTo={getTransitionStyles().enterTo}
              leave={getTransitionStyles().leave}
              leaveFrom={getTransitionStyles().leaveFrom}
              leaveTo={getTransitionStyles().leaveTo}
            >
              <Dialog.Panel
                className={`  fixed ${width} z-50 ${
                  position === "center" && `max-h-[90%] `
                } scrollbars  overflow-x-hidden ${heightStyle}   ${
                  position !== "leftSidebar" &&
                  position !== "rightSidebar" &&
                  `rounded-md`
                }   bg-white  text-left align-middle transition-all`}
              >
                  <div className="absolute right-0 top-0  flex  p-2" >
                    <button
                      type="button"
                      className="relative rounded-md text-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={onClose}
                    
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon
                        className={`${
                          position === "leftSidebar"
                            ? `h-6 w-6 `
                            : `w-5 h-5 text-gray-500  `
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
            
                <button type="button" className="opacity-0 absolute bottom-0"/>
                {children}
                {closeButton && (
                  <div className="p-6 border-t flex justify-end">
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-bgGray px-3 py-2 rounded-md hover:bg-slate-300"
                    >
                      Đóng
                    </button>
                  </div>
                )}
              
              </Dialog.Panel>
              
            </Transition.Child>
           
          </div>
        </div>
        
      </Dialog>
      
    </Transition>
  );
};

export default Modal;
