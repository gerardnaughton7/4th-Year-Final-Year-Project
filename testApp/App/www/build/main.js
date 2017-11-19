webpackJsonp([2],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AddReviewPage = (function () {
    function AddReviewPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AddReviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddReviewPage');
    };
    AddReviewPage.prototype.save = function () {
        var review = {
            title: this.title,
            description: this.description,
            rating: this.rating
        };
        this.viewCtrl.dismiss(review);
    };
    ;
    AddReviewPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return AddReviewPage;
}());
AddReviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add-review',template:/*ion-inline-start:"C:\Users\andry\Desktop\4th-Year-Final-Year-Project\testApp\App\src\pages\add-review\add-review.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Add Review</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="close();"><ion-icon name="close"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list no-lines>\n    \n       <ion-item>\n         <ion-label floating>Title</ion-label>\n         <ion-input [(ngModel)]="title" type="text"></ion-input>\n       </ion-item>\n    \n       <ion-item>\n         <ion-label floating>Review</ion-label>\n         <ion-textarea [(ngModel)]="description"></ion-textarea>\n       </ion-item>\n    \n       <ion-item>\n         <ion-range min="0" max="100" pin="true" [(ngModel)]="rating">\n           <ion-icon range-left name="sad"></ion-icon>\n           <ion-icon range-right name="happy"></ion-icon>\n         </ion-range>\n       </ion-item>\n    \n     </ion-list> \n\n     <button ion-button full color="secondary" (click)="save();">Save</button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\andry\Desktop\4th-Year-Final-Year-Project\testApp\App\src\pages\add-review\add-review.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], AddReviewPage);

//# sourceMappingURL=add-review.js.map

/***/ }),

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-review/add-review.module": [
		267,
		1
	],
	"../pages/edit-review/edit-review.module": [
		268,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 151;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__edit_review_edit_review__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_review_add_review__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_reviews_reviews__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(nav, ReviewsProvider, modalCtrl) {
        this.nav = nav;
        this.ReviewsProvider = ReviewsProvider;
        this.modalCtrl = modalCtrl;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.ReviewsProvider.getReviews().then(function (data) {
            console.log("Hello There ion view Did load with the following: " + data);
            _this.reviews = data;
        });
    };
    HomePage.prototype.addReview = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__add_review_add_review__["a" /* AddReviewPage */]);
        modal.onDidDismiss(function (review) {
            if (review) {
                _this.reviews.push(review);
                _this.ReviewsProvider.createReview(review);
            }
        });
        modal.present();
    };
    HomePage.prototype.deleteReview = function (review) {
        //Remove locally
        var index = this.reviews.indexOf(review);
        if (index > -1) {
            this.reviews.splice(index, 1);
        }
        //console.log("Deleting Review with id: " + review._id);
        //Remove from database
        this.ReviewsProvider.deleteReview(review._id);
    };
    HomePage.prototype.updateReview = function (review) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_0__edit_review_edit_review__["a" /* EditReviewPage */]);
        var old_id = review._id;
        console.log("MADE IT BACK!!");
        modal.onDidDismiss(function (review) {
            if (review) {
                review._id = old_id;
                _this.ReviewsProvider.updateReview(review);
                window.location.reload();
            }
        });
        modal.present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\andry\Desktop\4th-Year-Final-Year-Project\testApp\App\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar transparent>\n    <ion-title>\n      Available Accommodations\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addReview()"><ion-icon class="test" name="ios-add-circle-outline"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n \n  <ion-list no-lines>\n    \n       <ion-item-sliding *ngFor="let review of reviews">\n    \n         <ion-item>\n    \n           <ion-img width="200" height="200" item-left src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkryA5wR6mdMpRhf6upmgSlxfig_n7jzor-uol9tO6y9fd5hyv"></ion-img>\n    \n           <h2>{{review.title}}</h2>\n           <p>{{review.description}}</p>\n    \n           <ion-icon *ngIf="review.rating < 50" danger name="sad"></ion-icon>\n           <ion-icon *ngIf="review.rating >= 50" secondary name="happy"></ion-icon>\n           {{review.rating}}\n    \n         </ion-item>\n    \n         <ion-item-options side="left">\n           <button ion-button color="danger" (click)="deleteReview(review)">\n             <ion-icon name="trash" ></ion-icon>\n             Delete\n           </button>\n         </ion-item-options>\n         <ion-item-options side="right">\n          <button ion-button (click)="updateReview(review);">\n            <ion-icon name="create"></ion-icon>\n            Edit\n          </button>\n         </ion-item-options>\n       </ion-item-sliding>\n    \n     </ion-list>\n    \n</ion-content>\n'/*ion-inline-end:"C:\Users\andry\Desktop\4th-Year-Final-Year-Project\testApp\App\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_reviews_reviews__["a" /* ReviewsProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* ModalController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReviewsProvider = (function () {
    function ReviewsProvider(http) {
        this.http = http;
        console.log('Hello ReviewsProvider Provider');
        this.data = null;
    }
    ReviewsProvider.prototype.getReviews = function () {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.http.get('http://localhost:8080/api/reviews/')
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    }; //getReviews()
    ReviewsProvider.prototype.createReview = function (review) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:8080/api/reviews/', JSON.stringify(review), { headers: headers })
            .subscribe(function (res) {
            console.log(res.json());
        });
    }; //createReview()
    ReviewsProvider.prototype.deleteReview = function (id) {
        this.http.delete('http://localhost:8080/api/reviews/' + id).subscribe(function (res) {
            console.log(res.json());
        });
    }; //deleteReview()
    ReviewsProvider.prototype.updateReview = function (review) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        console.log("Review ID: " + review._id);
        console.log("Review Description: " + review.description);
        console.log(JSON.stringify(review));
        this.http.put('http://localhost:8080/api/reviews/', JSON.stringify(review), { headers: headers })
            .subscribe(function (res) {
            console.log("Response From Server: " + res.json());
        });
    };
    return ReviewsProvider;
}());
ReviewsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], ReviewsProvider);

