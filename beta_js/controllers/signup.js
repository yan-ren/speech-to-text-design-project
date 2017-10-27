/* global app, database */

// This is the page for adding new boxes to the database.
// It uses some plugins for reading and writing to the filesystem
// It also uses a special plugin for accepting image uploads in the submitted form

var fs       = require('fs');
var multer   = require('multer');
var upload   = multer({ dest: 'public/images' });
var insane   = require('insane')

app.get(  '/signup', function( request, response ) {
  response.render( 'signup' );
})

app.post( '/signup', upload.single('image'), function (request, response) {  
  
  // request.body will have the information the user posted (name, description, price, etc.)
  var form = request.body;

  // request.file has information about the image the user uploaded.
  if ( request.file ) {
    var imageName = request.file.path + '-' + request.file.originalname;
    fs.rename(request.file.path, imageName);
    form.image   = imageName.substring('public'.length);   // save the image path in our database (and remove 'public' from the beginning of the path)
  }

  form.id       =  database.listings.length;               // assign this listing a unique id
  form.price    =  +form.price;                            // convert the price from a string to a number
  form.reviews  =  [];                                     // initially, no reviews for this listing
  form.description = insane( form.description, {           // We use the library 'insane' to sanitize the description and remove unwanted html tags
    allowedTages: [ 'br' ]
  })

  database.listings.push( form );

  response.redirect( '/box/' + form.id );
});