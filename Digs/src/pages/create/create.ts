import { CreatePropertyAdPage } from './../create-property-ad/create-property-ad';
import { CreateRoomAdPage } from './../create-room-ad/create-room-ad';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})

export class CreatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  /**
   * Navigate to the Create Room Page
   */
  navToCreateRoom(){
    this.navCtrl.push(CreateRoomAdPage);
  }

  /**
   * Navigate to the Create Property Page
   */
  navToCreateProperty(){
    this.navCtrl.push(CreatePropertyAdPage);
  }

}
