const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{
const token=req.headers.token;
if(token){
    jwt.verify(token,"bruce",(err,decoded)=>{
        if(decoded){
           
            req.body.userId=decoded.userId
            next();
        }
        else{
            res.status(400).send({message:"you are not loggedin"})
        }
        })

}
else{
    res.status(400).send({message:"you are not loggedin"})
}

}

module.exports=auth;