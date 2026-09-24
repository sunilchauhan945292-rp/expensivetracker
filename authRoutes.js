const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const User=require("../models/User");

const router=express.Router();





//SIGNUP
router.post("/signup",async(req,res)=>{
     try {
        const {name,email,password}=req.body;

        //check required fields
        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are required",
            });
        }
     

     //check wheter email already exists
     const existingUser= await User.findOne({email});
     if(existingUser){
        return res.status(400).json({
            message:"User already exist",
        });
     }

     //Hash password
     const hashedPassword= await bcrypt.hash(password,12);

     //create user

     const user=await User.create({
        name,
        email,
        password:hashedPassword,
     });

     //Send response
     res.status(201).json({
         message:"User created successfully",

         user:{
             id:user._id,
             name:user.name,
             email:user.email,
         },
     });


    }catch(err){
        console.error(err);

        res.status(500).json({
            message:"Server error",
        });
    }  

});


//LOGIN
router.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;

        //ckeck required fields
        if(!email || !password){
            return res.status(400).json({
                  message:"Email and password is required",
            });
        }
        
        //Find user
        const user=await User.findOne({
               email: email.toLowerCase(),
        });

        if(!user){
            return res.status(401).json({
                message:"Invalid Email or Password",
             });
        }

        //compare password
        const passwordIsCorrect =await bcrypt.compare(
            password,
            user.password
        );

        if(!passwordIsCorrect){
            return res.status(401).json({
                message:"Invalid email or password",
            });
        }

        //create JWT
        const token=jwt.sign(
            {
                userId:user._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn:"1d",  
            }
        );

        //send response
        res.status(200).json({
            message:"Longin successful",

            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },

        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message:"Server error",
        });
    }

});

module.exports=router;
