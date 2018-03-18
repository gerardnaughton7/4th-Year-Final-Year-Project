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

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private launchNavigator: LaunchNavigator) {
    this.property = this.navParams.get('property');
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
}
