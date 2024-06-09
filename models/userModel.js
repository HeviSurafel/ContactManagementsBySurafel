const mongoose=require('mongoose')

const user=mongoose.Schema({
    username:{
        type:String,
        required:[true,"please fill your username"]
    },
    email:{
        type:String,
        required:[true,"please fill your email"],
        unique:[true,"Email is already taken"]
    },
    password:{
        type:String,
        required:[true,"please fill your password"],
    }

},{
    timeStamps:true
})
module.exports=mongoose.model('User',user)