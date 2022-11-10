import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiUrl=environment.apiUrl+"/ChatUser"
  @Output() countUnRead = new EventEmitter<any>();
  constructor( private http: HttpClient ,) { }
  
  emitCountUnRead (count:any) {
    this.countUnRead.emit(count)
    }
  getAllMessage()
  {
    return this.http.get(this.apiUrl+"/get-all-message")
  }
  
  sendMessage(message:any)
  {
 
    return this.http.put(this.apiUrl+"/send-message",message)
  }
  getCountMessageUnread()
  {
     this.http.get(this.apiUrl+"/get-count-message-unread").subscribe(res=>
      {
 
         this.emitCountUnRead(res)
      })

  }
  seenMessage(id:any)
  {
    return this.http.put(this.apiUrl+"/seen-message",id).subscribe(res=>
      {
        this.getCountMessageUnread()
      })
  }
}
