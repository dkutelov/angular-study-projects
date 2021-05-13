const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const config = require("./config");
const app = express();

const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

mongoose
  .connect(
    `mongodb+srv://${config.mongoUsr}:${config.mongoURI}@cluster0.xxdwy.mongodb.net/node-angular?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
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
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
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

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);

module.exports = app;
