import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search-result-property',
  templateUrl: 'search-result-property.html',
})
export class SearchResultPropertyPage {
  properties: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.properties = this.navParams.get("data");
    console.log("In Search Results: " + JSON.stringify(this.properties));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPropertyPage');
  }

  openProperty(property){
    let modal = this.modalCtrl.create('PreviewPropertyModalPage', { property: property });
    modal.present();
  }
}
