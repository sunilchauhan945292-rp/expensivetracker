const mongoose = require("mongoose");

const transactionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    title:{
        type:String,
        required:true,
        trim:true,
    },

    amount: {
            type: Number,
            required: true,
            min: 0,
    },

    type: {
            type: String,
            enum: ["income", "expense"],
            required: true,
    },

    category: {
            type: String,
            required: true,
    },

    date: {
            type: Date,
            required: true,
        },

    note: {
            type: String,
            default: "",
            trim: true,
    },

},
    {
        timestamps:true,
    }
);

const Transaction=mongoose.model(
    "Transaction",
    transactionSchema
);

module.exports=Transaction;