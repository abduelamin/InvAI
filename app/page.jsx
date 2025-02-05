"use client"
import React, { useState } from 'react'
import CreateNewProduct from '../components/CreateNewProduct';
import Modal from '@/components/Modal';

export default function Home() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button onClick={() => setModal(true)}>HomePage</button>

      {/* Only render modal when modal is true */}
      {/* <Modal isOpen={modal} onClose={() => setModal(false)} /> */}
    </>
  );
}
 {/* <CreateNewProduct/> */}