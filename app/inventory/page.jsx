"use client"
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

export default function Inventory() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInventory = async () => {   
      try {
        const response = await fetch('http://localhost:8080/api/stockoverview')
        if (!response.ok) throw new Error('Failed to fetch')
        const { rows } = await response.json()
        
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
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchInventory()
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

  if (isLoading) return <div>Loading inventory...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Header title='Inventory'/> 
      <DataGrid 
        rows={data}
        columns={columns}
        getRowId={(row) => row.batch_id}
        className='bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700'
        initialState={{
          sorting: {
            sortModel: [{ field: 'product_name', sort: 'asc' }],
          },
        }}
      />
    </>
  )
}