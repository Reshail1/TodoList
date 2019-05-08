const Sequelize   = require('sequelize');
const dbSequelize = require("./../database");

const Task = dbSequelize.define('task',{
  task_id:{
    autoIncrement:true,
    type:Sequelize.INTEGER,
    allowNull:false,
    primaryKey:true
  },
  duedate:{
    type:Sequelize.STRING,
    allowNull:false
  },
  task_title:{
    type: Sequelize.STRING,
    allowNull:false
  },
  task_desc:{
    type:Sequelize.STRING,
    allowNull:false
  },
  task_status:{
    type:Sequelize.BOOLEAN,
    allowNull:false,
    defaultValue:0
  }
})
module.exports = Task;
