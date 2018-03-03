import { Component } from '@angular/core';
import { ImagesProvider } from './../../providers/images/images';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';

/**
 * Generated class for the UploadModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-modal',
  templateUrl: 'upload-modal.html',
})
export class UploadModalPage {
  imageData: any;
  desc: string;
  roomType: string;
  college: string; 
  eircode: string;
  location: string; 
  price: string; 
  availabilty: string;
  email: string;
  phone: string;
  howContact: string;
  parking: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private imagesProvider: ImagesProvider) {
    this.imageData = this.navParams.get('data');
  }
 
  saveImage() {
    this.imagesProvider.uploadImage(this.imageData, this.desc,
      this.roomType,  this.college,  this.eircode,  this.location,  this.price,  this.availabilty,  this.email,  this.phone,  this.howContact,  this.parking).then(res => {
      this.viewCtrl.dismiss({reload: true});
    }, err => {
      this.dismiss();
    });
  }
 
  dismiss() {
    this.viewCtrl.dismiss();
  }
 
}