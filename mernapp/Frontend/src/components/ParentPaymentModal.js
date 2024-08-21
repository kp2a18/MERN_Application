import React, { useState } from 'react';
import PaymentModal from './ParentComponent'; // Adjust the import path as necessary

const ParentComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowModal(false); // Close the modal after selecting a payment method
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Order Now</Button>
      <PaymentModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onPaymentMethodSelect={handlePaymentMethodSelect}
      />
      {selectedPaymentMethod && <p>Selected Payment Method: {selectedPaymentMethod}</p>}
    </div>
  );
};

export default ParentComponent;
