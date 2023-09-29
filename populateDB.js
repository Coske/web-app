require("dotenv").config();

const mongoose = require("mongoose");
const Food = require("./models/food");
const jsonData = require("./dishes.json");

async function populateDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const dishTypes = Object.keys(jsonData.dishes);
        for (const dishType of dishTypes) {
            await Food.insertMany(jsonData.dishes[dishType]);
        }

        console.log("Data imported successfully");
    } catch (error) {
        console.error("Error importing data:", error);
    } finally {
        mongoose.disconnect();
    }
}

populateDatabase();
