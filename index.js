require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const uri = process.env.URI;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const JWT_SECRET = process.env.JWT_SECRET;

// Middle weres
app.use(express.json())
// app.use(cors());
app.use(cors({
    origin: [
      'http://localhost:3000'
    ], 
    credentials: true,
  }));

// jwt
const jwt = require('jsonwebtoken');
app.use(cookieParser()); // Fix: Cookie parser is now correctly used



// ✅ Middleware to Verify JWT
const verifyToken = (req, res, next) => {
    const token = req.cookies?.myToken; // ✅ Extract token properly
    // console.log("token: ", token)
    // console.log(req.user.email, req.params.em)

    console.log(req.params)


    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access you havent' token!" });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or Expired Token" });
        }
        req.user = decoded; // Store user info        
        next();
    });
};

// Route to issue JWT (Access Token and Refresh Token)
app.post('/jwt', async (req, res) => {
    const user = req.body;
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: '30s' }); // Short-lived access token
    const refreshToken = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' }); // Long-lived refresh token

    // Store the refresh token in an HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: 'strict', // Prevent CSRF
    });

    res.cookie('myToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    }).json({ success: true, token: accessToken });
});

// Route to handle Refresh Token
app.post('/refresh', async (req, res) => {
    const refreshToken = req.cookies?.refreshToken; // Extract refresh token from cookies
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or Expired Refresh Token" });
        }

        const newAccessToken = jwt.sign({ email: decoded.email }, JWT_SECRET, { expiresIn: '30s' }); // Generate new access token
        res.cookie('myToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.json({ success: true, token: newAccessToken });
    });
});






// ✅ Auth Route: Issue JWT Token
// app.post('/jwt', async (req, res) => {
//     const user = req.body;
//     // console.log('Generating token for user:', user);

//     const token = jwt.sign(user, JWT_SECRET, { expiresIn: '30s' });

//     res.cookie("myToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production", // Secure in production
//         sameSite: 'strict' // Prevent CSRF
//     })
//     .json({ success: true, token });
// });





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
app.use('/cart', verifyToken, cartHandler);

// WishList Handler
app.use('/wishlist', wishListHandler);



// const CartModel = require('./schemas/cartSchemaModel');

// app.get('/cart/:em', verifyToken, async(req, res)=>{

//     try{
//         const result = await CartModel.find({email : req.params.em});
//         res.status(200).send(result);

//     }catch(err){
//         res.status(500).send(err.message);
//     }
// })





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