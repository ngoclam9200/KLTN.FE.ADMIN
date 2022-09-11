import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var messageBody = <HTMLVideoElement>document.querySelector('#parentDiv');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight+100;
    
  }

}
