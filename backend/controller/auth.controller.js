import { genarateToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res)=>{
    const {fullName, email, password} = req.body;
    try {

        if(!fullName || !email || !password){
            return res.status(400).json({Message: "All Fields Are Required!!!"});
                }
        if(password.length < 6){
            return res.status(400).json({Message: "Password Must Contains 6 Letters!!!"});
        }

        const user = User.findOne({email})

        if(user){
            return res.status(400).json({message:"User Already Exists with this Email."})
        }

        const salt  = await bcrypt.genSalt(10);
        const hashedPassword  = await bcrypt.hash(password, salt);


        const newUser  = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
                genarateToken(newUser._id,res)
                await newUser.save();
                res.status(201).json({
                    _id:newUser._id,
                    fullname:newUser.fullName,
                    emai:newUser.email,
                    profilePic:newUser.profilePic
                })
        }else{
            res.status(400).json({message:"Invalid User Data."});
        }


    } catch (error) {
        console.log("Error in signup controler", error.message);
        res.status(500).json({message:"Internal Service error"});
    }
}

export const login = (req,res)=>{
    res.send('signUp route');
}

export const logout = (req,res)=>{
    res.send('signUp route');
}