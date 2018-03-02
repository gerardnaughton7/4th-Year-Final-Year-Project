import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class ImagesProvider {
  //apiURL = 'http://localhost:3000/';
  //  apiURL = 'http://54.187.101.201:3000/'; //patrick
  apiURL = 'http://52.56.193.204:3000/'; // andrei


  constructor(public http: Http, private transfer: FileTransfer) { }

  getImages() {
    return this.http.get(this.apiURL + 'images').map(res => res.json());
  }

  deleteImage(img) {
    return this.http.delete(this.apiURL + 'images/' + img._id);
  }

  uploadImage(img, desc, roomType, college, eircode, location, price, availabilty, email, phone, howContact, parking) {

    // Destination URL
    let url = this.apiURL + 'images';

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {
        'desc': desc, 'roomType': roomType, 'college': college, 'eircode': eircode, 'location': location,
        'price': price, 'availabilty': availabilty, 'email': email, 'phone': phone, 'howContact': howContact, 'parking': parking
      }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }

}
