import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@Injectable()
export class PropertyAd {

  //apiURL = 'http://localhost:8080/';
  apiURL = 'http://54.73.1.214:8080/'; //patrick
  //apiURL = 'http://52.56.193.204:8080/'; // andrei
  //apiURL = 'http://54.72.69.79:8080/'; //gerard
 
  constructor(public http: Http) {

  }
 
  /**
   * Retrieve properties from the back-end as json
   */
  getProperties(){
    return this.http.get(this.apiURL + 'api/properties').map(res => res.json());
  }

  /**
   * Retrieve properties using email provided 
   * @param email 
   */
  getMyProperties(email){
    return this.http.get(this.apiURL + 'api/myProperties/' + email).map(res => res.json()); 
  }
 
  /**
   * Post a Property listing to the back-end
   * @param property 
   */
  createProperty(property){ 
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.apiURL+'api/properties', JSON.stringify(property), {headers: headers})
      .subscribe(res => {
      },
      error => {
        console.log("ERROR CREATING Property: " + error);
      });
 
  }
 
  /**
   * Delete a property from the back-end using an id
   * @param id 
   */
  deleteProperty(id){
    this.http.delete(this.apiURL+'api/properties/' + id).subscribe((res) => {
      console.log(res.json());
    });   
  }

  /**
   * Update a specific property listing identified by an id
   * @param update 
   * @param id 
   */
  updateProperty(update, id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put(this.apiURL + 'api/properties/' + id, JSON.stringify(update), {headers: headers}).subscribe(res => {
      console.log(res.json());
    },
    error => {
      console.log("ERROR UPDATING Property: " + error);
    });

  }
  
  /**
   * Query the back-end for a property listing with 3 parameters: college, no of rooms, parking
   * @param College 
   * @param numRooms 
   * @param Parking 
   */
  searchPropertyOnThreeParams(College, numRooms, Parking){
    return this.http.get(this.apiURL + 'api/searchProperties/' + College + "/" + numRooms + "/" + Parking).map(res => res.json());
  }

  /**
   * Query the back-end for a property listing with 4 parameters: college, no of rooms, parking, price
   * @param College 
   * @param numRooms 
   * @param Parking 
   * @param Price 
   */
  searchPropertyOnFourParams(College, numRooms, Parking, Price){
    return this.http.get(this.apiURL + 'api/searchProperties/' + College + "/" + numRooms + "/" + Parking + "/" + Price).map(res => res.json());
  }
  
}