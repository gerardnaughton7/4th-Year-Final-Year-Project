import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReviewsProvider {

  data: any;

  constructor(public http: Http) {
    console.log('Hello ReviewsProvider Provider');
    this.data = null;
  }

  getReviews(){
    
    if(this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
     this.http.get('http://localhost:8080/api/reviews/')
     //this.http.get('http://52.56.193.204:8100/api/reviews/')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }//getReviews()

  createReview(review){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/api/reviews/', JSON.stringify(review), {headers: headers})

      .subscribe(res => {
        console.log(res.json());
    });
     
  }//createReview()

  deleteReview(id){
    
    this.http.delete('http://localhost:8080/api/reviews/' + id).subscribe((res) => {
      console.log(res.json());
    });   
    
  }//deleteReview()

  updateReview(review){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Review ID: " + review._id);
    console.log("Review Description: " + review.description);

    console.log(JSON.stringify(review));
    this.http.put('http://localhost:8080/api/reviews/', JSON.stringify(review), {headers: headers})
    .subscribe(res => {
      console.log("Response From Server: " + res.json());
    });
  }

}
