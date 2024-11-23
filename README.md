# 🎨 LuminousLens 🚀

![LuminousLens Banner](https://unsplash.com/photos/a-laptop-with-a-broken-keyboard-and-a-broken-camera-z1YJCZ-yV2Q)

Welcome to the **LuminousLens Admin Dashboard**. This project allows administrators to manage image galleries, blog posts, and messages from users. It is built using modern web technologies and provides a user-friendly interface for efficient content management.

---

## 🌟 Features

- **Image Management**: Upload, view, and delete images.
- **Blog Management**: Create, view, and delete blog posts with images.
- **Message Management**: View and delete user messages.
- **Responsive Design**: Optimized for various screen sizes.
- **User Authentication**: Secure login for administrators.

---

## 🛠️ Technologies Used

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Styling**: CSS
- **Miscellaneous**: Multer (file uploads), bcryptjs (password hashing), JWT (authentication)

---

## 🚀 Setup and Installation

### Step 1: Clone the Repository
git clone https://github.com/yourusername/LuminousLens.git
cd LuminousLens

Step 2: Install Dependencies
npm install
cd client
npm install
cd ..

Step 3: Set Up Environment Variables
Create a .env file in the root directory and add the following:
MONGO_URI=mongodb://localhost:27017/LuminousLens
JWT_SECRET=your_jwt_secret

Step 4: Start the Backend Server
npm run server

Step 5: Start the Frontend
cd client
npm start

📖 Usage

Admin Dashboard Features
Login: Navigate to the login page and enter admin credentials.
Manage Images: Upload new images, view the gallery, and delete images.
Manage Blogs: Create new blog posts, view all blogs, and delete blogs.
Manage Messages: View messages from users and delete them if necessary.


📥 Sample Data Insertion

To insert sample blog data into the MongoDB database, use the following script:
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/LuminousLens', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Blog model
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true }
});
const Blog = mongoose.model('Blog', BlogSchema);

const blogs = [
  {
    title: 'Exploring the Mountains',
    content: 'There is something magical about the mountains. The fresh air, the stunning views, and the sense of tranquility make it a perfect escape from the hustle and bustle of daily life.',
    image: 'https://unsplash.com/photos/a-laptop-with-a-broken-keyboard-and-a-broken-camera-z1YJCZ-yV2Q'
  },
  {
    title: 'City Life: The Hustle and Bustle',
    content: 'Living in the city has its unique charm. From the tall skyscrapers to the vibrant nightlife, there is always something to do and see in the city that never sleeps.',
    image: 'https://unsplash.com/photos/a-laptop-with-a-broken-keyboard-and-a-broken-camera-z1YJCZ-yV2Q'
  },
  {
    title: 'A Day at the Beach',
    content: 'The beach is a perfect place to relax and unwind. With the sound of waves crashing and the warm sun on your skin, it is a slice of paradise.',
    image: 'https://unsplash.com/photos/a-laptop-with-a-broken-keyboard-and-a-broken-camera-z1YJCZ-yV2Q'
  },
  {
    title: 'Culinary Adventures: Tasting the World',
    content: 'Food is a gateway to culture. Exploring different cuisines can be an eye-opening experience, offering a taste of various traditions and flavors from around the world.',
    image: 'https://unsplash.com/photos/a-laptop-with-a-broken-keyboard-and-a-broken-camera-z1YJCZ-yV2Q'
  },
  {
    title: 'The Beauty of the Forest',
    content: 'Walking through a dense forest can be an ethereal experience. The tall trees, the sounds of wildlife, and the peaceful ambiance make it a haven for nature lovers.',
    image: 'https://unsplash.com/photos/a-laptop-with-a-broken-keyboard-and-a-broken-camera-z1YJCZ-yV2Q'
  }
];

Blog.insertMany(blogs)
  .then(() => {
    console.log('Blogs inserted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });

📂 Folder Structure

LuminousLens/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Image.js
│   │   ├── Message.js
│   │   └── Blog.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── images.js
│   │   ├── messages.js
│   │   └── blogs.js
│   ├── server.js
│   └── ...
├── .env
├── package.json
├── README.md
└── ...
🤝 Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch:

git checkout -b feature/your-feature
Commit your changes:

git commit -m "Add your feature"
Push to the branch:

git push origin feature/your-feature
Open a Pull Request.
📜 License
This project is licensed under the MIT License. See the LICENSE file for more details.

📧 Contact
For inquiries or feedback, contact me at vansh4664@gmail.com
