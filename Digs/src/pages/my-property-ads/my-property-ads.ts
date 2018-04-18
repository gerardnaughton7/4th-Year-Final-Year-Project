import { UpdateMyPropertyAdPage } from './../update-my-property-ad/update-my-property-ad';
import { Storage } from '@ionic/storage';
import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-my-property-ads',
  templateUrl: 'my-property-ads.html',
})

export class MyPropertyAdsPage {
  properties: any;
  navFrom: boolean = true;
  email: any;

  constructor(public navCtrl: NavController,public propertyAdService: PropertyAd, public navParams: NavParams, 
              public modalCtrl: ModalController, private storage: Storage, private propertyService: PropertyAd,
              private toast: ToastController) {
  }

  /**
   * Retrieve email from local storage. Retrieve list of My Property Ads from Back-end using Property Ad Service
   */
  ionViewDidEnter() {
    this.storage.get('email').then((val) => {
      
      this.email = val;

      this.propertyAdService.getMyProperties(this.email).subscribe((data) => {
        this.properties = data; 
      },
      error => { 
        this.toast.create({
          message: "Unable To Retrieve My Property Ads",
          duration: 3000     
        }).present();
      });
    });
  } 

  /**
   * Opens The Preview Property Page Modal passing through the current property and a boolean to its constructor
   * @param {object} property 
   * @param {boolean} navFrom set to true
   */
  openProperty(property, navFrom) {
    let modal = this.modalCtrl.create('PreviewPropertyModalPage', { property: property , navFrom: this.navFrom});
    modal.present();  
  }

  /**
   * Navigate to Update Property Ad Page passing the current property to be updated.
   * @param {object} property 
   */
  updateAd(property){
    this.navCtrl.push(UpdateMyPropertyAdPage, {property: property});
  }

  /**
   * Delete Property from Database using Property Ad Service
   * @param {object} property 
   */
  deleteAd(property){
    try{
      this.propertyService.deleteProperty(property._id);
    }
    catch(e){
      this.toast.create({
        message: "Unable To Delete Ad - Please Try Again",
        duration: 3000     
      }).present();
    }
    let deleteTimeout = setTimeout( () => { this.navCtrl.setRoot(MyPropertyAdsPage); }, 500);
  }
}
