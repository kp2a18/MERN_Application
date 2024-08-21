import React, { useEffect, useState } from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentModal from '../components/ParentComponent';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [coins, setCoins] = useState(0);
  const [useCoin, setUseCoin] = useState(false);

  useEffect(() => {
    // Recalculate total price
    const newTotalPrice = data.reduce((total, food) => total + food.price, 0);
    setTotalPrice(useCoin ? newTotalPrice - 1 : newTotalPrice); // Adjust total price based on coin usage
  }, [data, useCoin]);

  useEffect(() => {
    const fetchCoins = async () => {
      let userEmail = localStorage.getItem("userEmail");
      let response = await fetch("http://localhost:5000/api/myOrderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });

      let result = await response.json();
      if (result.orderData && result.orderData.coins !== undefined) {
        setCoins(result.orderData.coins);
      } else {
        setCoins(0); // Default to 0 if no coins are found
      }
    };

    fetchCoins();
  }, []);

  const handleCheckOut = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentMethodSelect = async (method) => {
    setShowPaymentModal(false);
    setIsLoading(true);
    setError(null);
    let userEmail = localStorage.getItem("userEmail");

    try {
      let response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
          payment_method: method 
        })
      });

      if (response.ok) {
        console.log("Order placed successfully");

        // Calculate earned coins (5% of total price)
        const earnedCoins = totalPrice * 0.05;

        // Update local coin balance
        setCoins(prevCoins => prevCoins + earnedCoins);

        dispatch({ type: "DROP" });
        toast.success(`Order Placed Successfully! You earned ${earnedCoins.toFixed(2)} coins.`);
      } else {
        console.error("Failed to place order:", response.statusText);
        setError("Failed to place order: " + response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setError("Error during fetch: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUseCoins = () => {
    setUseCoin(prevUseCoin => !prevUseCoin);
  };

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>S.No.</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{color: 'white'}}>
          <input type="checkbox" id="coin" name="coin" value="coin" checked={useCoin} onChange={toggleUseCoins} />
          <label htmlFor="coin"> Use coin</label>
          <h1 className='fs-2'>
            Total Price: {totalPrice.toFixed(2)}/- {useCoin && <span>(Using coin)</span>}
          </h1>
          <h2 className='fs-2'>Your Coins: {coins.toFixed(2)}</h2>
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut} disabled={isLoading}>
            {isLoading ? 'Checking Out...' : 'Order Now'}
          </button>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
      <PaymentModal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} onPaymentMethodSelect={handlePaymentMethodSelect} />
      <ToastContainer />
    </div>
  );
}
