const express = require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const cors=require("cors");
const authRoutes=require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const transactionRoutes=require("./routes/transactionRoutes");


const app = express();

const PORT=process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

// allows Express to understand JSON request bodies
//Middleware
app.use(express.json());

//Test route
app.get("/",(req,res)=>{
       res.send("Expense Tracker API is running");
});

//health check route
app.get("/api/health",(req,res)=>{
    res.json({
        success:true,
        message:"Expense Tracker's backend is working",
    });
});

app.use("/api/auth",authRoutes);

app.use("/api/transactions",transactionRoutes);

app.get(
  "/api/test-protected",
  authMiddleware,
  (req,res)=>{

     res.json({

        message:"You accessed a protected route",
        user:req.user,

     });
  }

);


mongoose
      .connect(process.env.MONGO_URI)
      .then(()=>{

        console.log("MongoDB connected successfully");

        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT} `);
        });
      })
      .catch((err)=>{
        console.error("MongoDB connection failed;",err.message);
      });