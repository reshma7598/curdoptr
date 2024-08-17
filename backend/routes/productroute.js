const express=require('express')
const { addProducts, updateProduct } = require('../controllers/ProductController')

const router=express.Router()

router.post('/postProduct',addProducts)

router.put('/updateproduct',updateProduct)

module.exports=router