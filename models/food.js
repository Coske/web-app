const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    calories: Number,
    protein: Number,
    sugar: Number,
    fats: Number,
    salt: Number,
});

module.exports = mongoose.model("Food", foodSchema);
