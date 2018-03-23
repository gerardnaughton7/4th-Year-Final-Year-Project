import { UpdateMyPropertyAdPage } from './../update-my-property-ad/update-my-property-ad';
import { PropertyAd } from './../../providers/propertyAd';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';

@IonicPage()
@Component({
  selector: 'page-preview-property-modal',
  templateUrl: 'preview-property-modal.html',
})
export class PreviewPropertyModalPage {

  property: any;
  navFrom: boolean;
  imageViewer: ImageViewerController;

  constructor(public navCtrl: NavController, public navParams: NavParams,private propertyAd: PropertyAd, 
              private viewCtrl: ViewController, private launchNavigator: LaunchNavigator, public imageViewerCtrl: ImageViewerController) {
    this.property = this.navParams.get('property');
    this.navFrom = this.navParams.get('navFrom');
    this.imageViewer = imageViewerCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewPropertyModalPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  findOnMap(){
    if(this.property.Eircode != null){
      this.launchNavigator.navigate(this.property.Eircode)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
    }
    else{
      alert("No Eircode Supplied!");
    }
  }

  deleteProperty(){
    this.propertyAd.deleteProperty(this.property._id);
    this.viewCtrl.dismiss();
  }

  updateProperty(){
    this.navCtrl.push(UpdateMyPropertyAdPage, {property: this.property});
  }

  presentImage(myImage) {
    
    try {
      const Viewer = this.imageViewer.create(myImage);
      Viewer.present();
   
    } catch (error) {
      console.log("Image Error: " + error);
    }
  }
}
