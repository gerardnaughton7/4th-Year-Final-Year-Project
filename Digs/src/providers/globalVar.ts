import {Injectable} from '@angular/core';
//create global variable so that we know if user is logged in
@Injectable()
export class globalVar  {
    UID : string;

    constructor() {
        this.UID = "";
    }

    setLoginUser(value) {
    this.UID = value;
    }

    getLoginUser() {
    return this.UID;
    }

};