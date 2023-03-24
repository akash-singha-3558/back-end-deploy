const express=require("express");
const noteRouter=express.Router();
const NotesModel=require("../model/note.model.js")
const jwt=require("jsonwebtoken");


noteRouter.get("/notes",async(req,res)=>{
    const token=req.headers.token
    const decoded=jwt.verify(token,"bruce");
try{
if(decoded){
    let data = await NotesModel.find({userId:decoded.userId});
res.status(200).send(data);
}
}
catch(er){
    res.status(400).send({message:er.message})
}

})


noteRouter.get("/notes/:id",async(req,res)=>{
    const id=req.params.id;
    const token=req.headers.token
    const decoded=jwt.verify(token,"bruce");
try{
if(decoded){
    let data = await NotesModel.findOne({_id:id});
res.status(200).send(data);
}
}
catch(er){
    res.status(400).send({message:er.message})
}

})





noteRouter.post("/add",async(req,res)=>{
let payload=req.body;
try{
let note=new NotesModel(payload);
await note.save();
res.status(200).send({message:"new note added"});
}
catch(er){
    res.status(400).send({message:er.message})
}


})


noteRouter.patch("/update/:noteID",async(req,res)=>{
let payload=req.body;

try{
 await NotesModel.findByIdAndUpdate(req.params.noteID,payload);
res.status(200).send({message:"notes updated"})
}
catch(er){
    res.status(400).send({message:er.message})
}


})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    try{
        await NotesModel.findByIdAndDelete(req.params.noteID);
       res.status(200).send({message:"notes deleted"})
       }
       catch(er){
           res.status(400).send({message:er.message})
       }



})

module.exports=noteRouter;