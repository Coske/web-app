const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/users/login");
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
        req.session.destroy();
        return res.redirect("/users/login");
    }

    res.render("profile", { user });
});

router.post("/delete", async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/users/login");
    }

    try {
        await User.findByIdAndDelete(req.session.userId);
        req.session.destroy();
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("An error occurred while deleting the user.");
    }
});

module.exports = router;
