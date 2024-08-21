// src/components/OrderTracking.js
import React from 'react';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const OrderTracking = ({ orderId }) => {
  const [status, setStatus] = useState('Preparing');

  useEffect(() => {
    socket.emit('trackOrder', orderId);

    socket.on('orderStatus', (newStatus) => {
      setStatus(newStatus);
    });

    return () => {
      socket.off('orderStatus');
    };
  }, [orderId]);

  return (
    <div>
      <h2>Order Tracking</h2>
      <p>Current Status: {status}</p>
    </div>
  );
};

export default OrderTracking;



