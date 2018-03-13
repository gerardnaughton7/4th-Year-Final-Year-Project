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
 
      this.http.get('http://54.73.1.214:8080/api/rooms')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  createRoom(room){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://54.73.1.214:8080/api/rooms', JSON.stringify(room), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      },
      error => {
        alert("ERROR CREATING ROOM: " + error);
      });
  }
 
  deleteRoom(id){
 
    this.http.delete('http://54.73.1.214:8080/api/rooms/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }
 
}