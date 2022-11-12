import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import Pusher from 'pusher-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor( private chatService: ChatService, private router:Router) { }
 listMessage:any
 currentMessage:any
 currentAvatarUser:any
 currentUsername:any
 message:string=""
 currentMessageId:any
isSeen:boolean=true
isLoading:boolean=true
  ngOnInit(): void {
   
    
    
    setTimeout(function(){
      var scroll=document.getElementById("parentDiv")
      scroll.scrollTop=scroll.scrollHeight

 },1000);
 
    this.getData()
    Pusher.logToConsole = true;

    const pusher = new Pusher('05ba42f251be5a21e7fa', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
      var rou=this.router.url
 
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
             if(rou=="/chat")
             {
             this.seenMessage(this.currentMessageId)
             }
           
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
        this.currentUsername=this.listMessage[0].user.fullname
      }
      this.isLoading=false
    
    
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
       setTimeout(function(){
        var scroll=document.getElementById("parentDiv")
        scroll.scrollTop=scroll.scrollHeight
  
   },1000);
    })
  }
  changeCurrentMassage(index:any)
  {
    this.currentMessageId=this.listMessage[index].chatId
    this.currentMessage=this.listMessage[index].message.split("|")
    this.currentAvatarUser=this.listMessage[index].user.avatar
    this.currentUsername=this.listMessage[index].user.fullname

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
onKeypress(event) {   
  if(this.message.length>0) this.sendMessage()
}
}
