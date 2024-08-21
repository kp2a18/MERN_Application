// src/components/MenuItem.js
import React from 'react';
import SocialShare from './SocialShare';
import Review from './Review';

const MenuItem = ({ item }) => (
  <div>
    <h2>{item.name}</h2>
    <p>{item.description}</p>
    <SocialShare url={window.location.href} title={item.name} />
    <Review itemId={item._id} />
  </div>
);

export default MenuItem;
