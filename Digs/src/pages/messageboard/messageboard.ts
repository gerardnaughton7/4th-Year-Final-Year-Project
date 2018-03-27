import { CreatemessagePage } from './../createmessage/createmessage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { Message } from './../../providers/message';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-messageboard',
  templateUrl: 'messageboard.html',
})
export class MessageboardPage {

  messages: any;
  loggedIn: null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public messageService: Message, 
              public modalCtrl: ModalController, private storage: Storage) {
    this.storage.get('email').then((val) => {
      this.loggedIn = val;
    });
  }

  ionViewDidEnter() {
    this.messageService.getMessage().subscribe((data) => {
      console.log("Data returned from ListRooms on Load: " + JSON.stringify(data));
      this.messages = data; 
    },
    error => {
      alert("ERROR Retrieving Messages: " + error);
    });

  }

  doRefresh(refresher) {

    this.messageService.getMessage().subscribe(data => {
      this.messages = data;
    },
    error => {
      alert("ERROR Retrieving Messages: " + error);
    });
    refresher.complete();
  }

  createMessage(){
    this.navCtrl.push(CreatemessagePage);
  }

}
