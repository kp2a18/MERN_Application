import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import SocialShare from './components/SocialShare';
import Review from './components/Review';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [itemId, setItemId] = useState('12345'); 

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={
              <div>
                <Home />
                <footer style={{ border: "1px solid black", display: "block", clear: "both" }}>
                  <SocialShare style={{ float: "left" }} url="http://yourwebsite.com" title="Check out this amazing dish!" />
                  <Review itemId={itemId} /> {/* Use dynamic itemId */}
                </footer>
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
