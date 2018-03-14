import { ImagesProvider } from './../../providers/images/images';
import { Md5 } from 'ts-md5/dist/md5';
import { Message } from './../../providers/message';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams} from 'ionic-angular';

/**
 * Generated class for the CreatemessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createmessage',
  templateUrl: 'createmessage.html',
})
export class CreatemessagePage {
  time: any = new String(new Date());
  UID: String;
  AdID: any = Md5.hashStr(this.time);
  Message: String;
  Name: String;
  Email: String;

  constructor(public navCtrl: NavController, /*public messageService: Message,*/ public navParams: NavParams,
    public viewCtrl: ViewController, private imagesProvider: ImagesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatemessagePage');
  }

  postMessage() {

    this.imagesProvider.getImageAdID(this.AdID).map(res => res.json()).subscribe(data => {
      alert('My Data: ' + data + " And Data is a: " + typeof(data));

    let message = {
      UID: this.UID,
      AdID: this.AdID,
      Message: this.Message,
      Name: this.Name,
      Email: this.Email
    };
   // this.messageService.createMessage(message);  
    this.navCtrl.setRoot(HomePage);
  });
  }

}


