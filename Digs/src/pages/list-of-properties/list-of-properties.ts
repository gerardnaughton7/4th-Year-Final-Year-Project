import { SearchPage } from './../search/search';
import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-of-properties',
  templateUrl: 'list-of-properties.html',
})
export class ListOfPropertiesPage {

  properties: any;

  constructor(public navCtrl: NavController,public propertyAdService: PropertyAd, public navParams: NavParams, 
              public modalCtrl: ModalController, private loadingController: LoadingController) {
  }

  ionViewDidEnter() {
    let loading = this.loadingController.create({content : "Retrieving Properties, please wait..."});
    loading.present();
    this.propertyAdService.getProperties().subscribe((data) => {
      console.log(data);
      this.properties = data.reverse();
      loading.dismissAll();
    },
    error => {
      loading.dismiss();
      alert("ERROR Retrieving Property Ads: " + error);
    });
  }

  openProperty(property) {
    let modal = this.modalCtrl.create('PreviewPropertyModalPage', { property: property });
    modal.present();
  }

  doRefresh(refresher) {
    let loading = this.loadingController.create({content : "Retrieving Properties, please wait..."});
    loading.present();
    this.propertyAdService.getProperties().subscribe(data => {
      this.properties = data.reverse();
      loading.dismissAll();
    },
    error => {
      alert("ERROR Retrieving Property Ads: " + error);
      loading.dismiss();
    });
    refresher.complete();
  }

  navToSearchPage(){
    this.navCtrl.push(SearchPage, {navFrom: false});
  }
}
