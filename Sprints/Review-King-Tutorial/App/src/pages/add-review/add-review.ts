import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html',
})
export class AddReviewPage {

  title: any;
  description: any;
  rating: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddReviewPage');
  }

  save(): void {
    let review = {
      title: this.title,
      description: this.description,
      rating: this.rating
    };
   
    this.viewCtrl.dismiss(review);
  };

  close(): void {
   
    this.viewCtrl.dismiss();
  }

}
