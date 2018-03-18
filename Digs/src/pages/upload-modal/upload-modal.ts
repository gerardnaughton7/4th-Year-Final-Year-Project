import { Component } from '@angular/core';
import { ImagesProvider } from './../../providers/images/images';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-upload-modal',
  templateUrl: 'upload-modal.html',
})
export class UploadModalPage {
  imageData: any;
  adID: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, 
              private imagesProvider: ImagesProvider, public loadingController: LoadingController) {
                
    this.imageData = this.navParams.get('data');
    this.adID = this.navParams.get("adID");
  }
 
  saveImage() {
    let loading = this.loadingController.create({content : "Uploading Image, please wait..."});
    loading.present();
    this.imagesProvider.uploadImage(this.imageData, this.adID).then(res => {
      this.viewCtrl.dismiss({reload: true});
      loading.dismiss();
    }, err => {
      loading.dismiss();
      this.dismiss();      
    });
  }
 
  dismiss() {
    this.viewCtrl.dismiss();
  }
 
}