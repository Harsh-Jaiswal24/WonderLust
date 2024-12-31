## 🌟 Wonderlust - A Backend Project 🌟

Welcome to Wonderlust! 🌍✨

Wonderlust is a fully functional backend application built with Express.js and Node.js as part of my learning journey. This project enables users to sign up, log in, add listings, rate listings and manage their content with complete authentication and authorization.

---

🚀 **Key Features**

---

🔐 **User Authentication & Authorization**
- **Sign Up & Login**: Users can create an account and log in securely using Passport.js. 💬
- **Access Control**: Only the user who created a listing or rating can delete it, ensuring secure data ownership and control. 🔒

---

🏡 **Listing Management**
- **Add Listings**: Users can easily add new listings with details such as title, description, price, location, and images. 📸
- **View Listings**: Discover available properties with ease, including the ability to browse by category and location. 🧳

---

⭐ **Ratings**
- **Rate Properties**: Users can leave ratings and reviews on properties to help others make informed decisions about their stays. 📝
- **Review Access Control**: Only user who added can delete their ratings, everything updates instantly to reflect the latest feedback. 🔄

---

📍 **Location-Based Search & Category Filters**
- **Search by Location**: Find listings based on your preferred city, neighborhood, or region. 🌍
- **Filter by Category**: Easily filter properties by type (e.g, Single Room, Beachfront, Top cities ..). 🏠🏢

---

💾 **Session Management using mongo-session**
- **Session Security**: User session data is securely stored using connect-mongo is a MongoDB session store for express-session, which allows you to store session data in a MongoDB database instead of the default in-memory storage ensuring consistent and safe session handling. 🛡️

---

🖼️ **Image Storage**
- **Cloudinary Integration**: All images uploaded by users are stored and managed via Cloudinary, ensuring fast and secure image handling. 🖼️

---

🗺️ **Map Integration**
- **Mapbox Integration**: I’ve integrated Mapbox to display the actual location of the listed properties on a map. Users can now view listings on an interactive map, making it easy to find properties in the desired location.

---

🔧 **Efficient Data Modeling**
- I’ve implemented efficient data modeling to ensure the backend is fast and scalable. The project uses best practices to structure and manage data securely, optimizing database queries for performance.

---

🔄 **MVC Architecture**
- The entire project is structured using the MVC (Model-View-Controller) architecture, which helps to keep the codebase clean, modular, and maintainable. The Model represents data, the View handles the user interface, and the Controller manages the application logic.

---

💻 **Tech Stack**
- **Backend**: Node.js, Express.js
- **Authentication**: Passport.js
- **Database**: MongoDB
- **Session Storage**: connect-mongo
- **Image Storage**: Cloudinary
- **Map Integration**: Mapbox
- **Architecture**: MVC (Model-View-Controller)
