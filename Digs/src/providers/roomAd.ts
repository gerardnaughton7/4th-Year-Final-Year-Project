import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class RoomAd {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
 
  getRooms(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get('http://localhost:8080/api/rooms')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  createReview(room){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:8080/api/rooms', JSON.stringify(room), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }
 
  deleteRoom(id){
 
    this.http.delete('http://localhost:8080/api/rooms/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }
 
}