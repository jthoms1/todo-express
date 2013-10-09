var Backbone = require('backbone'),
  AppView = require('views/app'),
  Workspace = require('routers/router');

"use strict";

// Initialize routing and start Backbone.history()
window.workspace = new Workspace();
Backbone.history.start();

// Initialize the application view
window.appView = new AppView();