const express = require("express");
const mongoose = require("mongoose");

const Post = require("./models/post");
const config = require("./config");
const app = express();

mongoose
  .connect(
    `mongodb+srv://${config.mongoUsr}:${config.mongoURI}@cluster0.xxdwy.mongodb.net/node-angular?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log("Connection failed!");
    console.error(err);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  );
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.post("/api/posts", (req, res, next) => {
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

app.get("/api/posts", (req, res, next) => {
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

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

app.put("/api/posts/:id", (req, res, next) => {
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

app.delete("/api/posts/:id", (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({ _id: id }).then(() => {
    res.json({ message: "Post deleted successfully!" });
  });
});

module.exports = app;
