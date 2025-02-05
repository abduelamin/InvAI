"use client"
import { ClassNames } from '@emotion/react'
import React from 'react'

const Modal = ({ isOpen, onClose, children}) => {
  if (!isOpen) return null; // ensurres that the modal only renders when the state is true. this is better than conditionally rendering within the jsx

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        {children}
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mt-3 hover:bg-red-600 transition duration-300">Close</button>
      </div>
    </div>
  );
};

export default Modal;
