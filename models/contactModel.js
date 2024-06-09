const mongoose=require('mongoose')

const contactschema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"please add your name!"]
    },
    email:{
        type:String,
        required:[true,"please add your email!"]
    },
    phone:{
        type:String,
        required:[true,"please add your contact number!"]
    }

},{
    timeStamp:true
})
module.exports=mongoose.model("Contact",contactschema)