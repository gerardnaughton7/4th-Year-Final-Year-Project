import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class ImagesProvider {
  //apiURL = 'http://localhost:3000/';
  apiURL = 'http://54.187.101.201:3000/'; //patrick
  //apiURL = 'http://52.56.193.204:3000/'; // andrei


  constructor(public http: Http, private transfer: FileTransfer) { }

  getImages() {
    return this.http.get(this.apiURL + 'images').map(res => res.json());
  }

  getImageId(img){
    return this.http.get(this.apiURL + 'images/' + img._id);
  }

  deleteImage(img) {
    return this.http.delete(this.apiURL + 'images/' + img._id);
  }

  uploadImage(img) {

    // Destination URL
    let url = this.apiURL + 'images';

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    console.log("In Provider: About to call upload()");
    return fileTransfer.upload(targetPath, url, options);
  }

}
