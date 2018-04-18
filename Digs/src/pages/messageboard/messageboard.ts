import { CreatemessagePage } from './../createmessage/createmessage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Message } from './../../providers/message';
import { Storage } from '@ionic/storage';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-messageboard',
  templateUrl: 'messageboard.html',
})
export class MessageboardPage {

  messages: any;
  loggedIn: null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public messageService: Message, 
              public modalCtrl: ModalController, private storage: Storage, private toast: ToastController) {
    /**
     * Retrieve users email from local storage
     */
    this.storage.get('email').then((val) => {
      this.loggedIn = val;
    });
  }

  /**
   * Retrieve All Messages From Back-End using Message Service
   */
  ionViewDidEnter() {
    this.messageService.getMessage().subscribe((data) => {
      console.log("Data returned from ListRooms on Load: " + JSON.stringify(data));
      this.messages = data.reverse(); 
    },
    error => {
      this.toast.create({
        message: "Error Retrieving Messages",
        duration: 3000     
      }).present();
    });

  }

  /**
   * Pull down refresh which retrieves the list of messages.
   * @param {Event} refresher 
   */
  doRefresh(refresher) {
    this.messageService.getMessage().subscribe(data => {
      this.messages = data.reverse();
    },
    error => {
      alert("ERROR Retrieving Messages: " + error);
    });
    refresher.complete();
  }

  /**
   * Navigate To Create Message Page
   */
  createMessage(){
    this.navCtrl.push(CreatemessagePage);
  }
}
