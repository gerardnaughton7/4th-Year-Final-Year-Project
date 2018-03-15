import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Message {
 
  data: any;
  //apiURL = 'http://localhost:8080/';
  apiURL = 'http://54.73.1.214:8080/'; //patrick
  //apiURL = 'http://52.56.193.204:8080/'; // andrei
  //apiURL = 'http://54.72.69.79:8080/'; //gerard
 
  constructor(public http: Http) {
    this.data = null;
  }
 
  getMessage(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => { 
      this.http.get(this.apiURL + 'api/messages')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    }); 
  }
 
  createMessage(message){
    console.log("In Message Provider - about to post a message to api");
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.apiURL + 'api/messages', JSON.stringify(message), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      },
      error => {
        alert("ERROR CREATING Message: " + error);
      });
  }
 
  deleteMessage(id){ 
    this.http.delete(this.apiURL + 'messages/' + id).subscribe((res) => {
      console.log(res.json());
    });    
  }
}