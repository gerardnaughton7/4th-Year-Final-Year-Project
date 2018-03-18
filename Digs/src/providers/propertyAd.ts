import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class PropertyAd {

  email: String;
  //apiURL = 'http://localhost:8080/';
  apiURL = 'http://54.73.1.214:8080/'; //patrick
  //apiURL = 'http://52.56.193.204:8080/'; // andrei
  //apiURL = 'http://54.72.69.79:8080/'; //gerard
 
  constructor(public http: Http,private storage: Storage) {
    this.storage.get('email').then((val) => {
      this.email = val;
    });
  }
 
  getProperties(){
    return this.http.get(this.apiURL + 'api/properties').map(res => res.json());
  }

  getMyProperties(){
    alert("in property provider constructor email is"+ this.email);
    return this.http.get(this.apiURL + 'api/myProperties/' + this.email).map(res => res.json()); 
  }
 
  createProperty(property){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.apiURL+'api/properties', JSON.stringify(property), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      },
      error => {
        alert("ERROR CREATING Property: " + error);
      });
 
  }
 
  deleteProperty(id){
 
    this.http.delete(this.apiURL+'properties/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }
 
}