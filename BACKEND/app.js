const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const path = require("path");
const Product = require("./models/Product");
const User = require("./models/User");
const { error } = require("console");

const port = 8080;
const dburl =
  "mongodb+srv://mern-stack:mernstack%401234@cluster0.h5hdris.mongodb.net/e-commerce";

mongoose.connect(dburl);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World!");
});

//IMAGES STORAGE ENGINE
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//CREATING UPLOAD ENDPOINT FOR IMAGES
app.use("/images", express.static("uploads/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//ADDING PRODUCTS TO DATABASE
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product = products[products.length - 1];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Product added successfully!");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//REMOVE PRODUCT FROM DATABASE
app.post("/removeproduct", async (req, res) => {
  let removeproduct = await Product.findOneAndDelete({ id: req.body.id });
  console.log(removeproduct);
  console.log("Product removed successfully!");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//CREATING ENDPOINT TO GET ALL PRODUCTS
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched successfully!");
  res.json(products);
});

//CREATING ENDPOINT FOR REGISTERING USERS
app.post("/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Email already exists!",
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  console.log("User added successfully!");

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_key");
  res.json({
    success: true,
    token: token,
  });
});

//CREATING ENDPOINT FOR LOGIN
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passcompare = req.body.password === user.password;
    if (passcompare) {
      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, "secret_key");
      res.json({
        success: true,
        token: token,
      });
    } else {
      res.json({
        success: false,
        errors: "Wrong Password",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      errors: "Wrong  Email id",
    });
  }
});

//CREATING ENDPOINT FOR NEW COLLECTION DATA
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let new_collections = products.slice(1).slice(-8);
  console.log("New collections fetched successfully!");
  res.json(new_collections);
});

//CREATING ENDPOINT FOR POPULAR PRODUCTS
app.get("/popularinwomen", async (req, res) => {
let products = await Product.find({category: "Women"});
let popular_women = products.slice(0,4);
console.log("Popular in women fetched successfully!");
res.json(popular_women);
});

//CREATING MIDDLWARE TO VERIFY TOKEN
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({error:"Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_key");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({error:"Please authenticate using a valid token" });
  }
};
//CREATING ENDPOINT TO ADD IN CARTDATA
app.post("/addtocart", fetchuser, async (req, res) => {
  console.log("added",req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });
  let cartData = userData.cartData;
  cartData[req.body.itemId] = cartData[req.body.itemId] + 1;
  await User.updateOne({ _id: req.user.id }, { cartData: cartData });
  res.send("Item added to cart successfully!");
  
}
);

//CREATING ENDPOINT TO REMOVE FROM CARTDATA
app.post("/removefromcart", fetchuser, async (req, res) => {
  console.log("removed",req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });
  let cartData = userData.cartData;
  if(cartData[req.body.itemId] >0){
    cartData[req.body.itemId] = cartData[req.body.itemId] - 1;
  }
  await User.updateOne({ _id: req.user.id }, { cartData: cartData });
  res.send("Item removed from cart successfully!");
});

//CREATING ENDPOINT TO GET CARTDATA
app.post("/getcartdata", fetchuser, async (req, res) => {
  console.log("getcartdata");
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.get("*", (req, res) => {
  res.send("404! Page not found");
})

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port http://localhost:${port}`);
  } else {
    console.log("Error: " + error);
  }
});
