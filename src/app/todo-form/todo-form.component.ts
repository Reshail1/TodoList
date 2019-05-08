import { CategoryService } from './../Services/category.service';
import { TodoService } from './../Services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToDoItem } from '../Models/ToDoItem';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  focus: boolean;
  todoForm: FormGroup;
  item: ToDoItem;
  categories;
  id;
  constructor(
    private service: TodoService,
    private catService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {
      this.service.getTodos();
      this.item = new ToDoItem;
      this.id = this.route.snapshot.paramMap.get('id');
      this.catService.getCategories();
      this.catService.getCategoryUpdateListener()
        .subscribe(categories => {
          this.categories = categories;
        });
      if (this.id) {
        this.item = this.service.getToDo(this.id);
      }
    }
  ngOnInit() {
    this.todoForm = new FormGroup({
      task_title : new FormControl(this.item.task_title, [Validators.required, this.blankSpaces]),
      task_desc : new FormControl(this.item.task_desc, [Validators.required, this.blankSpaces]),
      duedate : new FormControl(this.item.duedate, [Validators.required, this.invalidDate]),
      cat_id : new FormControl(this.item.cat_id, [Validators.required])
    });
  }

  blankSpaces(control: FormControl): {[s: string]: boolean} {
    if (control.value != null && control.value.trim().length === 0) {
      return {'blankSpaces': true};
    }
    return null;
  }

  invalidDate(control: FormControl): {[s: string]: boolean} {
    const TodayDate = new Date();
    TodayDate.setDate(TodayDate.getDate() - 1);
    const inputDate = new Date(control.value);

    if (inputDate < TodayDate) {
      return { 'invalidDate': true };
    }
    return null;
  }

  SaveTask(item: ToDoItem) {
    item.task_title = this.todoForm.get('task_title').value;
    item.task_desc =  this.todoForm.get('task_desc').value;
    item.duedate = this.todoForm.get('duedate').value;
    item.cat_id = this.todoForm.get('cat_id').value;

    if (this.id) {

      // tslint:disable-next-line:radix
      item.task_id = parseInt(this.id);
      item.task_status = 1;
      this.service.updateTodo(item);
    } else {
      this.service.addTodo(item);
    }
    this.router.navigate(['/todos']);
  }
}
