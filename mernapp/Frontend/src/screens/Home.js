import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import burger from '../img/burger.png';
import noodles from '../img/Noodles.png.jpg';
import sandwitch from '../img/Sandwitch.jpg';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodItems(response[0]);
    setFoodCategory(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value) }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img src={burger} className="d-block w-100" style={{ filter: "brightness(30%)", backgroundSize: "100% 100%", width: "100%", height: "100%" }} alt="burger" />
            </div>
            <div className="carousel-item">
              <img src={noodles} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="noodles" />
            </div>
            <div className="carousel-item">
              <img src={sandwitch} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="sandwitch" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {foodCategory.length > 0
          ? foodCategory.map((data) => (
            <div key={data._id} className='row mb-3'>
              <div className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {foodItems.length > 0
                ? foodItems
                  .filter((item) =>
                    item.CategoryName === data.CategoryName &&
                    item.name &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(filterItems => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card

                        foodName={filterItems.name}
                        options={filterItems.options[0]}
                        imgSrc={filterItems.img}
                        foodItem={filterItems}

                      />
                    </div>
                  ))
                : <div>No Such Data Found</div>}
            </div>
          ))
          : <div>Loading...</div>
        }
      </div>
      <Footer />
    </div>
  );
}
