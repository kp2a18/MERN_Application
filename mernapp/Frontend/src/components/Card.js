import React, { useEffect, useRef, useState } from 'react';
import food from '../img/food.jpg';
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';


export default function Card(props) {
    const dispatch = useDispatchCart();
    let navigate = useNavigate();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    useEffect(() => {
        console.log('Data:', data);
        console.log('Options:', options);
        setSize(priceRef.current.value);
    }, [data, options]);

    const handleQty = (e) => {
        setQty(e.target.value);
    };

    const handleOptions = (e) => {
        setSize(e.target.value);
    };

    const handleAddtoCart = async () => {
        
        let foodItem = data.find(item => item.id === props.foodItem._id && item.size === size);
        

        if (foodItem) {
            await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        } else {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodName, price: finalPrice, qty: qty, size: size });
        }
    };

    const finalPrice = qty * parseInt(options[size]);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                    <img src={food} className="card-img-top" alt="food" style={{ height: "150px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded" onChange={handleQty}>
                                {Array.from(Array(6), (e, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>

                            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={handleOptions}>
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>{data}</option>
                                ))}
                            </select>

                            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
                            <div>
                                <hr />
                                <button className="btn btn-success justify-center ms-2" onClick={handleAddtoCart}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
