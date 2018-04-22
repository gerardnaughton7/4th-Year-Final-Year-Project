import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@Injectable()
export class RoomAd {
 
  email: String;

  //AWS urls available for when we are testing
  //apiURL = 'http://localhost:8080/';
  apiURL = 'http://54.73.1.214:8080/'; //patrick
  //apiURL = 'http://52.56.193.204:8080/'; // andrei
  //apiURL = 'http://54.72.69.79:8080/'; //gerard
 
  constructor(public http: Http) {
  }
  
  /**
   * Retrieve rooms from the back-end as json
   */
  getRooms(){
    return this.http.get(this.apiURL + 'api/rooms').map(res => res.json());
  }

  /**
   * Retrieve rooms using email provided 
   * @param email 
   */
  getMyRooms(email){
    console.log("now in getMyRooms(): " + email);
    return this.http.get(this.apiURL + 'api/myRooms/' + email).map(res => res.json());
  }
 
  /**
   * Post a room listing to the back-end
   * @param room 
   */
  createRoom(room){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.apiURL+'api/rooms', JSON.stringify(room), {headers: headers})
      .subscribe(res => {
        
      },
      error => {
        console.log("ERROR CREATING ROOM: " + error);
      });
  }
 
  /**
   * Delete a room from the back-end using an id
   * @param id 
   */
  deleteRoom(id){
    this.http.delete(this.apiURL+'api/rooms/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }

  /**
   * Update a specific room listing identified by an id
   * @param update 
   * @param id 
   */
  updateRoom(update, id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put(this.apiURL + 'api/rooms/' + id, JSON.stringify(update), {headers: headers}).subscribe(res => {
      
    },
    error => {
      console.log("ERROR UPDATING Property: " + error);
    });
 
  }

  /**
   * Query the back-end for a room listing with 3 parameters: college, room-type, parking
   * @param College 
   * @param RoomType 
   * @param Parking 
   */
  searchRoomOnThreeParams(College, RoomType, Parking){
    return this.http.get(this.apiURL + 'api/searchRooms/' + College + "/" + RoomType + "/" + Parking).map(res => res.json());
  }

  /**
   * Query the back-end for a room listing with 4 parameters: college, room-type, parking, price
   * @param College 
   * @param RoomType 
   * @param Parking 
   * @param Price 
   */
  searchRoomOnFourParams(College, RoomType, Parking, Price){
    return this.http.get(this.apiURL + 'api/searchRooms/' + College + "/" + RoomType + "/" + Parking + "/" + Price).map(res => res.json());
  }
}