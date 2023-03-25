const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bCrpt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required.']
    },
    email:{
        type:String,
        required:[true,'Email is required.'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Password is required.'],
        minlength:[6,'Password must be 6 character long']
    },
    userID:{
        type:String,
        default:""
    },
    subscription:{
        type:String,
        default:""
    }
});

//hash password
UserSchema.pre("save", async function(next){
    //update
    if(!this.isModified("password")){
        next();
    }
    const salt=await bCrpt.genSalt(this.password, salt);
    next();
})

const User = mongoose.model("User", UserSchema);
