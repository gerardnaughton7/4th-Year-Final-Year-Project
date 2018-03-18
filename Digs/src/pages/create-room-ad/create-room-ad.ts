import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { ListOfRoomsPage } from './../list-of-rooms/list-of-rooms';
import { ImagesProvider } from './../../providers/images/images';
import { Camera } from '@ionic-native/camera';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, ModalController } from 'ionic-angular';
import {RoomAd} from '../../providers/roomAd';
import {Md5} from 'ts-md5/dist/md5';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

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
    this.storage.get('email').then((val) => {
      this.email = val;
    });
    
  }

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
        Phone: this.Phone,
        Contact: this.Contact,
        Description: this.Description,
        Parking: this.Parking,
        ImageURL: data,
        Date: new Date()
      };
      
      this.roomAdService.createRoom(room);  
      this.navCtrl.setRoot(ListOfRoomsPage);
    });
  }

  uploadOption() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
    this.imageButton = "Add Another Image";
  }

  takePicture(sourceType){
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      let modal = this.modalCtrl.create('UploadModalPage', { data: imagePath, adID: this.AdID });
      modal.present();
      
      modal.onDidDismiss(data => {
        console.log("TP + Data Returned: " + JSON.stringify(data));
      });

    }, (err) => {
      console.log('Error: ', err);
    });
  }

  moreInfo(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create("https://finder.eircode.ie/#/", '_self', options);
  }
}