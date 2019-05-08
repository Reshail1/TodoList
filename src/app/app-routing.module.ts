import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { MessageComponent } from './message/message.component';


const appRoutes: Routes = [
  {
    path: '', redirectTo: '/todos', pathMatch: 'full'
  },
  {
    path: 'todos',
    component: TodosComponent
  },
  {
    path: 'contact-me',
    component: ContactMeComponent
  },
  {
    path: 'contact-me/:id',
    component: ContactMeComponent
  },
  {
    path: 'messages/:id',
    component: MessageComponent
  },
  {
    path: 'messages',
    component: MyMessagesComponent
  },
  {
    path: 'todos/new',
    component: TodoFormComponent
  },
  {
    path: 'todos/:id',
    component: TodoFormComponent
  },
  {
    path: 'category/new',
    component: CategoryFormComponent
  },
  {
    path: '**',
    redirectTo: 'todos'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
