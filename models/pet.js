const mongoose=require('mongoose');
const petSchema=new mongoose.Schema({
    petname:String,
    date:String,
    desc:String,
    city:String
})
const petModel=mongoose.model("pets",petSchema)
module.exports=petModel