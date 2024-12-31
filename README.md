🌟 Wonderlust - A Backend Project 🌟
Welcome to Wonderlust! 🌍✨

Wonderlust is a fully functional backend application built with Express.js and Node.js as part of my learning journey. This project enables users to sign up, log in, add listings, rate properties, and manage their content with complete authentication and authorization.

🚀 Key Features

🔐 User Authentication & Authorization
Sign Up & Login: Users can create an account and log in securely using Passport.js. 💬
Access Control: Only the user who created a listing or rating can delete it, ensuring secure data ownership and control. 🔒
🏡 Listing Management
Add Listings: Users can easily add new listings with details such as title, description, price, location, and images. 📸
View Listings: Discover available properties with ease, including the ability to browse by category and location. 🧳
⭐ Ratings
Rate Properties: Users can leave ratings and reviews on properties to help others make informed decisions about their stays. 📝
Real-time Updates: As users add or modify their ratings, everything updates instantly to reflect the latest feedback. 🔄
📍 Location-Based Search & Category Filters
Search by Location: Find properties based on your preferred city, neighborhood, or region. 🌍
Filter by Category: Easily filter properties by type (e.g., Apartments, Houses, Villas). 🏠🏢
💾 Session Management
Session Security: User session data is securely stored using mongo-session on MongoDB, ensuring consistent and safe session handling. 🛡️
🖼️ Image Storage
Cloudinary Integration: All images uploaded by users are stored and managed via Cloudinary, ensuring fast and secure image handling. 🖼️
🗺️ Map Integration
Mapbox Integration: I’ve integrated Mapbox to display the actual location of the listed properties on a map. Users can now view listings on an interactive map, making it easy to find properties in their desired locations. 🌍🗺️
🔧 Efficient Data Modeling
I’ve implemented efficient data modeling to ensure the backend is fast and scalable. The project uses best practices to structure and manage data securely, optimizing database queries for performance and reliability. ⚙️
🔄 MVC Architecture
The entire project is structured using the MVC (Model-View-Controller) architecture, which helps to keep the codebase clean, modular, and maintainable. The Model represents data, the View handles the user interface, and the Controller manages logic and flow between the Model and View. This structure ensures the project is scalable and easy to maintain. 🏗️
💻 Tech Stack

Backend: Node.js, Express.js
Authentication: Passport.js
Database: MongoDB
Session Storage: mongo-session
Image Storage: Cloudinary
Map Integration: Mapbox
Architecture: MVC (Model-View-Controller)
