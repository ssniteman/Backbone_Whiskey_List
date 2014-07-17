## Tim's Whiskey APP

This is a simple Backbone JS app for tracking whiskey's that I've tasted vs ones that I want to taste.

----

The implementation of this could be handled a lot better, but this is a simple example of building a Backbone app fairly quickly.

### Usage

1. Clone the repo
2. Run `npm install` & `bower install`
3. Create a file `app/scripts/globals.js` that looks like the following
```js
window.whiskey_url = ''; // Set a URL here where you will push/pull data from
```
4. Run `gulp watch` to load up an instance in your browser
5. Enjoy a glass of your favorite whiskey