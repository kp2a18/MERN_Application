# Food Ordering Application

This is a web-based food ordering application that allows users to browse food items, add them to their cart, and place orders. The application also allows users to view their order history and earn coins on successful orders.

## Features

- **User Authentication:**
  - Login and Logout functionality.
  
- **Browse Menu:**
  - Users can browse a list of available food items.

- **Add to Cart:**
  - Add food items to the cart with options like quantity and size.

- **Place Order:**
  - Users can select a payment method and place their orders.
  - Orders are saved with the order date, and users earn coins based on their total order amount.

- **Order History:**
  - Users can view their past orders.

- **Review System:**
  - Users can submit reviews and rate the food items.

- **Real-time Notifications:**
  - The server emits real-time updates when an order is placed or updated.

## Technologies Used

- **Frontend:**
  - React.js
  - Bootstrap
  - Context API for state management
  - Axios for HTTP requests

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose for MongoDB interactions
  - Socket.IO for real-time communication

- **Authentication:**
  - JSON Web Tokens (JWT)
