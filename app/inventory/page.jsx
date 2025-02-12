"use client";
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import CreateNewProduct from '@/components/CreateNewProduct';
import Modal from '@/components/Modal';
import AddBatch from '@/components/AddBatch';
import EditStock from '@/components/EditStock';
import InventoryAlerts from '@/components/InventroyAlerts';

export default function Inventory() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

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
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-md border border-gray-300">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Inventory Management</h1>
        <div className="flex items-center gap-5">
          {/* Inventory Status Button */}
          <button
            onClick={() => { setIsModalOpen(true); setDropdown(false); setModalType('Alerts'); }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            <AlertCircle size={18} /> Inventory Status
          </button>
          {/* Edit Inventory Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdown((prev) => !prev)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-md hover:bg-gray-800 transition"
            >
              Edit Inventory <ChevronDown size={18} />
            </button>
            {dropdown && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-64 z-20 border border-gray-200">
                {['New Batch', 'Edit Stock', 'New Product'].map((type) => (
                  <button
                    key={type}
                    onClick={() => { setIsModalOpen(true); setDropdown(false); setModalType(type); }}
                    className="block w-full px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading & Error Handling */}
      <div className="mt-6">
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-gray-600" size={28} />
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        )}
      </div>

      {/* DataGrid */}
      {!isLoading && !error && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 border border-gray-200">
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.batch_id}
            className="text-gray-800"
            autoHeight
            initialState={{
              sorting: { sortModel: [{ field: 'product_name', sort: 'asc' }] },
            }}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      )}

      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalType === 'New Batch' && <AddBatch />}
        {modalType === 'Edit Stock' && <EditStock />}
        {modalType === 'New Product' && <CreateNewProduct />}
        {modalType === 'Alerts' && <InventoryAlerts />}
      </Modal>
    </div>
  );
}

