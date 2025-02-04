require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const uri = process.env.URI;
const cors = require('cors');

// Middle weres
app.use(express.json())
app.use(cors());

// Route Handlers 
const productHandler = require('./routeHandler/productHandler');
const subcategoryHandler = require('./routeHandler/subcategoryHandler');
const categoryHandler = require('./routeHandler/categoryHandler');
const cartHandler = require('./routeHandler/cartHandler');
const wishListHandler = require('./routeHandler/wishlistHandler');

// Category Handler
app.use('/categories', categoryHandler);

// SubCategory Handler
app.use('/subcategories', subcategoryHandler);

// Product Handler
app.use('/products', productHandler);

// Cart Handler
app.use('/cart', cartHandler);

// WishList Handler
app.use('/wishlist', wishListHandler);




// Check the db Connection
mongoose.connect(uri)
.then(()=> console.log("MongoDb Conneted Successfully"))
.catch((err)=> console.log("Connection Error on mongodb"))

app.get('/', (req, res)=>{
    res.send("Hello");
})

app.listen(port, ()=>{
    console.log("The server is runnign in port: ", port);
})