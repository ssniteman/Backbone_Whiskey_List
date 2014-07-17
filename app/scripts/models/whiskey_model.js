// Defining a Whiskey Model Constructor
// Each whiskey I want to try will be an instance of this constructor
var Whiskey = Backbone.Model.extend({

   // Since we are using Mongo DB, I need to set this
  idAttribute: '_id',

  // My default properties all whiskeys will have
  // I do not NEED to set these, but they help me map it all out
  // I do however want all my whiskeys to be "tried: false" when added
  defaults: {
    name: '',
    description: '',
    tried: false
  }

});