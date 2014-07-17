// Create an instance of my Collection
var whiskey_list = new WhiskeyCollection();

// Grab all my data from my server
// After it's complete, create a new view with data
whiskey_list.fetch().done( function (){
  // Define Global Router && Start History
  window.whiskey_router = new WhiskeyRouter();
  Backbone.history.start();
});


// Submit Form
// Create a new Whiskey and add it to my collection
// Interesting I put this here - http://goo.gl/2RbmvE
// but I did so because it didn't make sense (to me anyway) to have it as a view
$('#newWhiskey').on('submit', function (event) {

  event.preventDefault();

  // Creates an instance (entry in my DB) of a whiskey model
  var temp_whiskey = new Whiskey({
    name: $('.whiskey_title').val(),
    description: $('.whiskey_desc').val()
  });

  // Adds said whiskey to my collection - my liquor cabinet
  whiskey_list.add(temp_whiskey).save();

  // Resets my form - skadoosh
  $(this).trigger('reset');

});