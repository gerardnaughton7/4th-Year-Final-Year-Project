import { ImagesProvider } from './../../providers/images/images';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
 
@IonicPage()
@Component({
  selector: 'page-upload-modal',
  templateUrl: 'upload-modal.html',
})
export class UploadModalPage {
  imageData: any;
  desc: string;
 
  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private imagesProvider: ImagesProvider) {
    this.imageData = this.navParams.get('data');
  }
 
  saveImage() {
    console.log("Saving Image...");
    this.imagesProvider.uploadImage(this.imageData, this.desc).then(res => {
      this.viewCtrl.dismiss({reload: true});
    }, err => {
      this.dismiss();
      console.log("Error Before Provider: " + JSON.stringify(err));
    });
  }
 
  dismiss() {
    this.viewCtrl.dismiss();
  }
 
}