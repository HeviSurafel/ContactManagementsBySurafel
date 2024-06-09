const asyncHandler=require('express-async-handler')
const Contact=require("../models/contactModel.js")

//@des get all contacts
//@route Get /api/contacts
//@access private
const getcontact=asyncHandler(async(req,res)=>{
    const contact= await Contact.find({user_id:req.user.id});
    res.status(200).json(contact)
})
//@des create new contact
//@route Post /api/contacts
//@access private
const createnewContact=asyncHandler(async(req,res)=>{
    const {name,email,phone}=req.body
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are required")
    }
    const connect= await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json({message:"contact created"})
})
//@des get single contact
//@route Get /api/contacts/:id
//@access private
const getsingleContact=asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact)
})
//@des update single contact
//@route Update /api/contacts/:id
//@access private
const updatecontact=asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
      }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact)
})
//@des delete single contact
//@route Delete /api/contacts/:id
//@access private
const deletecontact=asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts");
      }
    await Contact.remove();
    res.status(200).json(contact);
})
module.exports={getcontact,createnewContact,getsingleContact,updatecontact,deletecontact}