const mongoose=require("mongoose");

//user Schema
const userSchema=mongoose.Schema({
    email:String,
    password:String,
    location:String,
    age:Number
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema);

module.exports=UserModel;
