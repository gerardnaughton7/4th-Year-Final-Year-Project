import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class ImagesProvider {
  //apiURL = 'http://localhost:3000/';
  //apiURL = 'http://54.187.101.201:3000/'; //patrick
  apiURL = 'http://52.56.193.204:3000/'; // andrei
  //apiURL = 'http://54.72.69.79:3000/'; //gerard

  data: any;

  constructor(public http: Http, private transfer: FileTransfer) {
    this.data = null;
   }

  getImages() {
    return this.http.get(this.apiURL + 'images').map(res => res.json());
  }

  getImageAdID(adID){

    
    var imgUrl = this.http.get(this.apiURL + 'images/getAdID/' + adID).map(res => res.json());
    return imgUrl;
  }

  deleteImage(img) {
    return this.http.delete(this.apiURL + 'images/' + img._id);
  }

  uploadImage(img, adID) {

    // Destination URL
    let url = this.apiURL + 'images';

    // File for Upload
    var targetPath = img;
    alert("in image provider"+ adID);
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'adID': adID
      }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }

}
