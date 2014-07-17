var Whiskey = Backbone.Model.extend({

  idAttribute: '_id',

  defaults: {
    name: '',
    description: '',
    tried: false
  }

});

var WhiskeyCollection = Backbone.Collection.extend ({
  model: Whiskey,
  url: 'http://tiy-atl-fe-server.herokuapp.com/collections/whiskeyapp',
  comparator: 'tried'
});
var WhiskeyListView = Backbone.View.extend ({

  el: '.whiskey_list',

  events: {
    'click .toggle' : 'toggleDrank',
    'click .edit' : 'editDrank'
  },

  initialize: function () {
    this.render();
    this.collection.on('change', this.render, this);
  },

  render: function () {
    this.collection.sort();
    var template = Handlebars.compile($('#whiskey_items').html());
    var rendered = template({ drinks: this.collection.toJSON() });
    this.$el.next().html('');
    this.$el.html(rendered);
  },

  toggleDrank: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var item_clicked = $(event.currentTarget);
    var drink_id = item_clicked.attr('id');
    var drink = this.collection.get(drink_id);
    var tried = drink.get('tried');

    if (tried) {
      drink.set({ tried: false }).save();
    } else {
      drink.set({ tried: true }).save();
    }
  },

  editDrank: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var drink_id = $(event.target).attr('id');
    window.whiskey_router.navigate('#edit/'+drink_id, {trigger: true});
  }

});


var WhiskeyEditView = Backbone.View.extend({

  el: '.whiskey_edit',

  events: {
    'submit #updateForm' : 'updateWhiskey',
    'click .delete' : 'deleteWhiskey'
  },

  initialize: function (attrs) {
    this.options = attrs;
    this.render();
  },

  render: function (options) {
    var single = this.collection.get(this.options.postid);
    var template = Handlebars.compile($('#whiskey_single').html());
    var rendered = template(single.toJSON());
    this.$el.prev().html('');
    this.$el.html(rendered);
  },

  updateWhiskey: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var editable = this.collection.get($('.whiskey_id').val());
    editable.set({
      name: $('.edit_whiskey_name').val(),
      description: $('.edit_whiskey_desc').val()
    });
    editable.save();
    window.whiskey_router.navigate("", { trigger: true });
  },

  deleteWhiskey: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure?")) {
      console.log('delete pressed');
      var editable = this.collection.get($('.whiskey_id').val());
      editable.destroy({success: function () {
        window.whiskey_router.navigate("", { trigger: true });
      }});
    }
  }

});
var WhiskeyRouter = Backbone.Router.extend({

  routes: {
    '' : 'home',
    'edit/:id' : 'edit',
    'sayhi/:text' : 'hi'
  },

  home: function () {
    new WhiskeyListView({ collection: whiskey_list });
  },

  edit: function (id) {
    new WhiskeyEditView({ postid: id, collection: whiskey_list });
  },

  hi: function (text) {
    alert('Hello ' + text);
  }

});
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
$('#newWhiskey').on('submit', function (event) {

  event.preventDefault();

  var temp_whiskey = new Whiskey({
    name: $('.whiskey_title').val(),
    description: $('.whiskey_desc').val()
  });

  whiskey_list.add(temp_whiskey).save();

  $(this).trigger('reset');

});