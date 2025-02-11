"use client";
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CreateNewProduct from '@/components/CreateNewProduct';
import Modal from '@/components/Modal';
import AddBatch from '@/components/AddBatch';
import EditStock from '@/components/EditStock';

export default function Inventory() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('')

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/stockoverview');
        if (!response.ok) throw new Error('Failed to fetch inventory');
        const { rows } = await response.json();

        const processedData = rows.map(row => ({
          ...row,
          expiry_date: new Date(row.expiry_date),
          formatted_expiry: new Date(row.expiry_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
        }));

        setData(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const columns = [
    { field: 'product_name', headerName: 'Product Name', width: 200 },
    { field: 'strength', headerName: 'Strength', width: 150, disableColumnFilter: true, sortable: false },
    { field: 'form', headerName: 'Form', width: 150 },
    { field: 'batch_number', headerName: 'Batch Number', width: 200 },
    { field: 'current_stock', headerName: 'Current Stock', width: 150 },
    {
      field: 'expiry_date',
      headerName: 'Expiry Date',
      width: 200,
      valueFormatter: (value, row) => row.formatted_expiry,
      sortComparator: (v1, v2) => v1 - v2
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-700">Inventory</h1>
        <div className="relative">
          <button
            onClick={() => setDropdown((prev) => !prev)
              
            }
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Edit Inventory
          </button>

          {dropdown && (
  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-64 z-10 border border-gray-200">
    <button onClick={() => {setIsModalOpen(true); setDropdown(false); setModalType('New Batch')}}
      className="w-full bg-slate-200 text-gray-700 py-2 rounded-md hover:bg-slate-300 transition duration-300 mb-2 border border-gray-300"
    >
      New Batch
    </button>
    <button   onClick={() => {
        setIsModalOpen(true);
        setDropdown(false);
        setModalType('Edit Stock')
      }}
      className="w-full bg-blue-100 text-gray-700 py-2 rounded-md hover:bg-blue-200 transition duration-300 mb-2 border border-gray-300"
    >
      Edit Stock
    </button>
    <button
      onClick={() => {
        setIsModalOpen(true);
        setDropdown(false);
        setModalType('New Product')
      }}
      className="w-full bg-purple-100 text-gray-700 py-2 rounded-md hover:bg-purple-200 transition duration-300 border border-gray-300"
    >
      Create New Product
    </button>
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600 text-lg">Loading inventory...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-5">
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.batch_id}
            className="!text-gray-700"
            autoHeight
            initialState={{
              sorting: {
                sortModel: [{ field: 'product_name', sort: 'asc' }],
              },
            }}
          />
        </div>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
         {modalType === 'New Product' && <CreateNewProduct />}
         {modalType === 'New Batch' && <AddBatch />}
         {modalType === 'Edit Stock' && <EditStock />}
        </Modal>)
      }
    </div>
  );
}