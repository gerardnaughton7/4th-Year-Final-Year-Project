import { Storage } from '@ionic/storage';
import { ListOfRoomsPage } from './../list-of-rooms/list-of-rooms';
import { ImagesProvider } from './../../providers/images/images';
import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, ModalController } from 'ionic-angular';
import {RoomAd} from '../../providers/roomAd';
import {Md5} from 'ts-md5/dist/md5';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-create-room-ad',
  templateUrl: 'create-room-ad.html',
})
export class CreateRoomAdPage {
  imageButton: String = "Upload Image";
  time: any = new String(new Date());
  email: String;
  UID: String;
  AdID: any = Md5.hashStr(this.time);
  RoomType: String;
  College: String[];
  Address: String;
  Eircode: String;
  LocationDes: String;
  Price: any;
  Availability: any;
  Email: String;
  Phone: any;
  Contact: String;
  Description: String;
  Parking: String;
  ImageURL: String[];
  Date: Date;

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, private modalCtrl: ModalController,
              public viewCtrl: ViewController, private actionSheetCtrl: ActionSheetController,private imagesProvider: ImagesProvider, 
              private camera: Camera, private storage: Storage, private inAppBrowser: InAppBrowser) {               
  }

  ionViewDidLoad() {
    /**
     * Retrieve logged in user email from local storage
     */
    this.storage.get('email').then((val) => {
      this.email = val;
    });
    
  }

  /**
   * Publishes the listing using the ImagesProvide Service
   */
  publishAd() {

    this.imagesProvider.getImageAdID(this.AdID)
    .map(res => res.json())
    .subscribe(data => {
      let room = {
        UID: this.email,
        AdID: this.AdID,
        RoomType: this.RoomType,
        College: this.College,
        Address: this.Address,
        Eircode: this.Eircode,
        LocationDes: this.LocationDes,
        Price: this.Price,
        Availability: this.Availability,
        Email: this.Email,
        Phone: new String(this.Phone),
        Contact: this.Contact,
        Description: this.Description,
        Parking: this.Parking,
        ImageURL: data,
        Date: new Date()
      };
      // Use the room ad service to publish the listing to the back-end
      this.roomAdService.createRoom(room);  
      // Return to the List of Rooms Page 
      this.navCtrl.setRoot(ListOfRoomsPage);
    });
  }

  /**
   * Presents ActionSheet with Options to use Camera or Load From Storage 
   */
  uploadOption() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          icon: 'folder',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
    this.imageButton = "Add Another Image";
  }

 /**
   * Retrieves an image from the users device and passes the image to the upload modal page with the adId
   */
  takePicture(sourceType){
    // Create options for the Camera Dialog
    var options = {
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Create a new modal passing the image and adId to the constructor of the Upload Modal Page
      let modal = this.modalCtrl.create('UploadModalPage', { data: imagePath, adID: this.AdID });
      // Present the Modal
      modal.present();
      
      modal.onDidDismiss(data => {
        // The Modal Page has been dismissed by the user
        console.log("TP + Data Returned: " + JSON.stringify(data));
      });

    }, (err) => {
      console.log('Error: ', err);
    });
  }

  /**
   * Opens the in app browser and displays the eircode finder website.
   */
  moreInfo(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create("https://finder.eircode.ie/#/", '_self', options);
  }
}