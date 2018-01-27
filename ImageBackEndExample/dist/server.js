"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
// Generell properties
exports.UPLOAD_PATH = 'uploads';
exports.PORT = 3000;
// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, exports.UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
exports.upload = multer({ storage: storage });
// Initialise App
exports.app = express();
exports.app.use(cors());
// Load our routes
var routes = require('./routes');
// Setup Database
let uri = 'mongodb://localhost/imageupload';
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to MongoDb');
    }
});
// App startup
exports.app.listen(exports.PORT, function () {
    console.log('listening on port: ' + exports.PORT);
});
//# sourceMappingURL=server.js.map