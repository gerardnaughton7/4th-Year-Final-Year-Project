import { CreatePropertyAdPage } from './../create-property-ad/create-property-ad';
import { CreateRoomAdPage } from './../create-room-ad/create-room-ad';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { HomePage } from './../home/home';
import { ImagesProvider } from './../../providers/images/images';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  images: any = [];

  private UID: String;
  private AdID: String;
  private RoomType: String;
  private College: String;
  private Eircode: String;
  private LocationDes: String;
  private Price: any;
  private Availability: any;
  private Email: String;

  public newAd: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagesProvider: ImagesProvider, private camera: Camera, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) {
    this.reloadImages();
  }
  navToCreateRoom(){
    this.navCtrl.setRoot(CreateRoomAdPage);
  }

  navToCreateProperty(){
    this.navCtrl.setRoot(CreatePropertyAdPage);
  }
  uploadImages() {
    
  }

  publishAd() {
    this.navCtrl.setRoot(HomePage);
  }
  reloadImages() {
    this.imagesProvider.getImages().subscribe(data => {
      this.images = data;
    });
  }
 
  deleteImage(img) {
    this.imagesProvider.deleteImage(img).subscribe(data => {
      this.reloadImages();
    });
  }
 
  openImage(img) {
    let modal = this.modalCtrl.create('PreviewModalPage', { img: img });
    modal.present();
  }
 
  presentActionSheet() {
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
 
  public takePicture(sourceType) {
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
        if (data && data.reload) {
          this.reloadImages();
        }
      });
    }, (err) => {
      console.log('Error: ', err);
    });
  }

}
