import { SearchResultRoomPage } from './../search-result-room/search-result-room';
import { SearchResultPropertyPage } from './../search-result-property/search-result-property';
import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RoomAd } from '../../providers/roomAd';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  College: String;
  NoOfRooms: Number;
  RoomType: String;
  Parking: String;
  navFrom: Boolean;
  Price: Number;
  isFilled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private propertyAd: PropertyAd, 
              private roomAd: RoomAd, private toast: ToastController) {
    /**
     * Retrieve boolean passed when Page Is loaded.
     */
    this.navFrom = navParams.get("navFrom");
  }

  /**
   * Search Ads Function
   */
  SearchAds(){
    /**
     * Check if the search is for rooms or properties
     */
    if(this.navFrom == true)//if true its for rooms
    {
      if(this.Price != null || this.Price == 0){
        this.roomAd.searchRoomOnFourParams(this.College, this.RoomType, this.Parking, this.Price).subscribe(data => {
          this.navCtrl.push(SearchResultRoomPage, {data: data});
        }),
        error => {
          this.toast.create({
            message: "Error Retrieving Results - Please Try Again",
            duration: 3000     
          }).present();
        };

      }
      else{
        this.roomAd.searchRoomOnThreeParams(this.College, this.RoomType, this.Parking).subscribe(data => {
          this.navCtrl.push(SearchResultRoomPage, {data: data});
        }),
        error => {
          this.toast.create({
            message: "Error Retrieving Results - Please Try Again",
            duration: 3000     
          }).present();
        };
      }
        
    }
    else//Search for properties
    {
      if(this.Price != null || this.Price == 0){
        this.propertyAd.searchPropertyOnFourParams(this.College, this.NoOfRooms, this.Parking, this.Price).subscribe(data => {
          this.navCtrl.push(SearchResultPropertyPage, {data: data});
        }),
        error => {
          this.toast.create({
            message: "Error Retrieving Results - Please Try Again",
            duration: 3000     
          }).present();
        };
      }
      else{
        this.propertyAd.searchPropertyOnThreeParams(this.College, this.NoOfRooms, this.Parking).subscribe(data => {
          console.log(JSON.stringify(data));
          this.navCtrl.push(SearchResultPropertyPage, {data: data});
        }),
        error => {
          this.toast.create({
            message: "Error Retrieving Results - Please Try Again",
            duration: 3000     
          }).present();
        };
      }
    }   
  }
}
