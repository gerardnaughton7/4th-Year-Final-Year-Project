import { RoomAd } from './../../providers/roomAd';
import { Camera } from '@ionic-native/camera';
import { ImagesProvider } from './../../providers/images/images';
import { Md5 } from 'ts-md5/dist/md5';
import { PropertyAd } from './../../providers/propertyAd';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ActionSheetController, ModalController  } from 'ionic-angular';
/**
 * Generated class for the CreatePropertyAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-property-ad',
  templateUrl: 'create-property-ad.html',
})
export class CreatePropertyAdPage {
 
  time: any = new String(new Date());
  
  UID: String;
  AdID: any = Md5.hashStr(this.time);
  PropertyType: String;
  SingleBeds: any;
  DoubleBeds: any;
  TwinBeds: any;
  EnSuite: any;
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

  constructor(public navCtrl: NavController,public propertyAdService: PropertyAd, public navParams: NavParams, private modalCtrl: ModalController,
    public viewCtrl: ViewController, private actionSheetCtrl: ActionSheetController,private imagesProvider: ImagesProvider, 
    private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePropertyAdPage');
  }

  publishAd() {

    this.imagesProvider.getImageAdID(this.AdID).map(res => res.json()).subscribe(data => {
      alert('My Data: ' + data + " And Data is a: " + typeof(data));

    let room = {
      UID: this.UID,
      AdID: this.AdID,
      PropertyType: this.PropertyType,
      SingleBeds: this.SingleBeds,
      DoubleBeds: this.DoubleBeds,
      TwinBeds: this.TwinBeds,
      EnSuite: this.EnSuite,
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
    this.propertyAdService.createProperty(room);  
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
