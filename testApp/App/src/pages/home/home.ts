import { EditReviewPage } from './../edit-review/edit-review';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddReviewPage } from './../add-review/add-review';
import { ReviewsProvider } from './../../providers/reviews/reviews';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  reviews: any;

  constructor(public nav: NavController, public ReviewsProvider: ReviewsProvider, public modalCtrl: ModalController) {

  }
  
  ionViewDidLoad(){
    
       this.ReviewsProvider.getReviews().then((data) => {
         console.log("Hello There ion view Did load with the following: " + data);
         this.reviews = data;
       });
    
  }

  addReview(){
    
    let modal = this.modalCtrl.create(AddReviewPage);

    modal.onDidDismiss(review => {
      if(review){
        this.reviews.push(review);
        this.ReviewsProvider.createReview(review);       
      }
    });

    modal.present();
    
  }

  deleteReview(review){
  
    //Remove locally
      let index = this.reviews.indexOf(review);

      if(index > -1){
        this.reviews.splice(index, 1);
      }  
    //console.log("Deleting Review with id: " + review._id);
    //Remove from database
    this.ReviewsProvider.deleteReview(review._id);
  }

  updateReview(review){
    let modal = this.modalCtrl.create(EditReviewPage);
  
    var old_id = review._id;
    console.log("MADE IT BACK!!");
    
    modal.onDidDismiss(review => {
      
      if(review){     
        review._id = old_id;
        this.ReviewsProvider.updateReview(review); 
        window.location.reload();
      }
    });
    
    modal.present();  
    
  }

}
