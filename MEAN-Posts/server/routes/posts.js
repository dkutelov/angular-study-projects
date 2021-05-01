const express = require("express");
const Post = require("../models/post");

const router = express.Router();

router.post("/", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  post.save().then((createdPost) => {
    res
      .status(201)
      .json({ message: "Post added successfully!", postId: createdPost._id });
  });
});

router.get("/", (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = {
    title,
    content,
  };
  Post.updateOne({ _id: id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({ _id: id }).then(() => {
    res.json({ message: "Post deleted successfully!" });
  });
});

module.exports = router;
