import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Platform } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-preview-property-modal',
  templateUrl: 'preview-property-modal.html',
})
export class PreviewPropertyModalPage {

  property: any;
  navFrom: boolean;
  imageViewer: ImageViewerController;
  backButtonUnregister: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private viewCtrl: ViewController, private launchNavigator: LaunchNavigator, 
              public imageViewerCtrl: ImageViewerController, private toast: ToastController, private platform: Platform) {
    this.backButtonUnregister = platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
    });
    /**
     * Retrieve values passed to constructor when Modal is loaded.
     */
    this.property = this.navParams.get('property');
    this.navFrom = this.navParams.get('navFrom');
    this.imageViewer = imageViewerCtrl;
  }

  ionViewWillLeave() {
    this.backButtonUnregister();
  }

  /**
   * Close The View
   */
  close() {
    this.viewCtrl.dismiss();
  }

  /**
   * Find Listing Location on devices navigation app using the Eircode of the property.
   */
  findOnMap(){
    if(this.property.Eircode != null){
      this.launchNavigator.navigate(this.property.Eircode)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
    }
    else{
      this.toast.create({
        message: "No Eircode Provided",
        duration: 3000     
      }).present();
    }
  }

  /**
   * Displays the selected image in fullscreen using the ionic-img-viewer plugin.
   * @param myImage 
   */
  presentImage(myImage) {
    
    try {
      const Viewer = this.imageViewer.create(myImage);
      Viewer.present();
   
    } catch (error) {
      console.log("Image Error: " + error);
    }
  }
}
