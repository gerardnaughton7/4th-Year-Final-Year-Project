import { Storage } from '@ionic/storage';
import { MessageboardPage } from './../messageboard/messageboard';
import { Md5 } from 'ts-md5/dist/md5';
import { Message } from './../../providers/message';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams} from 'ionic-angular';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
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
    /**
     * Retrieve logged in user email from local storage
     */
    this.storage.get('email').then((val) => {
      this.UID = val;
    });
  }

  /**
   * Send a message to the back-end using the message provider service.
   */
  postMessage() {
    
    let message = {
      UID: this.UID,
      ID: this.ID,
      Message: this.Message,
      Name: this.Name,
      Email: this.Email,
      Date: new Date()
    };

    // Pass the message to the message provider
    this.messageProvider.createMessage(message);  
    // Navigate to the Message Board Page
    this.navCtrl.setRoot(MessageboardPage);
  }

}


