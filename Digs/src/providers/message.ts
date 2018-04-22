import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
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
 
  /**
   * Retrieve messages from the back-end as json
   */
  getMessage(){
    return this.http.get(this.apiURL + 'api/messages').map(res => res.json());
  }
 
  /**
   * Post A Message to the back-end
   * @param message 
   */
  createMessage(message){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.apiURL + 'api/messages', JSON.stringify(message), {headers: headers})
      .subscribe(res => {
        
      },
      error => {
        console.log("Error retrieving messages: " + error);
      });
  }
 
}