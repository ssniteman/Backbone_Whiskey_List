// This is a view of all of my whiskeys
// I've decided this will also be my home page, but that is defined in my route
var WhiskeyListView = Backbone.View.extend ({

  el: '.whiskey_list', // the element I will watch for events/actions in

  events: {
    'click .toggle' : 'toggleDrank',
    'click .edit' : 'editDrank'
  },

  initialize: function () {
    this.render(); // This will run the `render` function below
    this.collection.on('change', this.render, this); // This watches my collection for when I add/update a whiskey
  },

  render: function () {
    this.collection.sort(); // This sorts my collection each time it's rendered
    var template = Handlebars.compile($('#whiskey_items').html()); // Grabs my handle bar temlate from my index.html file.
    var rendered = template({ drinks: this.collection.toJSON() }); // Renders out a block of HTML to be used in my code
    this.$el.next().html(''); // Empty's out a container I don't need for this view
    this.$el.html(rendered); // Throws my rendered data into my `el` using jQuery
  },

  toggleDrank: function (event) {
    event.preventDefault(); // Prevents the default click event
    event.stopPropagation(); // Helps stop the bubbling up effect
    var item_clicked = $(event.currentTarget); // Gets the object I clicked
    var drink_id = item_clicked.attr('id'); // Gets the ID of that object
    var drink = this.collection.get(drink_id); // Gets the instance of my model with the ID
    var tried = drink.get('tried'); // Gets the current `tried` value

    // This tests to see if I have already tried my whiskey or not and toggles the property approximately.
    if (tried) {
      drink.set({ tried: false }).save();
    } else {
      drink.set({ tried: true }).save();
    }
  },

  // This happens when I want to edit my whiskey
  editDrank: function (event) {
    event.preventDefault();
    event.stopPropagation();

    // These 2 lines, get my ID and then route to my URL with the ID in it
    // My router then sees that and runs the proper function based on the routes I set up.
    var drink_id = $(event.target).attr('id');
    window.whiskey_router.navigate('#edit/'+drink_id, {trigger: true});
  }

});

