require("dotenv").config();

const express = require("express");
const path = require("path");
const app = require("./app");
const mongoose = require("mongoose");
const port = 3000;

app.use(express.static("public"));

app.use(express.json());
app.use(
    express.static(path.join(__dirname, "views"), { extensions: ["html"] })
);
app.use(
    "/views",
    express.static(path.join(__dirname, "views"), {
        extensions: ["js"],
        fallthrough: false,
    })
);
app.use(
    "/public",
    express.static(path.join(__dirname, "public"), {
        type: "text/javascript",
    })
);

app.use(
    "/views",
    express.static(path.join(__dirname, "views"), {
        type: "text/javascript",
    })
);

app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.get("/menu.js", (req, res) => {
    const menuFilePath = path.join(__dirname, "views", "menu.js");
    res.type("module");
    res.sendFile(menuFilePath);
});
app.get("/checkout.js", (req, res) => {
    const cartFilePath = path.join(__dirname, "views", "checkout.js");
    res.type("module");
    res.sendFile(cartFilePath);
});

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.listen(port, () => console.log("Server started"));

const foodsRouter = require("./routes/foods");
app.use("/foods", foodsRouter);
