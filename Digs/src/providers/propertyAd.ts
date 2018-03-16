import { globalVar } from './globalVar';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class PropertyAd {
 
  data: any;
  myData: any;
  //apiURL = 'http://localhost:8080/';
  apiURL = 'http://54.73.1.214:8080/'; //patrick
  //apiURL = 'http://52.56.193.204:8080/'; // andrei
  //apiURL = 'http://54.72.69.79:8080/'; //gerard
 
  constructor(public http: Http,private globalVar: globalVar) {
    this.data = null;
  }
 
  getProperties(){
    return this.http.get(this.apiURL + 'api/properties').map(res => res.json());
  }

  getMyProperties(){
    return this.http.get(this.apiURL + 'api/myProperties/' + this.globalVar.getLoginUser()); 
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