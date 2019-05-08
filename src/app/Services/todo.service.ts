import { ToDoItem } from './../Models/ToDoItem';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; import { Subject } from 'rxjs';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosItems: Array<ToDoItem> = [];
  private todoItemsUpdated = new Subject<ToDoItem[]>();

  constructor(private http: HttpClient) { }

  getToDo(id: number) {
    for (const item of this.todosItems) {
      if (item.task_id == id) {
        return item;
      }
    }
    return null;
  }
  getTaskUpdateListener() {
    return this.todoItemsUpdated.asObservable();
  }
  getTodos() {
    this.http.get<{message: string, tasks: ToDoItem[]}>('http://localhost:3000/api/tasks')
      .subscribe(res => {
        this.todosItems = res.tasks;
        this.todoItemsUpdated.next([...this.todosItems]);
       });
  }
  addTodo(item: ToDoItem) {
    item.task_status = 1;
    this.http.post<{message: string, task: ToDoItem}>('http://localhost:3000/api/tasks', item)
      .subscribe(res => {
        this.todosItems.push(res.task);
        this.todoItemsUpdated.next([...this.todosItems]);
      });
  }
  updateTodo(item: ToDoItem) {
    this.http.put<{message: string}>('http://localhost:3000/api/tasks/' + item.task_id, item)
      .subscribe(responseData => {
        console.log(responseData);
        const updatedItems = [...this.todosItems];
        const oldItemIndex = updatedItems.findIndex(p => p.task_id === item.task_id);
        updatedItems[oldItemIndex] = item;
        this.todosItems = updatedItems;
        this.todoItemsUpdated.next([...this.todosItems]);

      });
  }
  delete(id) {
    this.http.delete<{message: string}>('http://localhost:3000/api/tasks/' + id)
    .subscribe(responseData => {
      console.log(responseData);
      const updatedPosts = this.todosItems.filter(item => item.task_id !== id);
      this.todosItems = updatedPosts;
      this.todoItemsUpdated.next([...this.todosItems]);
    });
  }
}
