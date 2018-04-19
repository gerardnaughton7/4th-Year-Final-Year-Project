import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  template: `
  <ion-list>
    <ion-list-header>
     More Information
    </ion-list-header>
    
    <button ion-item (click)="close('https://github.com/gerardnaughton7/4th-Year-Final-Year-Project')">GitHub Repo
      <ion-icon name="logo-github" item-start></ion-icon>
    </button>
    <button ion-item (click)="goAbout()">About
      <ion-icon name="information-circle" item-start></ion-icon>
    </button>   
  </ion-list>
  `
})
export class AboutPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  /**
   * Closes Menu and Opens Browser navigating to our GitHub Repo
   * @param {string} 
   */
  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }

  /**
   * Navigate to the About Page
   */
  goAbout(){

  }

}
