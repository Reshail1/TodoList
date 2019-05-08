const conn    = require("../database");
const express = require("express");
const router  = express.Router();
const Category= require("../Models/category");
router.get("/category",(req,res)=>{
  Category.findAll()
    .then(categories=> res.status(200).json({message:"Categories fetch successfully", categories:categories}))
    .catch(err =>  res.status(500).json({message:err.message}))
});



router.post("/category", (req,res)=>{
    const category = req.body;
    Category.create({
      cat_name:category.cat_name
    })
    .then(result=>{
      category.cat_id = result.dataValues.cat_id;
      res.status(201).json({
        message: 'Category added',
        category:category
    });
    })
    .catch(err=>res.status(501).json({message: err.message}))
});

module.exports = router;
