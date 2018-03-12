import { Component } from '@angular/core';
import { ImagesProvider } from './../../providers/images/images';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-upload-modal',
  templateUrl: 'upload-modal.html',
})
export class UploadModalPage {
  imageData: any;
  adID: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private imagesProvider: ImagesProvider) {
    this.imageData = this.navParams.get('data');
    this.adID = this.navParams.get("adID");
  }
 
  saveImage() {
    this.imagesProvider.uploadImage(this.imageData, this.adID).then(res => {
      this.viewCtrl.dismiss({reload: true});
    }, err => {
      this.dismiss();
    });
  }
 
  dismiss() {
    this.viewCtrl.dismiss();
  }
 
}