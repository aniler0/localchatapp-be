import * as Express from "express";

const route = Express.Router();

route.get("/", (req, res) => {
  res.send("Welcome to home page");
});

export default route;
