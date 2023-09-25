import {  useState } from "react";

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    return { isOpen, openModal, closeModal };
  }


  export const useToast = () => {
    const [isOpenToast, setIsOpenToast] = useState(false);
  
    const openToast = () => {
      setIsOpenToast(true);
    };
  
    const closeToast = () => {
      setIsOpenToast(false);
    };
  
    return { isOpenToast, openToast, closeToast };
  }