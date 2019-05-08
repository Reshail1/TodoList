import { CategoryService } from './../Services/category.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToDoItem } from '../Models/ToDoItem';
import { TodoService } from '../Services/todo.service';
import { Category } from '../Models/Category';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Array<ToDoItem> = [];
  todosFiltered: Array<ToDoItem> = [];
  categories: Array<Category> = [];

  searchStr = '';

  constructor(private service: TodoService, private catService: CategoryService) { }
  ngOnInit() {
    this.service.getTodos();
    this.service.getTaskUpdateListener()
      .subscribe(todos => {
        this.todos = todos;
        this.todosFiltered = this.todos;
      });
    this.catService.getCategories();
    this.catService.getCategoryUpdateListener()
      .subscribe(categories => {
        this.categories = categories;
      });
  }
  searchTodo(searchVal: string) {
    searchVal = searchVal.toLowerCase();
    const filetered = new Array<ToDoItem>();
    for (const item of this.todos) {
      if (item.task_title.toLowerCase().includes(searchVal)) {
        filetered.push(item);
      } else if (item.cat_id.toString().includes(searchVal)) {
        filetered.push(item);
      }
    }
        this.todosFiltered = filetered;
  }
  tomorrowTasks() {
    const filetered = new Array<ToDoItem>();
    const tomorrow = this.formatDate(new Date(Date.now() + 86000000));
    for (const item of this.todos) {
      if (item.duedate === tomorrow) {
        filetered.push(item);
      }
      }
    this.todosFiltered = filetered;
  }
  getCategory(id: number): string {

    for (let i = 0 ; i < this.categories.length; i++) {
        if (this.categories[i].cat_id === id) {
          return this.categories[i].cat_name;
        }
    }
  }
  delete(item) {
    this.service.delete(item.task_id);
  }
  changeStatus(item: ToDoItem) {

    item.task_status === 0 ? item.task_status = 1 : item.task_status = 0;
    this.service.updateTodo(item);
  }
  formatDate(date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    let monthStr = '';
    let dateStr = '';
    if (month < 10) {
      monthStr = '0';
    }
    if (day < 10) {
      dateStr = '0';
    }
    dateStr += day;
    monthStr += month;
    return date.getFullYear() + '-' + monthStr + '-' + dateStr;
  }
  todayTasks() {

    const filetered = new Array<ToDoItem>();
    const today = this.formatDate(new Date());
    console.log(today);
    for (const item of this.todos) {
      if (item.duedate === today) {
        filetered.push(item);
      }
        console.log(item.duedate);
      }
    this.todosFiltered = filetered;
  }
  allTasks() {
    this.todosFiltered = this.todos;
  }
  completedTasks() {
    const filetered = new Array<ToDoItem>();
    for (const item of this.todos) {
      if (item.task_status === 0) {
        filetered.push(item);
      }
      }
    this.todosFiltered = filetered;
  }
  pendingTasks() {
    const filetered = new Array<ToDoItem>();
    for (const item of this.todos) {
      if (item.task_status === 1) {
        filetered.push(item);
      }
      }
    this.todosFiltered = filetered;
  }
  catFilter(cat) {
    const filetered = new Array<ToDoItem>();
    for (const item of this.todos) {
      if (item.cat_id === cat.cat_id) {
        filetered.push(item);
      }
      }
    this.todosFiltered = filetered;
  }
}
