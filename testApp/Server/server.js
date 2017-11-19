// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
 
// Configuration
mongoose.connect('mongodb://localhost/reviewking');
//mongoose.connect('mongodb://52.25.228.105/reviewking');
//mongoose.connect('mongodb://52.56.193.204/reviewking');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var Review = mongoose.model('Review', {
    title: String,
    description: String,
    rating: Number
});
 
// Routes
 
    // Get reviews
    app.get('/api/reviews', function(req, res) {
 
        console.log("fetching reviews");
 
        // use mongoose to get all reviews in the database
        Review.find(function(err, reviews) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(reviews); // return all reviews in JSON format
        });
    });
 
    // create review and send back all reviews after creation
    app.post('/api/reviews', function(req, res) {
 
		console.log("creating review with ID: " + req.params.review_id);
        // create a review, information comes from request from Ionic
        Review.create({
            title : req.body.title,
            description : req.body.description,
            rating: req.body.rating,
            done : false
        }, function(err, review) {
            if (err)
                res.send(err);
 
            // get and return all the reviews after you create another
            Review.find(function(err, reviews) {
                if (err)
                    res.send(err)
                res.json(reviews);
            });
        });
 
    });
 
    // delete a review
    app.delete('/api/reviews/:review_id', function(req, res) {
		console.log("removing review with ID: " + req.params.review_id);
        Review.remove({
            _id : req.params.review_id
        }, function(err, review) {
 
        });
    });
	
	// update a review or edit a review
	app.put('/api/reviews/', function(req, res) {
		console.log("Updating a Review using My own Function");
		
		console.log(req.body._id);
		console.log(req.body.description);
		
		Review.update({_id:req.body._id}, { $set : {title:req.body.title, description:req.body.description, rating:req.body.rating} }, function(err, review) {
			if (err)
				res.send(err)
						
			// get and return all the reviews after you create another
            Review.find(function(err, reviews) {
                if (err)
                    res.send(err)
					
                res.json(reviews);
				
            });
		});	
		
	});
		
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");