import React, { useState } from 'react';
import './Track.css';
import cooking from '../img/trackImg/cooking.png';
import handOver from '../img/trackImg/handOver.png';
import onTheWay from '../img/trackImg/onTheWay.png';
import reachedHome from '../img/trackImg/reachedHome.png';
import delivered from '../img/trackImg/delivered.png';
import arrowRightActive from '../img/trackImg/arrowRightActive.png';
import arrowRightInactive from '../img/trackImg/arrowRightInactive.png';

export default function Track() {
    const [status, setStatus] = useState(0);

    const changeStatus = () => {
        let listItems = document.getElementsByClassName("taskIcon");
        let arrowList = document.getElementsByClassName("arrowImage")
        let code = status===4?status:status+1;
        for (let index = 0; index <5; index++) {
            listItems[index].className = 'smallImage taskIcon';
        }
        listItems[code].className = 'largeImage taskIcon';
        for (let index = 0; index < code; index++) {
            arrowList[index].setAttribute("src",arrowRightActive);
        }
        setStatus(prevStatus => ((prevStatus===4)?(prevStatus):(prevStatus+1)));
    };
    const giveStatusFromCode = (code) => {
        if (code === 0) {
            return "Preparing the food"
        }
        else if (code === 1) {
            return "Hand Over to Deliver"
        }
        else if (code === 2) {
            return "Delivery on the way"
        }
        else if (code === 3) {
            return "Reach at your destination"
        }
        return "Order Delivered"
    }
    return (
        <div className='track-model'>
            <button onClick={changeStatus}>Change Status</button>
            <ul className='list'>
                <li className='listItem'>
                    <figure>
                        <img className='largeImage taskIcon' src={cooking} alt="Cooking" />
                        <figcaption>Preparing the food</figcaption>
                    </figure>

                </li>
                <li className='listItem'>
                    <img className='arrowImage' src={arrowRightInactive} alt="Arrow Inactive" />
                </li>
                <li className='listItem'>
                    <figure>
                        <img className='smallImage taskIcon' src={handOver} alt="Cooking" />
                        <figcaption>Hand Over to Deliver</figcaption>
                    </figure>
                </li>
                <li className='listItem'>
                    <img className='arrowImage' src={arrowRightInactive} alt="Arrow Inactive" />

                </li>
                
                <li className='listItem'>
                    <figure>
                        <img className='smallImage taskIcon' src={onTheWay} alt="On The Way" />
                        <figcaption>Delivery on the way</figcaption>
                    </figure>
                </li>
                <li className='listItem'>
                    <img className='arrowImage' src={arrowRightInactive} alt="Arrow Inactive" />

                </li>
                <li className='listItem'>
                    <figure>
                        <img className='smallImage taskIcon' src={reachedHome} alt="Reach at your destination" />
                        <figcaption>Reach at your destination</figcaption>
                    </figure>
                </li>
                <li className='listItem'>
                    <img className='arrowImage' src={arrowRightInactive} alt="Arrow Inactive" />

                </li>
                <li className='listItem'>
                    <figure>
                        <img className='smallImage taskIcon' src={delivered} alt="Order Delivered" />
                        <figcaption>Order Delivered</figcaption>
                    </figure>
                </li>
            </ul>
            <h1 className="trackHeader">{giveStatusFromCode(status)}</h1>
        </div>
    );
}

