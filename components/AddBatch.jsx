"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

const AddBatch = () => {
  const { register, handleSubmit } = useForm();

  const SubmitForm = async (formData) => {
    const productData = {
      product_name: formData.productName,
      strength: formData.strength,
      batch_number: formData.batchNumber,
      current_stock: formData.currentStock,
      expiry_date: formData.expiryDate,
    };

    try {
      const response = await fetch("inv-ai-backend.vercel.app/api/addbatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Client Error: batch failed to add");

      toast.success("Batch added successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <section className="p-6 bg-white rounded-xl shadow-lg w-full max-w-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">New batch</h2>

      <form onSubmit={handleSubmit(SubmitForm)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          {...register("productName", { required: true })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          type="text"
          placeholder="Strength"
          {...register("strength", { required: true })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          type="text"
          placeholder="Batch number"
          {...register("batchNumber", { required: true })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          type="number"
          placeholder="Quantity"
          {...register("currentStock", { valueAsNumber: true, required: true })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          type="date"
          placeholder="expiry date"
          {...register("expiryDate", { valueAsDate: true, required: true })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Batch
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddBatch;
