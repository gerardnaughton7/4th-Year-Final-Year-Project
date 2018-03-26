import { SearchResultRoomPage } from './../search-result-room/search-result-room';
import { SearchResultPropertyPage } from './../search-result-property/search-result-property';
import { PropertyAd } from './../../providers/propertyAd';
import { ListOfPropertiesPage } from './../list-of-properties/list-of-properties';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomAd } from '../../providers/roomAd';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private propertyAd: PropertyAd, private roomAd: RoomAd) {
    this.navFrom = navParams.get("navFrom");
  }

  ionViewDidEnter(){
   this.navFrom = this.navParams.get("navFrom");
  }

  SearchAds(){
    //check if the search is for rooms or propertys
    if(this.navFrom == true)//if true its for rooms
    {
      if(this.Price != null || this.Price == 0){
        this.roomAd.searchRoomOnFourParams(this.College, this.RoomType, this.Parking, this.Price).subscribe(data => {
          this.navCtrl.push(SearchResultRoomPage, {data: data});
        }),
        error => {
          alert("ERROR Retrieving Search Results: " + error);
        };

      }
      else{
        console.log("here!");
        this.roomAd.searchRoomOnThreeParams(this.College, this.RoomType, this.Parking).subscribe(data => {
          this.navCtrl.push(SearchResultRoomPage, {data: data});
        }),
        error => {
          alert("ERROR Retrieving Search Results: " + error);
        };
      }
        
    }
    else//search for properties
    {
      if(this.Price != null || this.Price == 0){
        this.propertyAd.searchPropertyOnFourParams(this.College, this.NoOfRooms, this.Parking, this.Price).subscribe(data => {
          this.navCtrl.push(SearchResultPropertyPage, {data: data});
        }),
        error => {
          alert("ERROR Retrieving Search Results: " + error);
        };
      }
      else{
        this.propertyAd.searchPropertyOnThreeParams(this.College, this.NoOfRooms, this.Parking).subscribe(data => {
          this.navCtrl.push(SearchResultPropertyPage, {data: data});
        }),
        error => {
          alert("ERROR Retrieving Search Results: " + error);
        };
      }
  
    }
    
  }
}
