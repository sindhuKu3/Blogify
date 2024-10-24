const { Router } = require("express");
const multer = require("multer");

const path = require("path");
const router = Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const storage = require("./public/uploads/");
 multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
 
});
router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});
//after this post request all data is stored in outr data base
router.post("/",  async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL:   `/uploads/${req.file.filename}`,
   
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.delete("/:id",async(req,res)=>{
   const { id } = req.params;
   Blog.findByIdAndDelete(id)
     .then((result) => {
       res.json({redirect: "/" });
     })
     .catch((err) => {
     console.log(err) ; 
     });
})
router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
