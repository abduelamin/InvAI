import React, { useState, useEffect } from 'react';

const InventoryAlerts = ({ isOpen, onClose, children }) => {
  const [alerts, setAlerts] = useState([]);
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    const checks = async () => {
      let batchDetails = [];
      try {
        const response = await fetch('http://localhost:8080/api/batchdetails');
        if (!response.ok) {
          throw new Error('Failed to fetch batch details');
        }
        // Get batch details from the backend
        batchDetails = await response.json();
        setBatchData(batchDetails);
      } catch (error) {
        console.log('Error fetching batch details for alerts:', error);
      }

      // Now, process the batchDetails to generate alerts
      const now = new Date();
      const twoMonthsAway = new Date(now);
      twoMonthsAway.setMonth(now.getMonth() + 2);
      const oneMonthAway = new Date(now);
      oneMonthAway.setMonth(now.getMonth() + 1);

      const alertsArray = batchDetails.map((item) => {
        let alertMessages = [];

        // Here we assume that if current_stock equals reorder_threshold, it's a reorder alert
        const stockReachedReorderThreshold = item.current_stock === item.reorder_threshold;

        const expiryDate = new Date(item.expiry_date);
        const formattedExpiryDate = new Date(item.expiry_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

  
        if (stockReachedReorderThreshold) {
          alertMessages.push(
            `${item.product_name} | ${item.strength} | ${item.batch_number} has a current level of ${item.current_stock} which has reached its reorder point of ${item.reorder_threshold}.`
          );
        }

        if (expiryDate <= now) {
          alertMessages.push(
            `${item.product_name} | ${item.strength} | ${item.batch_number} has already expired on ${formattedExpiryDate}.`
          );
        } 
  
        else if (expiryDate <= twoMonthsAway && expiryDate > oneMonthAway) {
          alertMessages.push(
            `${item.product_name} | ${item.strength} | ${item.batch_number} will expire in under 2 months on ${formattedExpiryDate}.`
          );
        } 
        else if (expiryDate <= oneMonthAway) {
          alertMessages.push(
            `${item.product_name} | ${item.strength} | ${item.batch_number} will expire in under 1 month on ${formattedExpiryDate}.`
          );
        }

        // Return the alertMessages array for this item (could be empty if no alerts)
        return alertMessages;
      });

      // Flatten the array of arrays into one single array of alerts
      const flattenedAlerts = alertsArray.flat();
      setAlerts(flattenedAlerts);
    };

    checks();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Batch Alerts</h1>

      {/* Reorder Alerts */}
      {alerts.filter(alert => alert.includes('reorder')).length > 0 && (
        <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-yellow-800 text-xl">⚠️</span>
            <h2 className="font-semibold text-yellow-800">Reorder Alerts</h2>
          </div>
          <ul className="space-y-1">
            {alerts.filter(alert => alert.includes('reorder')).map((alert, index) => (
                <>
                 <li key={index} className="text-sm text-gray-700">{alert}</li>
                 <hr />
                </>
            ))}
          </ul>
        </div>
      )}

      {/* Expiry Alerts */}
      {alerts.filter(alert => alert.includes('expire')).length > 0 && (
        <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-red-800 text-xl">❌</span>
            <h2 className="font-semibold text-red-800">Expiry Alerts</h2>
          </div>
          <ul className="space-y-1">
            {alerts.filter(alert => alert.includes('expire')).map((alert, index) => (
                <>
              <li key={index} className="text-sm text-gray-700">{alert}</li>
              <hr /></>
            ))}
          </ul>
        </div>
      )}

      {/* All Clear */}
      {alerts.length === 0 && (
        <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-green-800 text-xl">✅</span>
            <h2 className="font-semibold text-green-800">All Clear!</h2>
          </div>
          <p className="text-sm text-gray-700">
            No active alerts at this time. Your stock is well-managed.
          </p>
        </div>
      )}
    </div>
  );
};

export default InventoryAlerts;
