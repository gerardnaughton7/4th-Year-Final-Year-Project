import { PropertyAd } from './../../providers/propertyAd';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-preview-property-modal',
  templateUrl: 'preview-property-modal.html',
})
export class PreviewPropertyModalPage {

  property: any;
  navFrom: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,private propertyAd: PropertyAd, private viewCtrl: ViewController, private launchNavigator: LaunchNavigator) {
    this.property = this.navParams.get('property');
    this.navFrom = this.navParams.get('navFrom');
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
}
