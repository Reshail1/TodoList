import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { AppRoutingModule } from './app-routing.module';
import { HoverHighlightDirective } from './hover-highlight.directive';
import { FindPipe } from './find.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { MyMessagesComponent } from './my-messages/my-messages.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoFormComponent,
    CategoryFormComponent,
    HoverHighlightDirective,
    FindPipe,
    ContactMeComponent,
    MyMessagesComponent,
    MessageComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
