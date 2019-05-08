import { Message } from './../Models/Message';
import { MessageService } from './../Services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message;
  id;
  constructor(private route: ActivatedRoute, private service: MessageService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.message = this.service.getMessage(this.id);
    this.message.status = 1;
    this.service.updateMessage(this.message);
  }
  toggleStatus() {
    this.message.status = !this.message.status;
    this.service.updateMessage(this.message);
  }
}
