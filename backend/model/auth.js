const mongoose=require('mongoose')
const authUser=mongoose.Schema({
    name: String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"visitor"
    }
})

const authModel=mongoose.model('auth',authUser)
module.exports=authModel