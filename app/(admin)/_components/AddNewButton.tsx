import Modal from "@/components/ui/Modal";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import React, { Fragment,ReactNode } from "react";

interface AddNewButtonProps {
	children: ReactNode;
	text:string
	isOpen:boolean
	openModal : ()=> void
	closeModal:()=>void

}


const AddNewButton = ({children,text,isOpen,openModal,closeModal}:AddNewButtonProps) => {
  
  return (
    <Fragment>
      <button
        className="flex   items-center py-2 px-4 rounded-[0.25rem] space-x-1 bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
        onClick={openModal}
      >
        <span>{text} </span>
        <PlusSmallIcon className="w-6 h-6" />
      </button>
        <Modal
        isOpen={isOpen}
        onClose={closeModal}
        position={"center"}
        width="w-10/12 md:w-[500px] "
      >
        <Fragment>
        <div className="px-6 py-3 text-xl text-[#595983] border-b  font-semibold">
        {text}
        </div>
					{children}
        </Fragment>
        
      </Modal>
   
    
    </Fragment>
  );
};

export default AddNewButton;
