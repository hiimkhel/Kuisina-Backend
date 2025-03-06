const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        age: { type: Number, default: null },  // Initially null
        weight: { type: Number, default: null },
        height: { type: Number, default: null },
        activityLevel: { type: String, default: null },
        dietaryPreferences: { type: [String], default: [] },
      }, { timestamps: true });

module.exports = mongoose.model("User", userSchema);