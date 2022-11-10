import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import Pusher from 'pusher-js';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor( private chatService: ChatService) { }
 listMessage:any
 currentMessage:any
 currentAvatarUser:any
 message:string=""
 currentMessageId:any
isSeen:boolean=true
  ngOnInit(): void {
    var messageBody = <HTMLVideoElement>document.querySelector('#parentDiv');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight+100;
 
    this.getData()
    Pusher.logToConsole = true;

    const pusher = new Pusher('05ba42f251be5a21e7fa', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
  
 
      if(data.chatId==this.currentMessageId)
      {
        this.currentMessage.push(data.message);
      }
      this.chatService.getAllMessage().subscribe(res=>{
        this.listMessage=res
      
        for(let i=0 ; i<this.listMessage.length ;i++)
        { 
          var tmp
          for(let j=0 ; j<this.listMessage.length ;j++)
          {
            if(this.listMessage[i].displayPriority<this.listMessage[j].displayPriority)
            {
              tmp=this.listMessage[i]
              this.listMessage[i]=this.listMessage[j]
              this.listMessage[j]=tmp
             
            }
          }
          
        }
        for(let i=0 ; i<this.listMessage.length ;i++)
        { 
          
          if(this.listMessage[i].chatId==this.currentMessageId)
          {
      
            this.seenMessage(this.currentMessageId)
           this.listMessage[i].isNewMessageAdmin=false
           
          }
        }
      })
      
 
   
  
    });
    
    
  }
  getData()
  {
    this.chatService.getAllMessage().subscribe(res=>{
      this.listMessage=res
    
      for(let i=0 ; i<this.listMessage.length ;i++)
      { 
        var tmp
        for(let j=0 ; j<this.listMessage.length ;j++)
        {
          if(this.listMessage[i].displayPriority<this.listMessage[j].displayPriority)
          {
            tmp=this.listMessage[i]
            this.listMessage[i]=this.listMessage[j]
            this.listMessage[j]=tmp
          }
        }
      }
  

 

 
      if(this.listMessage.length>0)
      {
        this.currentMessageId=this.listMessage[0].chatId
        if(this.listMessage[0].isNewMessageAdmin)
        {
           this.seenMessage(this.currentMessageId)
          this.listMessage[0].isNewMessageAdmin=false
          this.chatService.getCountMessageUnread()
        }
       
  
        this.currentMessage=this.listMessage[0].message.split("|")
        this.currentAvatarUser=this.listMessage[0].user.avatar
      }
      
    
    
    })
  }
  checkMes(mes:any)
  {  
    if(mes.split(",")[0]=="admin")
    { 
       
  
    
      mes.split(",")[0]=="admin"
      return true;
    } 
    else return false;
  }
  sendMessage()
  {
   var data={
      id: this.currentMessageId,
      message: this.message,
      isAdmin:true
    }
     this.chatService.sendMessage(data).subscribe(res=>{
       this.message=""
      this.getData()
    })
  }
  changeCurrentMassage(index:any)
  {
    this.currentMessageId=this.listMessage[index].chatId
    this.currentMessage=this.listMessage[index].message.split("|")
    this.currentAvatarUser=this.listMessage[index].user.avatar
    if(this.listMessage[index].isNewMessageAdmin)
    {
      this.seenMessage(this.currentMessageId)
      // this.getData()
      this.listMessage[index].isNewMessageAdmin=false
      this.chatService.getCountMessageUnread()
    }
   

  }
  formatDate(date:any)
  {
    if(new Date().getDate()==new Date(date).getDate() && new Date().getMonth()==new Date(date).getMonth() && new Date().getFullYear== new Date(date).getFullYear )
    return "Hôm nay"
    if(new Date().getDate()==new Date(date).getDate()+1 && new Date().getMonth()==new Date(date).getMonth() && new Date().getFullYear== new Date(date).getFullYear )
    return "Hôm qua"
    var d=new Date(date).getDate() + "/"+ (new Date(date).getMonth()+1).toString() +"/" +new Date(date).getFullYear()
    
    return d
  }
  seenMessage(id:any)
  {
   var data={
      chatId: id,
      isAdmin: true,
    }
    this.chatService.seenMessage(data)
  }

checkDefaultMes(mes:any)
{
 
  if(mes.message.split("|").length>1)
  return true
  else return false
}
}
