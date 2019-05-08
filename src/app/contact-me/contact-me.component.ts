import { MessageService } from './../Services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from './../Models/Message';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit {

  contactFormGroup: FormGroup;
  id;
  message;
  constructor(
      private service: MessageService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
        this.message = this.service.getMessage(this.id);
    }
    const email   = (this.id) ? this.message.email   : null;
    const message = (this.id) ? this.message.message : null;
    const name    = (this.id) ? this.message.name    : null;
    const title   = (this.id) ? this.message.title   : null;
    this.contactFormGroup = new FormGroup({
      'email'   : new FormControl(email, [Validators.required, Validators.email]),
      'message' : new FormControl(message, [Validators.required]),
      'name'    : new FormControl(name, [Validators.required]),
      'title'   : new FormControl(title, [Validators.required])
    });
  }
  onSubmitContactForm() {

    const msg = new Message(this.contactFormGroup.value.name,
                              this.contactFormGroup.value.title,
                              this.contactFormGroup.value.email,
                              this.contactFormGroup.value.message);
    if (this.id) {
      msg.id = this.message.id;
      msg.status = this.message.status;
      this.service.updateMessage(msg);
    } else {
      this.service.addMessage(msg);
    }
    this.router.navigate(['/messages']);
  }
}

