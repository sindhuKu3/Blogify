require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require(cors()) ; 
const path = require("path");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const Blog = require("./models/blog");
const corsConfig={
origin:"*",
credential:true,
method:["GET","POST","PUT","DELETE"],
};
app.use(cors(corsConfig)) ;
app.options("",cors(corsConfig)) ; 
app.use(cors(corsConfig)) ; 
app.use(express.urlencoded({ extended: false }));
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));
app.use(cors()) ; 
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/signUp", (req, res) => {
  res.render("signUp");
});
app.get("/signIn", (req, res) => {
  res.render("signIn");
});

app.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    console.log(allBlogs);
    res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (error) {
    console.error(error);
    // Handle the error appropriately
  }
});

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
