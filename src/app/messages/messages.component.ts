import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
//messagesComponent should display all messages, including the messages sent by the HeroService when it fetches heroes
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
