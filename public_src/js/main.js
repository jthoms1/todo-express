var Backbone = require('backbone'),
  AppView = require('views/app'),
  Workspace = require('routers/router');

"use strict";

// Initialize routing and start Backbone.history()
var workspace = new Workspace();
Backbone.history.start();

// Initialize the application view
var appView = new AppView();