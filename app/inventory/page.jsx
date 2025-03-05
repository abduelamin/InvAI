"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ChevronDown, Loader2, AlertCircle } from "lucide-react";
import CreateNewProduct from "@/components/CreateNewProduct";
import Modal from "@/components/Modal";
import AddBatch from "@/components/AddBatch";
import EditStock from "@/components/EditStock";
import InventoryAlerts from "@/components/InventroyAlerts";

export default function Inventory() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(
          "https://inv-ai-backend.vercel.app/api/stockoverview"
        );
        if (!response.ok) throw new Error("Failed to fetch inventory");
        const { rows } = await response.json();
        const processedData = rows.map((row) => ({
          ...row,
          expiry_date: new Date(row.expiry_date),
          formatted_expiry: new Date(row.expiry_date).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          ),
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
    { field: "product_name", headerName: "Product Name", width: 200 },
    {
      field: "strength",
      headerName: "Strength",
      width: 150,
      disableColumnFilter: true,
      sortable: false,
    },
    { field: "form", headerName: "Form", width: 150 },
    { field: "batch_number", headerName: "Batch Number", width: 200 },
    { field: "current_stock", headerName: "Current Stock", width: 150 },
    {
      field: "expiry_date",
      headerName: "Expiry Date",
      width: 200,
      valueFormatter: (value, row) => row.formatted_expiry,
      sortComparator: (v1, v2) => v1 - v2,
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-2xl shadow-lg border border-amber-100 mb-6 gap-4">
          <h1 className="text-3xl font-bold text-amber-800">
            Inventory Management
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setModalType("Alerts");
              }}
              className="flex items-center gap-2 px-6 py-3 bg-amber-200 text-black rounded-xl font-medium shadow-md hover:bg-amber-600 transition-all"
            >
              <AlertCircle size={20} /> Status Alerts
            </button>

            <div className="relative">
              <button
                onClick={() => setDropdown((prev) => !prev)}
                className="flex items-center gap-2 px-6 py-3 bg-amber-800 text-white rounded-xl font-medium shadow-md hover:bg-amber-900 transition-all"
              >
                Manage Inventory <ChevronDown size={20} />
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-xl py-2 w-64 z-20 border border-amber-100 animate-slideDown">
                  {["New Batch", "Edit Stock", "New Product"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setIsModalOpen(true);
                        setDropdown(false);
                        setModalType(type);
                      }}
                      className="block w-full px-5 py-3 text-left text-amber-800 hover:bg-amber-50 transition-colors"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center mb-8 space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium text-amber-700 animate-pulse">
              Preparing inventory...
            </span>
          </div>
        )}

        {!isLoading && !error && (
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100">
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row.batch_id}
              autoHeight
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#fef3c7",
                  fontSize: "1rem",
                },
                "& .MuiDataGrid-cell": {
                  borderColor: "#ffedd5",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#fff7ed",
                },
              }}
              initialState={{
                sorting: {
                  sortModel: [{ field: "product_name", sort: "asc" }],
                },
              }}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalType === "New Batch" && <AddBatch />}
        {modalType === "Edit Stock" && <EditStock />}
        {modalType === "New Product" && <CreateNewProduct />}
        {modalType === "Alerts" && <InventoryAlerts />}
      </Modal>
    </div>
  );
}
