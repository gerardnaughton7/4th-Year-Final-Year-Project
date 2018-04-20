import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
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
  PropertyType: any;
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private propertyAdService: PropertyAd,
              private inAppBrowser: InAppBrowser) {
    /**
     * Retrieve The property listing passed to this constructor
     */
    this.property = navParams.get('property');
    this.PropertyType = this.property.PropertyType;
    this.SingleBeds = this.property.SingleBeds;
    this.DoubleBeds = this.property.DoubleBeds;
    this.TwinBeds = this.property.TwinBeds;
    this.EnSuite = this.property.EnSuite;
    this.College = this.property.College;
    this.Address = this.property.Address;
    this.Eircode = this.property.Eircode;
    this.Price = this.property.Price;
    this.Availability = this.property.Availability;
    this.Email = this.property.Email;
    this.Phone = this.property.Phone;
    this.Contact = this.property.Contact;
    this.Description = this.property.Description;
    this.Parking = this.property.Parking;
  }

  /**
   * Publishes the updated listing using the Property Ads Service
   */
  publishUpdate(){
    let updatedProperty = {
      UID: this.property.UID,
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
      ImageURL: this.property.ImagesUrl,
      Date: new Date()
    };
    // Use the property ad service to publish the updated listing to the back-end
    this.propertyAdService.updateProperty(updatedProperty, this.property._id); 
    this.navCtrl.pop();
  }

  /**
   * Opens the in app browser and displays the eircode finder website.
   */
  moreInfo(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create("https://finder.eircode.ie/#/", '_self', options); 
  }

}
