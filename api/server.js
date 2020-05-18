const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtSecret = "mysuperdupersecret";

const app = express();
const port = 3001;

// Middleware
const checkAuth = (req, res, next) => {
  if (req.path == "/api/login") {
    // next middleware
    return next();
  }

  // get token from request header Authorization
  const token = req.headers.authorization;

  // Token verification
  try {
    var decoded = jwt.verify(token, jwtSecret);
    console.log("decoded", decoded);
  } catch (err) {
    // Catch the JWT Expired or Invalid errors
    return res.status(401).json({ msg: err.message });
  }

  // next middleware
  next();
};

// JSON parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/login", (req, res) => {
  // random endpoint so that the client can call something
  const token = jwt.sign({ username: "Mike" }, jwtSecret, { expiresIn: 60 });
  return res.json({ token });
});
app.get("/api/token/ping", checkAuth, (req, res) => {
  // Middleware will already catch if token is invalid
  // so if he can get this far, that means token is valid
  return res.json({ msg: "all good mate" });
});
app.get("/api/ping", (req, res) => {
  return res.send("Hello ping");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
