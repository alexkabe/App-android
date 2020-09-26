import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonList, NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  behaviour: 'auto';
  nombre: number = 0;
  messages = [];
  message = {
    user: 0,
    text: String
  };

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  onSubmit(f)
  {
    if (f)
    {
      let message;
      message = f.value['text'];
      if (this.messages.length !== 0)
      {
        this.messages.push(message);
      }
      else
      {
        this.messages = [message];
      }
    }
    this.logScrollEnd();
    f.reset();
  }

  logScrollEnd()
  {
    this.content.scrollToBottom(500);
  }

  close()
  {
    this.navController.navigateBack(['homepage']);
  }

}
