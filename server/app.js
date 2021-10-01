const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;

require("./db/conn");
const User = require("./models/User");
const Food = require("./models/Food");

app.use(express.json());
app.use(cors());

//@ GetAllUser
app.get("/user/GetAllUsers", async (req, res) => {
  try {
    const GetUser = await User.find();
    res.send(GetUser.reverse());
  } catch (error) {
    console.log(error);
    res.status(404).send("NO Data Available");
  }
});

//@ Get User by ID
app.get("/user/GetUserById/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const GetOneUser = await User.find({ _id });
    res.send(GetOneUser);
  } catch (error) {
    console.log(error);
    res.send("No User found");
  }
});

//@ SignUp
app.post("/user/signup", async (req, res) => {
  try {
    console.log(req.body);
    const userData = new User(req.body);
    const UserData = await userData.save();
    console.log(UserData);
    res.status(201).send("signup successful");
  } catch (error) {
    res.status(500).send("Enter Valid Credentials");
    console.log(error);
  }
});

//@ Update User
app.put("/user/update/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const GetUser = await User.findByIdAndUpdate({ _id }, req.body);
    res.send("Update User");
  } catch (error) {
    console.log(error);
    res.status(400).send("Update Failed");
  }
});

//@ Delete User
app.delete("/user/delete/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const GetUser = await User.findByIdAndDelete({ _id });
    res.status(200).send(GetUser);
  } catch (error) {
    console.log(error);
    res.status(404).send("pass a valid Id");
  }
});

// @Login
app.post("/user/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`username ${email} password ${password}`);
    const Authenticate_User = await User.findOne({
      email: email,
      password: password,
    });
    if (!Authenticate_User) {
      res.status(404).send("Account Does not Found");
    } else {
      res.send(Authenticate_User);
      console.log(Authenticate_User);
    }
  } catch (error) {
    res.status(400).send("invalid email");
    console.log(error);
  }
});

// food api

//@ addfood
app.post("/food/addFood", async (req, res) => {
  try {
    const FoodData = new Food(req.body);
    const SaveFoodData = await FoodData.save();
    console.log(SaveFoodData);
    res.status(201).send("Added successful");
  } catch (error) {
    res.status(500).send("Enter Valid Credentials");
    console.log(error);
  }
});

//@ Get all food list
app.get("/food/foodlist", async (req, res) => {
  try {
    const GetFoodList = await Food.find();
    res.send(GetFoodList.reverse());
  } catch (error) {
    console.log(error);
    res.status(404).send("NO Data Available");
  }
});

//@ Get Food by ID
app.get("/food/foodlist/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const GetFood = await Food.find({ _id });
    res.send(GetFood);
  } catch (error) {
    console.log(error);
    res.send("No User found");
  }
});

//@ Update Food List
app.put("/food/updateFood/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const GetFood = await Food.findByIdAndUpdate({ _id }, req.body);
    res.send("Update User");
  } catch (error) {
    console.log(error);
    res.status(400).send("Update Failed");
  }
});

//@ Delete Food
app.delete("/food/deleteFood/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const GetFood = await Food.findByIdAndDelete({ _id });
    res.status(200).send(GetFood);
    console.log(GetFood);
  } catch (error) {
    console.log(error);
    res.status(404).send("pass a valid Id");
  }
});

//@ food list by city

app.post("/food/city", async (req, res) => {
  try {
    const City = req.body.City;
    console.log(`city ${City}`);
    const foodByCity = await Food.find({ City });
    console.log(foodByCity);
    if (!foodByCity) {
      res.status(404).send("city not Found");
    } else {
      res.send(foodByCity);
      console.log(foodByCity);
    }
  } catch (error) {
    res.status(400).send("Enter a  valid City");
    console.log(error);
  }
});

app.listen(port, () => console.log(`server running at port no. ${port}`));
