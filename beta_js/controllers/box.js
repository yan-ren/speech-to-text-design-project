/* global app, database */

// Notice ':id' in the route definition? This means that when the user visits the url /box/1, /box/2, /box/3 etc...
// That the number after /box/... will be available to us as 'request.params.id'
// Any word that follows the colon can be made available using this technique

app.get(  '/box/:id', function( request, response ) {
  
  var id = request.params.id;
  
  // Here we check to see if ?booked=true or ?reviewed=true were added to the URL
  // This will be used to know whether or not the user has just booked or reviewed a box.
  
  var booked   = request.query.booked   === 'true';
  var reviewed = request.query.reviewed === 'true';
  
  // If the user has either just booked or reviewed a box, we prepare a message for them
  var booking_message = booked   && 'Thank you for booking with us. Your host will contact you shortly for confirmation.';
  var review_message  = reviewed && 'Thanks for your review!';
  
  // Using the id we took from params, we select corresponding listing from the database
  var listing = database.listings[ id ];
  
  // Now we respond to the request by sending the 'box' view, to which we pass all the data we've collected
  response.render( 'box', {
    listing         : listing,
    booked          : booked,
    reviewed        : reviewed,
    booking_message : booking_message,
    review_message  : review_message,
  });
})

// The following is our first POST request.
// POST requests are good at carrying additional data, such as form data
// In the 'box' view, there is a form which contains a 'start' and 'end' dates used to make a reservation

app.post( '/box/:id', function( request, response ) {
  var id    = request.params.id;
  // The form data is accessed using the following line.
  // We assign the variable the name 'booking' as that is what is being submitted
  var form  = request.body;
  // Here we extract the start and end dates from the form.
  var start = form.start;
  var end   = form.end;
  
  // In a real application, you would now send a confirmation email.
  // You would also give the user the option to pay
  // and indicate these days as no longer available to other users
  
  // Now we redirect the user to '/box/:id', and add ?booked=true to the end
  response.redirect( '/box/' + id + '?booked=true' )
})


// As a challenge, modify the following route to accept a new parameter called name
// Then modify the function to say hello to the provided name

// Then, modify the function to accept a query parameter which can modify the message
// For example, it could say 'Goodbye Lawrence' when you set ?bye=true

app.get( '/challenge', function( request, response ) {
  var name = 'friend';
  response.send('Hi ' + name + '!')
})