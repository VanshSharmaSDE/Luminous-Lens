const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Image model
const ImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true }
});
const Image = mongoose.model('Image', ImageSchema);

// Message model 
const MessageSchema = new mongoose.Schema({
  name:
    { type: String, required: true }, email: { type: String, required: true },
  message: { type: String, required: true }
}); const Message = mongoose.model('Message', MessageSchema);

// Blog model 
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true }
}); const Blog = mongoose.model('Blog', BlogSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// User registration route
app.post('/users/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send(err);
  }
});

// User login route
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');
    const token = jwt.sign({ userId: user._id }, 'secretKey');
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Image upload route
app.post('/images/upload', upload.single('image'), async (req, res) => {
  const { name, description } = req.body;
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  try {
    const newImage = new Image({ name, description, url: imageUrl });
    await newImage.save();
    res.status(201).send('Image uploaded');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Image delete route 
app.post('/images/delete', async (req, res) => {
  const { ids } = req.body;
  try {
    const images = await Image.find({ _id: { $in: ids } });
    for (const image of images) {
      fs.unlink(path.join(__dirname, image.url.replace('http://localhost:5000', '')),
        (err) => { if (err) { console.error(err); } });
    }
    await Image.deleteMany({ _id: { $in: ids } }); res.status(200).send('Images deleted');
  } catch (err) { res.status(500).send(err); }
});

// Get all images route
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Message submission route 
app.post('/messages', async (req, res) => {
  const { name, email, message } = req.body; try {
    const newMessage
      = new Message({ name, email, message }); await newMessage.save();
    res.status(201).send('Message received');
  } catch (err) { res.status(500).send(err); }
});

// Get all messages route 
app.get('/messages', async (req, res) => {
  try { const messages = await Message.find(); res.status(200).json(messages); }
  catch (err) { res.status(500).send(err); }
});

// Message delete route 
app.post('/messages/delete', async (req, res) => {
  const { ids } = req.body; try {
    await Message.deleteMany({
      _id: { $in: ids }
    }); res.status(200).send('Messages deleted');
  } catch (err) { res.status(500).send(err); }
});

// Blog upload route 
app.post('/blogs/upload', upload.single('image'), async (req, res) => {
  const { title, content } = req.body; const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  try { const newBlog = new Blog({ title, content, image: imageUrl }); await newBlog.save(); res.status(201).send('Blog uploaded'); }
  catch (err) { res.status(500).send(err); }
});

// Get all blogs route
app.get('/blogs', async (req, res) => {
  try { const blogs = await Blog.find(); res.status(200).json(blogs); }
  catch (err) { res.status(500).send(err); }
});

// Blog delete route
app.post('/blogs/delete', async (req, res) => {
  const { ids } = req.body;
  try {
    const blogs = await Blog.find({ _id: { $in: ids } }); for (const blog of blogs) {
      fs.unlink(path.join(__dirname, blog.image.replace('http://localhost:5000', '')), (err) => { if (err) { console.error(err); } });
    } await Blog.deleteMany({ _id: { $in: ids } }); res.status(200).send('Blogs deleted');
  } catch (err) { res.status(500).send(err); }
});

// Default route
app.get('/', (req, res) => {
  res.send("Server Working");
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
