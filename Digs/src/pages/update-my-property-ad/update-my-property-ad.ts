import { ListOfPropertiesPage } from './../list-of-properties/list-of-properties';
import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * Generated class for the UpdateMyPropertyAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-my-property-ad',
  templateUrl: 'update-my-property-ad.html',
})
export class UpdateMyPropertyAdPage {

  property: any;

  email: String;
  UID: String; 
  AdID: any ;
  PropertyType: String;
  SingleBeds: any ;
  DoubleBeds: any;
  TwinBeds: any;
  EnSuite: any;
  College: String[];
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
  ImageURL: String[];
  Date: Date;
  constructor(public navCtrl: NavController, public navParams: NavParams, private propertyAdService: PropertyAd,private inAppBrowser: InAppBrowser) {
    this.property = navParams.get('property');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateMyPropertyAdPage');
  }

  publishUpdate(){
    let updatedProperty = {
      UID: this.email,
      AdID: this.property.AdID,
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
      Parking: this.Parking,
      ImageURL: this.property.ImageURL,
      Date: new Date()
    };
    
    this.propertyAdService.updateProperty(updatedProperty, this.property._id);  
    this.navCtrl.setRoot(ListOfPropertiesPage);
  }

  moreInfo(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create("https://finder.eircode.ie/#/", '_self', options); 
  }

}
