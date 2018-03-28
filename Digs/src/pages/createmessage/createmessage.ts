import { Storage } from '@ionic/storage';
import { MessageboardPage } from './../messageboard/messageboard';
import { Md5 } from 'ts-md5/dist/md5';
import { Message } from './../../providers/message';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-createmessage',
  templateUrl: 'createmessage.html',
})
export class CreatemessagePage {
  
  time: any = new String(new Date());
  UID: String;
  ID: any = Md5.hashStr(this.time);
  Message: String;
  Name: String;
  Email: String;
  Date : Date;

  constructor(public navCtrl: NavController, public navParams: NavParams,
                public viewCtrl: ViewController, public messageProvider: Message, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatemessagePage');
    this.storage.get('email').then((val) => {
      this.UID = val;
    });
  }

  postMessage() {
    console.log("In Post Message Function");
    
    let message = {
      UID: this.UID,
      ID: this.ID,
      Message: this.Message,
      Name: this.Name,
      Email: this.Email,
      Date: new Date()
    };

    this.messageProvider.createMessage(message);  
    this.navCtrl.setRoot(MessageboardPage);
  }

}


