const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

console.log('🚀 Starting Mooney Agrifarm Server...');

// ✅ Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB Connection
const MONGO_URI = "mongodb+srv://greenlee2513:kZ6pszwcBIfdy7ln@cluster0.qhrxj8m.mongodb.net/mooneyagrifarm?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

///// ✅ Schemas & Models /////
const userSchema = new mongoose.Schema({
    name: String,
    role: String
});
const User = mongoose.model('User', userSchema);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

///// ✅ Routes /////

// ➤ Fetch all users
app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// ➤ Add new user
app.post('/api/users', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: '✅ User saved successfully', user: newUser });
});

// ➤ Submit contact message
app.post('/api/contact', async (req, res) => {
    const newMessage = new Contact(req.body);
    await newMessage.save();
    res.status(201).json({ message: '✅ Message sent successfully', contact: newMessage });
});

///// ✅ Start Server /////
app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));