const express=require('express')
const router=express.Router()
const {registeruser,loginuser,currentuser}=require('../controller/userController.js')
const validateToken = require('../Middleware/validateTokenHandler.js')
router.post("/register",registeruser)
router.post("/login",loginuser)
router.get("/current" , validateToken,currentuser)
module.exports=router;