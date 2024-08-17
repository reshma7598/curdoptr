const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

const productModel=mongoose.model("products",productSchema)
module.exports=productModel