import { Component } from '@angular/core';
import { ImagesProvider } from './../../providers/images/images';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
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
      // Retrieve data passed from the create room/property page - image and adId
      this.imageData = this.navParams.get('data');
      this.adID = this.navParams.get("adID");
  }
 
  /**
   * Uploads An Image To the Back-End
   */
  saveImage() {
    let loading = this.loadingController.create({content : "Uploading Image, please wait..."});
    loading.present();
    // Send the image to our node server using the images provider service.
    this.imagesProvider.uploadImage(this.imageData, this.adID).then(res => {
      this.viewCtrl.dismiss({reload: true});
      loading.dismiss();
    }, err => {
      loading.dismiss();
      this.dismiss();      
    });
  }
 
  /**
   * Dismiss the Current View
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}