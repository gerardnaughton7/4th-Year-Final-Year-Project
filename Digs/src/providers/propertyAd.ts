import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class PropertyAd {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
 
  getProperties(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get('http://localhost:8080/api/properties')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  createProperty(property){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:8080/api/properties', JSON.stringify(property), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }
 
  deleteProperty(id){
 
    this.http.delete('http://localhost:8080/api/properties/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }
 
}