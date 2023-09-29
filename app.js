const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Food = require("./models/food");
const ejs = require("ejs");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: "secret type beat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    })
);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const profileRouter = require("./routes/profile");
app.use("/profile", profileRouter);

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/profile", ensureAuthenticated, (req, res) => {
    res.render("profile", { user: req.session.user });
});
app.get("/menu", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "menu.html"));
});
app.get("/api/menu", async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "cart.html"));
});

function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect("/users/login");
    }
}

module.exports = app;
