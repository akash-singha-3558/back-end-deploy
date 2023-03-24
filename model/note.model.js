const mongoose=require("mongoose");
const notesShema=mongoose.Schema({
    title:String,
    body:String,
    subject:String,
    userId:String
},{
    versionKey:false
})

const NotesModel=mongoose.model("note",notesShema);
module.exports=NotesModel;