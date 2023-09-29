const express = require("express");
const router = express.Router();
const Food = require("../models/food");
const { createConnection } = require("mongoose");

//Drop entire database
router.delete("/delete-database", async (req, res) => {
    try {
        await Food.deleteMany({});
        res.status(200).json({ message: "Database deleted successfully" });
    } catch (error) {
        console.error("Error deleting database:", error);
        res.status(500).json({ message: "Error deleting database" });
    }
});

//Get all foods
router.get("/", async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//Get one Food
router.get("/:id", getFood, (req, res) => {
    res.json(res.Food);
});
//Create Food
router.post("/", async (req, res) => {
    const { name, price, image, description, calories, sugars, fats, salt } =
        req.body;

    const existingFood = await Food.findOne({ name });

    if (existingFood) {
        return res.status(400).json({
            message: "Email already registered. Please choose a different one.",
        });
    }

    try {
        const newFood = new Food({
            name,
            price,
            image,
            description,
            calories,
            sugars,
            fats,
            salt,
        });

        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Update Food
router.patch("/:id", getFood, async (req, res) => {
    try {
        if (!res.Food) {
            return res.status(404).json({ message: "Food not found" });
        }

        if (req.body.name) {
            res.Food.name = req.body.name;
        }
        if (req.body.price) {
            res.Food.price = req.body.price;
        }
        if (req.body.image) {
            res.Food.image = req.body.image;
        }
        if (req.body.description) {
            res.Food.description = req.body.description;
        }
        if (req.body.calories) {
            res.Food.calories = req.body.calories;
        }
        if (req.body.sugars) {
            res.Food.sugars = req.body.sugars;
        }
        if (req.body.fats) {
            res.Food.fats = req.body.fats;
        }
        if (req.body.salt) {
            res.Food.salt = req.body.salt;
        }

        const updatedFood = await res.Food.save();
        res.json(updatedFood);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete Food
router.delete("/:id", getFood, async (req, res) => {
    try {
        if (!res.Food) {
            return res.status(404).json({ message: "Food not found" });
        }

        await res.Food.deleteOne();
        res.json({ message: "Food Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getFood(req, res, next) {
    let foundFood;
    try {
        foundFood = await Food.findById(req.params.id);
        if (Food == null) {
            return res.status(404).json({ message: "Cannot find Food" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.Food = foundFood;
    next();
}

module.exports = router;
