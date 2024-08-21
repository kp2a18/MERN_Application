import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Track from '../screens/Track';
import moneyGif from '../img/coin.gif';

export default function Navbar(props) {
  const [cartView, setCartView] = useState(false)
  const [trackView, setTrackView] = useState(false)
  localStorage.setItem('temp', "first")
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  const loadCart = () => {
    setCartView(true)
  }

  const loadTrack = () => {
    setTrackView(true)
  }

  const items = useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">ChooseFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className='nav-item' style={{display: 'flex'}}>
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                  <Link className="nav-link active fs-5">
                    <span style={{ fontSize: '1.2rem', fontWeight: '900'}}>1</span>
                    <img style={{ height: '2.2rem', width: '2.5rem', display: 'span', paddingLeft: "0.5rem" }} src={moneyGif}/>
                  </Link>
                </li>
                : ""}

            </ul>
            {(!localStorage.getItem("authToken")) ?
              <form className='d-flex'>

                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
              </form>
              :
              <div>
                <div className='btn bg-white text-success mx-2' onClick={loadTrack}>
                  Track Order
                </div>
                {trackView ? <Modal onClose={() => setTrackView(false)}><Track></Track></Modal> : ""}
                <div className='btn bg-white text-success mx-2' onClick={loadCart}>

                  <Badge color="secondary" badgeContent={items.length} >
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                <button onClick={handleLogout} className='btn bg-white text-danger mx-2' >
                  Logout
                </button>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
