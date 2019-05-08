const conn = require("./database");
const Category = require('./Models/category');
const Task = require('./Models/task');
function seedDB(){

    let categories = [
        {
            cat_name:"Friends"
        },
        {
            cat_name:"Work"
        },
        {
            cat_name:"Family"
        }
    ];
    let tasks=[
        {
            duedate:"2020-02-24",
            task_title:"Task One",
            task_desc:"Task One desc",
            task_status:0,
            cat_id:2
        },
        {
            duedate:"2020-01-24",
            task_title:"Task Two",
            task_desc:"Task Two desc",
            task_status:1,
            cat_id:2
        },
        {
            duedate:"2020-03-24",
            task_title:"Task Three",
            task_desc:"Task Three desc",
            task_status:0,
            cat_id:1
        },
        {
            duedate:"2020-04-24",
            task_title:"Task Four",
            task_desc:"Task Four desc",
            task_status:1,
            cat_id:2
        },
        {
            duedate:"2020-05-24",
            task_title:"Task Five",
            task_desc:"Task Five desc",
            task_status:0,
            cat_id:1
        }
    ];

//adding categories
    categories.forEach(category=>{
      Category.create({
        cat_name:category.cat_name
      })
      .then(result=>{
        console.log('category added');
      })
      .catch(err=>console.log("Error Added category"))
    })

//adding tasks

    tasks.forEach(task=>{
      Task.create({
        duedate:task.duedate,
        task_title:task.task_title,
        task_desc:task.task_desc,
        task_status:task.task_status,
        cat_id:task.cat_id
      })
      .then(result => {
        console.log('task added');
      })
      .catch(err => console.log(err.message));
    })
}

module.exports= seedDB;
