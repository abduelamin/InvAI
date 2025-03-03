"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
const CreateNewProduct = () => {
  const { register, handleSubmit } = useForm();

  const SubmitForm = async (formData) => {
    const productData = {
      product_name: formData.productName,
      strength: formData.strength,
      form: formData.form,
      reorder_threshold: formData.reorderThreshold,
      supplier_lead_time: formData.supplierLeadTime,
    };

    try {
      const response = await fetch(
        "https://inv-ai-backend.vercel.app/api/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok)
        throw new Error(
          result.message || "Client Error: Product failed to add"
        );

      toast.success("Product added successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <section className="p-6 bg-white rounded-xl shadow-lg w-full max-w-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Add New Product
      </h2>

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
          placeholder="Bottle, Powder, Tablet, Tub, Tube"
          {...register("form", { required: true })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          type="number"
          placeholder="Reorder Threshold"
          {...register("reorderThreshold", {
            valueAsNumber: true,
            required: true,
          })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <input
          type="number"
          placeholder="Supplier Lead Time"
          {...register("supplierLeadTime", {
            valueAsNumber: true,
            required: true,
          })}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateNewProduct;
