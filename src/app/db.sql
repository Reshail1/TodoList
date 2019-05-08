
# Creating database
create database fiverr;
use fiverr;
#creating tables

create table task (task_id INT(11) PRIMARY KEY AUTO_INCREMENT, duedate varchar(14), task_title varchar(255), task_desc varchar(255), task_status INT(1), cat_id INT(11) , FOREIGN KEY (cat_id) REFERENCES category(cat_id));
create table category (cat_id INT(11) PRIMARY KEY AUTO_INCREMENT, cat_name varchar(255));
create table message (id INT(11) PRIMARY KEY AUTO_INCREMENT, name varchar(255), email varchar(100), title varchar(255),status boolean, message varchar(500));

select * from task;
select * from category;
select * from message;
#drop table task;
#drop table category;
#drop table message;
#dummy data
INSERT INTO category values(default, "Friends" );
