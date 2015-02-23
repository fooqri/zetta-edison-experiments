// Require Zetta Drivers
var zettaConfig = require('./zetta_config.js');

var zetta = require('zetta');
var led = require('zetta-led-edison-driver');
var bean = require('zetta-bean-driver');
var Hue = require('zetta-hue-driver');
var Color = require('color');


// Require custom apps
var beanApp = require('./apps/bean');
var ledApp = require('./apps/led');
var hueApp = require('./apps/hue');




// Initialize Zeta and specify drivers and apps to use
zetta()
  .name(zettaConfig.name)
  .use(bean, "Bean")
  .use(led, 13)
  .use(Hue)
  .use(beanApp)
  .use(ledApp)
  .use(hueApp)
  .link(zettaConfig.serverURI)
  .listen(zettaConfig.port, function(){
     console.log('Zetta is running at http://127.0.0.1:1337');
});  


