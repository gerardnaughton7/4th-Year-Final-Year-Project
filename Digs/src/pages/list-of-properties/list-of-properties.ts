import { SearchPage } from './../search/search';
import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-list-of-properties',
  templateUrl: 'list-of-properties.html',
})
export class ListOfPropertiesPage {

  properties: any;

  constructor(public navCtrl: NavController,public propertyAdService: PropertyAd, public navParams: NavParams, 
              public modalCtrl: ModalController, private loadingController: LoadingController, private toast: ToastController) {
  }

  /**
   * Retrieve a list of all Properties.
   */
  ionViewDidEnter() {
    let loading = this.loadingController.create({content : "Retrieving Properties, please wait..."});
    loading.present();

    this.propertyAdService.getProperties().subscribe((data) => {
      this.properties = data.reverse();
      loading.dismissAll();
    },
    error => {
      loading.dismiss();
      this.toast.create({
        message: "Unable To Retrieve Properties at this Time",
        duration: 3000     
      }).present();
    });
  }

  /**
   * Opens a modal which presents the property to the user.
   * @param {object} property 
   */
  openProperty(property) {
    let modal = this.modalCtrl.create('PreviewPropertyModalPage', { property: property });
    modal.present();
  }

  /**
   * Pull down refresh which retrieves the list of properties.
   * @param {Event} refresher 
   */
  doRefresh(refresher) {
    let loading = this.loadingController.create({content : "Retrieving Properties, please wait..."});
    loading.present();
    this.propertyAdService.getProperties().subscribe(data => {
      this.properties = data.reverse();
      loading.dismissAll();
    },
    error => {
      this.toast.create({
        message: "Unable To Retrieve Properties at this Time",
        duration: 3000     
      }).present();
      loading.dismiss();
    });
    refresher.complete();
  }

  /**
   * Navigate To The Search Page.
   */
  navToSearchPage(){
    this.navCtrl.push(SearchPage, {navFrom: false});
  }
}
