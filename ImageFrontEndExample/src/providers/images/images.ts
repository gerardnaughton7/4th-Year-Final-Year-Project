import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions,  FileTransferObject } from '@ionic-native/file-transfer';
 
@Injectable()
export class ImagesProvider {
  //apiURL = 'http://localhost:3000/';
  apiURL = 'http://54.187.101.201:3000/';
 
  constructor(public http: Http, private transfer: FileTransfer) { }
 
  getImages() {
    return this.http.get(this.apiURL + 'images').map(res => res.json());
  }
 
  deleteImage(img) {
    return this.http.delete(this.apiURL + 'images/' + img._id);
  }
 
  uploadImage(img, desc) {
 
    // Destination URL
    let url = this.apiURL + 'images/';
 
    // File for Upload
    var targetPath = img;
 
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 'desc': desc },
    };

 
    const fileTransfer: FileTransferObject = this.transfer.create();

 
    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options).then(res => {
      

    }).catch(err => {
      console.log("Error At Final Step!!!" + JSON.stringify(err));
    });
  }
 
}