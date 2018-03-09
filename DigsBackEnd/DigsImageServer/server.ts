import * as express from 'express';
import * as multer from 'multer'
import * as cors from 'cors'
import * as mongoose from 'mongoose'

// Generell properties
export let UPLOAD_PATH = 'image-uploads'
export let PORT = 3000;

// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

export let upload = multer({ storage: storage })

// Initialise App
export const app = express();
app.use(cors());

// Load our routes
var routes = require('./routes');

// Setup Database
let uri = 'mongodb://localhost/imageupload';
//let uri = 'mongodb://54.186.14.212/imageupload';

//Connect to mongo using mongoose object model
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDb');
    }
});

// Start the App
app.listen(PORT, function () {
    console.log('App listening on port: ' + PORT);
});

