import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'];

  constructor(public navCtrl: NavController) {

  }

}
