import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-search-result-property',
  templateUrl: 'search-result-property.html',
})
export class SearchResultPropertyPage {
  properties: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.properties = this.navParams.get("data");
  }

  /**
   * Opens a Modal which Presents the property listing to the user
   * @param {object} property 
   */
  openProperty(property){
    let modal = this.modalCtrl.create('PreviewPropertyModalPage', { property: property });
    modal.present();
  }
}