//# sourceMappingURL=reviews.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(217);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_edit_review_edit_review__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_add_review_add_review__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_reviews_reviews__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_add_review_add_review__["a" /* AddReviewPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_edit_review_edit_review__["a" /* EditReviewPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/add-review/add-review.module#AddReviewPageModule', name: 'AddReviewPage', segment: 'add-review', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/edit-review/edit-review.module#EditReviewPageModule', name: 'EditReviewPage', segment: 'edit-review', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_add_review_add_review__["a" /* AddReviewPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_edit_review_edit_review__["a" /* EditReviewPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_9__providers_reviews_reviews__["a" /* ReviewsProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\andry\Desktop\4th-Year-Final-Year-Project\testApp\App\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\andry\Desktop\4th-Year-Final-Year-Project\testApp\App\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EditReviewPage = (function () {
    function EditReviewPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    EditReviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditReviewPage');
    };
    EditReviewPage.prototype.save = function () {
        var review = {
            title: this.title,
            description: this.description,
            rating: this.rating
        };
        this.viewCtrl.dismiss(review);
    };
    ;
    EditReviewPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return EditReviewPage;
}());
EditReviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-review',template:/*ion-inline-start:"C:\Users\andry\Desktop\4th-Year-Final-Year-Project\testApp\App\src\pages\edit-review\edit-review.html"*/'<ion-header>\n  \n    <ion-navbar>\n      <ion-title>Edit Review</ion-title>\n      <ion-buttons end>\n        <button ion-button icon-only (click)="close();"><ion-icon name="close"></ion-icon></button>\n      </ion-buttons>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding>\n    <ion-list no-lines>\n      \n         <ion-item>\n           <ion-label floating>Title</ion-label>\n           <ion-input [(ngModel)]="title" type="text"></ion-input>\n         </ion-item>\n      \n         <ion-item>\n           <ion-label floating>Review</ion-label>\n           <ion-textarea [(ngModel)]="description"></ion-textarea>\n         </ion-item>\n      \n         <ion-item>\n           <ion-range min="0" max="100" pin="true" [(ngModel)]="rating">\n             <ion-icon range-left name="sad"></ion-icon>\n             <ion-icon range-right name="happy"></ion-icon>\n           </ion-range>\n         </ion-item>\n      \n       </ion-list> \n  \n       <button ion-button full color="secondary" (click)="save();">Save</button>\n  </ion-content>\n'/*ion-inline-end:"C:\Users\andry\Desktop\4th-Year-Final-Year-Project\testApp\App\src\pages\edit-review\edit-review.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], EditReviewPage);

//# sourceMappingURL=edit-review.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map