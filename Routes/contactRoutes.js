const express=require('express')
const router=express.Router()
const {getcontact,createnewContact,getsingleContact,updatecontact,deletecontact}=require("../controller/contactController.js")
const validateToken = require('../Middleware/validateTokenHandler.js')
//get all contacts,create contact

router.use(validateToken)
router.route("/").get(getcontact).post(createnewContact)
//get single contacts,update contact,delete contact
router.route("/:id").get(getsingleContact).put(updatecontact).delete(deletecontact)
module.exports=router