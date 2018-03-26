import { SearchResultPropertyPage } from './../search-result-property/search-result-property';
import { PropertyAd } from './../../providers/propertyAd';
import { ListOfPropertiesPage } from './../list-of-properties/list-of-properties';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomAd } from '../../providers/roomAd';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private propertyAd: PropertyAd, private roomAd: RoomAd) {
    this.navFrom = navParams.get("navFrom");
    console.log("in search cons"+ navParams.get('navFrom'));
  }

  ionViewDidEnter(){
   this.navFrom = this.navParams.get("navFrom");
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  SearchAds(){
    //check if the search is for rooms or propertys
    if(this.navFrom == true)//if true its for rooms
    {
        
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
