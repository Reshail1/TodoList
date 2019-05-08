const conn    = require("../database");
const express = require("express");
const router  = express.Router();
const Message = require("../Models/message");

router.get('/message',(req,res)=>{
  Message.findAll()
    .then(result => res.status(200).json({message:"Messages fetch successfully", messages:result}))
    .catch(err => res.status(500).json({message:err.message}));
});
router.post("/message", (req,res)=>{
  const message = req.body;
  Message.create({
    name:message.name,
    email:message.email,
    title:message.title,
    status:message.status,
    message:message.message
  })
  .then(result=> {
    message.id = result.dataValues.id;
    res.status(201).json({
      message: 'message added',
      user_message:message
    });
  })
  .catch(err => res.status(501).json({
    message: err.message,
  }));
});
router.put("/message/:id",(req,res)=>{
  const message = req.body;

  Message.findById(req.params.id)
    .then(msg=>{
      msg.name= message.name;
      msg.title = message.title;
      msg.status = message.status;
      msg.message = message.message;
      msg.email = message.email;
      return msg.save().then(result => res.status(200).json({message: "Updated successfully"}));
    })
    .catch(err=>res.status(500).json({message: err.message}))
})
router.delete("/message/:id",(req,res)=>{
  Message.findById(req.params.id)
    .then(msg=> {
      msg.destroy()
        .then(result=> res.status(200).json({message: "Deleted successfully"}))
    })
    .catch(err=>res.status(500).json({message: err.message}));
});
module.exports = router;
