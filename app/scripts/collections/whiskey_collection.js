// The collection where I will store all of my whiskey
// More specifically where I will store all of my `new Whiskey()` instances
// Think of this as my liquor cabinet
var WhiskeyCollection = Backbone.Collection.extend ({
  model: Whiskey, // Define the Backbone.Model I want to use
  url: window.whiskey_url || '', // Set my remote URL - This is something you will need to set on your own. ** See note in README
  comparator: 'tried' // What I want to sort my data by
});