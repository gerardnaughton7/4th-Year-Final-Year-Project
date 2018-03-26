import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class PropertyAd {

  //apiURL = 'http://localhost:8080/';
  apiURL = 'http://54.73.1.214:8080/'; //patrick
  //apiURL = 'http://52.56.193.204:8080/'; // andrei
  //apiURL = 'http://54.72.69.79:8080/'; //gerard
 
  constructor(public http: Http,private storage: Storage) {

  }
 
  getProperties(){
    return this.http.get(this.apiURL + 'api/properties').map(res => res.json());
  }

  getMyProperties(email){
    return this.http.get(this.apiURL + 'api/myProperties/' + email).map(res => res.json()); 
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
    this.http.delete(this.apiURL+'api/properties/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }

  updateProperty(update,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put(this.apiURL + 'api/properties/' + id, JSON.stringify(update), {headers: headers}).subscribe(res => {
      console.log(res.json());
    },
    error => {
      alert("ERROR UPDATING Property: " + error);
    });

  }
  // Search Functionality - Searching on three params and then on four params
  searchPropertyOnThreeParams(College, numRooms, Parking){
    return this.http.get(this.apiURL + 'api/searchProperties/' + College + "/" + numRooms + "/" + Parking).map(res => res.json());
  }

  searchPropertyOnFourParams(College, numRooms, Parking, Price){
    return this.http.get(this.apiURL + 'api/searchProperties/' + College + "/" + numRooms + "/" + Parking + "/" + Price).map(res => res.json());
  }
 
}