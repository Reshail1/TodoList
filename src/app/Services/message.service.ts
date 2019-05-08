import { Message } from './../Models/Message';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageList: Array<Message> = [];
  private messageListUpdated = new Subject<Message[]>();
  constructor(private http: HttpClient) { }

  /* Display the list for message dropdown  */
  getMessages() {
    this.http.get<{message: string, messages: Message[]}>('http://localhost:3000/api/message')
    .subscribe(res => {
      this.messageList = res.messages;
      this.messageListUpdated.next([...this.messageList]);
     });
  }
  getMessageUpdateListener() {
    return this.messageListUpdated.asObservable();
  }
  getMessage(id) {
    this.getMessages();
    for (let i = 0 ; i < this.messageList.length; i++) {
      if (id == this.messageList[i].id) { return this.messageList[i]; }
    }
  }
  addMessage(msg) {
    this.http.post<{message: string, user_message: Message}>('http://localhost:3000/api/message', msg)
    .subscribe(res => {
      console.log(res);
      this.messageList.push(res.user_message);
      this.messageListUpdated.next([...this.messageList]);
    });
  }
  updateMessage(item: Message) {
    this.http.put<{message: string}>('http://localhost:3000/api/message/' + item.id, item)
      .subscribe(responseData => {
        console.log(responseData);
        const updatedItems = [...this.messageList];
        const oldItemIndex = updatedItems.findIndex(p => p.id === item.id);
        updatedItems[oldItemIndex] = item;
        this.messageList = updatedItems;
        this.messageListUpdated.next([...this.messageList]);

      });
  }
  deleteMessage(id) {
    this.http.delete<{message: string}>('http://localhost:3000/api/message/' + id)
      .subscribe(resp => {
        const msgs = this.messageList.filter(msg => msg.id !== id );
        this.messageList = msgs;
        this.messageListUpdated.next([...this.messageList]);
      });
  }
}
