import { Camera } from '@ionic-native/camera';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, ModalController } from 'ionic-angular';
import {RoomAd} from '../../providers/roomAd';

@IonicPage()
@Component({
  selector: 'page-create-room-ad',
  templateUrl: 'create-room-ad.html',
})
export class CreateRoomAdPage {

  UID: String;
  AdID: String;
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
  ImageURL: String[]

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, private modalCtrl: ModalController,
              public viewCtrl: ViewController, private actionSheetCtrl: ActionSheetController, private camera: Camera) {
  }

  publishAd() {

    let room = {
      UID: this.UID,
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
      ImageURL: this.ImageURL
    };
    this.roomAdService.createRoom(room);  
    this.navCtrl.setRoot(HomePage);
  }

  getImageURL(){



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
      let modal = this.modalCtrl.create('UploadModalPage', { data: imagePath });
      modal.present();
      
      modal.onDidDismiss(data => {
        alert("TP + Data Returned: " + JSON.stringify(data));
        console.log("TP + Data Returned: " + JSON.stringify(data));
      });

    }, (err) => {
      console.log('Error: ', err);
    });

  }
  
}