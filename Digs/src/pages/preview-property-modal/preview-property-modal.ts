import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PreviewPropertyModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preview-property-modal',
  templateUrl: 'preview-property-modal.html',
})
export class PreviewPropertyModalPage {

  property: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.property = this.navParams.get('property');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewPropertyModalPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
