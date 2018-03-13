import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-of-properties',
  templateUrl: 'list-of-properties.html',
})
export class ListOfPropertiesPage {

  properties: any;

  constructor(public navCtrl: NavController,public propertyAdService: PropertyAd, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOfPropertiesPage');
    this.propertyAdService.getProperties().then((data) => {
      console.log(data);
      this.properties = data;
      console.log('loadlist'+ this.properties);
    });
  }

  openProperty(property) {
    let modal = this.modalCtrl.create('PreviewPropertyModalPage', { property: property });
    modal.present();
  }

}
