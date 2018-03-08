import { PropertyAd } from './../../providers/propertyAd';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the CreatePropertyAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-property-ad',
  templateUrl: 'create-property-ad.html',
})
export class CreatePropertyAdPage {

  UID: String;
  AdID: String;
  PropertyType: String;
  SingleBeds: any;
  DoubleBeds: any;
  TwinBeds: any;
  EnSuite: any;
  College: String;
  Address: String;
  Eircode: String;
  LocationDes: String;
  Price: any;
  Availability: any;
  Email: String;
  Phone: any;
  Contact: String;
  Description: String;
  Parking: String;

  constructor(public navCtrl: NavController,public propertyAdService: PropertyAd, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePropertyAdPage');
  }

  publishAd() {
    let room = {
      UID: this.UID,
      AdID: this.AdID,
      PropertyType: this.PropertyType,
      SingleBeds: this.SingleBeds,
      DoubleBeds: this.DoubleBeds,
      TwinBeds: this.TwinBeds,
      EnSuite: this.EnSuite,
      College: this.College,
      Address: this.Address,
      Eircode: this.Eircode,
      LocationDes: this.LocationDes,
      Price: this.Price,
      Availability: this.Availability,
      Email: this.Email,
      Phone: this.Phone,
      Contact: this.Contact,
      Description: this.Description,
      Parking: this.Parking
    };
    this.propertyAdService.createProperty(room);  
    this.navCtrl.setRoot(HomePage);
  }

  uploadImage() {

  }

}
