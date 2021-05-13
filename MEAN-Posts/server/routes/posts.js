const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");

const Post = require("../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type!");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${extension}`);
  },
});

router.post(
  "/",
  auth,
  multer({ storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imageURL: url + "/images/" + req.file.filename,
    });

    post.save().then((createdPost) => {
      res.status(201).json({
        message: "Post added successfully!",
        post: {
          ...createdPost.toObject(),
          id: createdPost._id,
        },
      });
    });
  },
);

router.get("/", (req, res, next) => {
  const pageIndex = Number(req.query.pageindex);
  const pageSize = Number(req.query.pagesize);
  const postQuery = Post.find();
  let fetchedPosts;

  if (pageIndex && pageSize) {
    postQuery.skip(pageSize * (pageIndex - 1)).limit(pageSize);
  }

  postQuery
    .then((posts) => {
      fetchedPosts = posts;
      return Post.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: fetchedPosts,
        postCount: count,
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

router.put(
  "/:id",
  auth,
  multer({ storage }).single("image"),
  (req, res, next) => {
    const id = req.params.id;
    let { title, content, imageURL } = req.body;

    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imageURL = url + "/images/" + req.file.filename;
    }
    const post = {
      title,
      content,
      imageURL,
    };

    Post.findOneAndUpdate({ _id: id }, post, { new: true }).then((result) => {
      res.status(200).json({ message: "Update successful!", post: result });
    });
  },
);

router.delete("/:id", auth, (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({ _id: id }).then(() => {
    res.json({ message: "Post deleted successfully!" });
  });
});

module.exports = router;
