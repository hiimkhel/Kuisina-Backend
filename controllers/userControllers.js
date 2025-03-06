const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) =>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User is already registered!");
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password: ", hashedPassword)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        console.log(`User ${newUser} is created`);
        res.status(201).json(newUser);
    }catch(error){
        res.status(400).json("User data is invalid!");
    }
};


const loginUser = async (req, res) =>{
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
}

const updateUser = async (req, res) =>{
    const {userId} = req.params;
    const {age, weight, height, activityLevel} = req.body;

    try{
        const user = await User.findById(userId);
        if(!user) return res.status(400).json({message: "User not found"});

        user.age = age ?? user.age;
        user.weight = weight ?? user.weight;
        user.height = height ?? user.height;
        user.activityLevel = activityLevel ?? user.activityLevel;

        await user.save();
        res.json({message: "User updated successfully ", user});
    }catch(err){
        res.status(400).json({message: "Update failed", error: err.message})
    }

    
}

const updateBmi = async (req, res) =>{
    const {userId} = req.params;
    const {weight, height} = req.body;

    try{
        const user = await User.findById(userId);
        if(!user) return res.status(400).json({message: "User not found"});

        user.weight = weight ?? user.weight;
        user.height = height ?? user.height;

        await user.save();
        res.json({message: "User's BMI succesfully updated ", user});
    }catch(err){
        res.status(400).json({message: "Updating user's BMI failed.", error: err.message});
    }

}
const getUserProfile = async (req, res) =>{
    const {userId} = req.params;
    try{
        const user = await User.findById(userId);

        if(!user) return res.status(400).json({message: "User not found!"});

        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: "Server Error: ", error: err.message});
    }

}
const getBmi = async (req, res) =>{
    const {userId} = req.params;
    try{
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({message: "User not found!"});
        }
        const { weight, height } = user;
        if(!weight || !height){
            return res.status(400).json({message: "All fields are required"});
        }
    
        const heightInMeters = height / 100; 
        const bmi = (weight / (heightInMeters ** 2)).toFixed(2);
    
        res.status(200).json({userId: user._id, bmi});
    }catch(err){
        res.status(500).json({message: "Server Error: ", error: err.message});
    }
   
}

module.exports = {loginUser, registerUser, updateUser, updateBmi, getBmi, getUserProfile};