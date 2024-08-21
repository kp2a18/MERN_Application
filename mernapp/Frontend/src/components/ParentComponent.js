import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PaymentModal = ({ show, onHide, onPaymentMethodSelect }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSelect = (method) => {
    setPaymentMethod(method);
    onPaymentMethodSelect(method);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Select Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button style={{margin:'0.5rem',display:'block'}} onClick={() => handleSelect('Credit/Debit Card')}>Credit/Debit Card</Button>
        <Button style={{margin:'0.5rem',display:'block'}} onClick={() => handleSelect('UPI Payment')}>UPI Payment</Button>
        <Button style={{margin:'0.5rem',display:'block'}} onClick={() => handleSelect('Cash on Delivery')}>Cash on Delivery</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
