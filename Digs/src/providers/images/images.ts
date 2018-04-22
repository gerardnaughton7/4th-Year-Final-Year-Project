import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@Injectable()
export class ImagesProvider {
  //apiURL = 'http://localhost:3000/';
  apiURL = 'http://54.73.1.214:3000/'; //patrick
  //apiURL = 'http://52.56.193.204:3000/'; // andrei
  //apiURL = 'http://54.72.69.79:3000/'; //gerard

  data: any;

  constructor(public http: Http, private transfer: FileTransfer) {
    this.data = null;
  }

  /**
   * Retrieve images from back-end in JSON
   */
  getImages() {
    return this.http.get(this.apiURL + 'images').map(res => res.json());
  }

  /**
   * Retrieve an images ad id from the back-end
   * @param adID 
   */
  getImageAdID(adID){        
    return this.http.get(this.apiURL + 'images/getAdID/' + adID);
  }

  /**
   * Delete an image from back-end using the image id
   * @param img 
   */
  deleteImage(img) {
    return this.http.delete(this.apiURL + 'images/' + img._id);
  }

  /**
   * Upload an image to the back-end
   * @param img 
   * @param adID 
   */
  uploadImage(img, adID) {

    // Destination URL
    let url = this.apiURL + 'images';

    // File for Upload
    var targetPath = img;
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
