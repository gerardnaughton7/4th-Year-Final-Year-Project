import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { Message } from './../../providers/message';
/**
 * Generated class for the MessageboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messageboard',
  templateUrl: 'messageboard.html',
})
export class MessageboardPage {

  messages: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public messageService: Message, public modalCtrl: ModalController) {
  }

   ionViewDidLoad() {
     console.log('ionViewDidLoad MessageboardPage');
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

}
