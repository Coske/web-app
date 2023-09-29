const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/all-users", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    });

    try {
        await user.save();
        req.session.userId = user._id;
        res.redirect("/profile");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("Invalid email or password.");
    }

    if (user.password !== password) {
        return res.status(400).send("Invalid email or password.");
    }

    req.session.userId = user._id;
    res.redirect("/profile");
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
    });
});

module.exports = router;
