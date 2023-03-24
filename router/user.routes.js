const express=require("express");
const router=express.Router();
var jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt");
const UserModel=require("../model/user.model.js")

//registration
router.post("/reg",async(req,res)=>{
    const { email,
        password,
        location,
        age}=req.body;
   try{

bcrypt.hash(password, 12, (err, hash)=> {
    // Store hash in your password DB.
    

        const user = new UserModel({ email,
            password:hash,
            location,
            age})
    
             user.save().then((ress)=>{
                res.status(200).send({message:"reg done"})
             })
            

    
});
   }
    catch(er){
        res.status(400).send({message:er.message})
    }
})

//login
router.post("/login",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
     try{
       const User=await UserModel.findOne({email});
       console.log(User)
    

         if(User){
            bcrypt.compare(password,User.password,(err,result)=>{

              result  ? res.status(200).send({message:"login successfull","token":jwt.sign({ userId: User._id }, 'bruce')}):res.status(400).send({message:"Login Failed"})

            })
         }



            
            }
            catch(er){
                 res.status(400).send({message:er.message})
            }
    
})

//get user

router.get("/getdata",async(req,res)=>{
let token=req.headers.token;
console.log(token)
    
try{
    let data=await UserModel.find();   
    jwt.verify(token, 'bruce', (err, decoded)=> {
        
 decoded?res.status(200).send(data):res.status(400).send({message:"not authenticated"})
           });
}
catch(er){
    res.status(400).send({message:er.message})
}


})




module.exports=router;