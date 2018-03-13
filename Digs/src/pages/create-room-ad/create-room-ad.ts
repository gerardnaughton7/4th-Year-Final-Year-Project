import { ImagesProvider } from './../../providers/images/images';
import { Camera } from '@ionic-native/camera';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController, ModalController } from 'ionic-angular';
import {RoomAd} from '../../providers/roomAd';
import {Md5} from 'ts-md5/dist/md5';


@IonicPage()
@Component({
  selector: 'page-create-room-ad',
  templateUrl: 'create-room-ad.html',
})
export class CreateRoomAdPage {

  time: any = new String(new Date());
  
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

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, private modalCtrl: ModalController,
              public viewCtrl: ViewController, private actionSheetCtrl: ActionSheetController,private imagesProvider: ImagesProvider, 
              private camera: Camera) {
                
  }

  publishAd() {

    this.imagesProvider.getImageAdID(this.AdID)
    .map(res => res.json())
    .subscribe(data => {
      
      alert('My Data: ' + data + " And Data is a: " + typeof(data));

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
        ImageURL: data
      };

      alert("Room Made with image url: " + room.ImageURL + " And AdID is: " + room.AdID + " And Price: " + room.Price);
      
      this.roomAdService.createRoom(room);  
      this.navCtrl.setRoot(HomePage);
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
  
}