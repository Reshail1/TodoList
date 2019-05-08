const conn    = require("../database");
const express = require("express");
const router  = express.Router();
const Task    = require('../Models/task');

router.get("/tasks", (req, res)=>{
  Task.findAll()
    .then(result=>{
      res.status(200).json({message:"Tasks fetch successfully", tasks:result});
    })
    .catch(err=> res.status(500).json({message:err.message}));
});
router.get("/tasks/:id",(req,res)=>{
    Task.findById(req.params.id)
      .then(result=>res.status(200).json({message:"Task fetch successfully", tasks:result}))
      .catch(err=> res.status(500).json({message:err.message}));
});
router.post("/tasks",(req,res)=>{
    const task = req.body;
    Task.create({
      duedate:task.duedate,
      task_title:task.task_title,
      task_desc:task.task_desc,
      task_status:task.task_status,
      cat_id:task.cat_id
    })
    .then(result => {
      task.task_id = result.dataValues.task_id;
      res.status(201).json({
        message: 'Task added',
        task:task
      });
    })
    .catch(err => res.status(501).json({message: err.message}));
});

router.put("/tasks/:id",(req,res)=>{
    const task = req.body;
    Task.findById(req.params.id)
      .then(tsk=>{
        tsk.task_title = task.task_title;
        tsk.task_desc  = task.task_desc;
        tsk.task_status= task.task_status;
        tsk.duedate    = task.duedate;
        tsk.cat_id     = task.cat_id;
        return tsk.save().then(res.status(200).json({message: "Updated successfully"}));
      })
      .catch(err=>res.status(500).json({message: err.message}));
})
router.delete("/tasks/:id",(req,res)=>{
  Task.findById(req.params.id)
    .then(task=>{
      if(task==null) res.status(500).json({message:"It does not exist"});
      return task.destroy().then(res.status(200).json({message:"Task Delete successfully"}))
    })
    .catch(err=>res.status(500).json({message:err.message}));
});
module.exports = router;
