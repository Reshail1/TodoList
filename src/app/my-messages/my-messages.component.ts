import { MessageService } from './../Services/message.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../Models/Message';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit {

  messages: Array<Message> = [];
  constructor(private service: MessageService) { }

  ngOnInit() {
    this.service.getMessages();
    this.service.getMessageUpdateListener()
      .subscribe(msgs => {
        this.messages = msgs;
      });
  }
  delete(id) {
    this.service.deleteMessage(id);
  }

}
