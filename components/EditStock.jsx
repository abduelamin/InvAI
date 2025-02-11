"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const EditStock = () => {
    const {register, handleSubmit } = useForm()

    const SubmitForm = async (formData) => { 

        const productData = {
batchNumber: formData.batchNumber,
dateUsed: formData.dateUsed,
quantity: formData.quantity,
        }

        try {
const response = await fetch('http://localhost:8080/api/editstock', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
})

if (!response.ok) throw new Error ('Failed to add product')

    const result = await response.json()
console.log('FE added the product:', result)

    } catch (error) {
     console.log('Error in the UI form plz check:', error)
    }}

    return (
        <section className="p-6 bg-white rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit stock</h2>
    
          <form onSubmit={handleSubmit(SubmitForm)} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Batch Number" 
              {...register('batchNumber', { required: true })} 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <input 
              type="date" 
              placeholder="Date used" 
              {...register('dateUsed', { required: true, valueAsDate: true})} 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <input 
              type="number" 
              placeholder="Quantity used" 
              {...register('quantity', { valueAsNumber: true, required: true })} 
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
    
            <div className="flex justify-end gap-4 mt-4">
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit changes
              </button>
            </div>
          </form>
        </section>
      );
    }
    

export default EditStock