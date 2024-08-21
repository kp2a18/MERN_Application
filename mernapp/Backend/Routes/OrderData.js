const express = require('express');
const router = express.Router();
const Order = require('../modles/Orders');


module.exports = (io) => {
  router.post('/orderData', async (req, res) => {
    try {
      let data = req.body.order_data;
      data.splice(0, 0, { Order_date: req.body.order_date });

      const totalAmount = data.reduce((total, item) => total + item.price, 0);
      //const earnedCoins = totalAmount * 0.05;

      let eId = await Order.findOne({ email: req.body.email });

      if (eId === null) {
        await Order.create({
          email: req.body.email,
          order_data: [data],
          payment_method: req.body.payment_method
          //coins: earnedCoins
        });
        res.json({ success: true });
        io.emit('orderUpdate', { email: req.body.email, status: 'Order placed' });
      } else {
        await Order.findOneAndUpdate(
          { email: req.body.email },
          { $push: { order_data: data }, 
          //$inc: { coins: earnedCoins }
           payment_method: req.body.payment_method }
        );
        res.json({ success: true });
        io.emit('orderUpdate', { email: req.body.email, status: 'Order updated' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error: " + error.message);
    }
  });

  router.post('/myOrderData', async (req, res) => {
    try {
      let eId = await Order.findOne({ email: req.body.email });
      res.json({ orderData: eId });
    } catch (error) {
      res.status(500).send("Error: " + error.message);
    }
  });

  return router;
};
