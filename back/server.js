require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();


connectDB();


app.use(cors());
app.use(express.json());



app.use('/api/auth', require('./routes/authroute'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/products', require('./routes/Productroute'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
