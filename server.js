var zetta = require('zetta');
var led = require('zetta-led-edison-driver');
var bean = require('zetta-bean-driver');
var Hue = require('zetta-hue-driver');
var Color = require('color');

var beanApp = require('./apps/bean');
var ledApp = require('./apps/led');
var hueApp = require('./apps/hue');


zetta()
  .name('Fooqri-Jones')
  .use(bean, "Bean")
  .use(led, 13)
  .use(Hue)
  .use(beanApp)
  .use(ledApp)
  .use(hueApp)
  .link('http://rwx-zetta.herokuapp.com/')
  .listen(1337, function(){
     console.log('Zetta is running at http://127.0.0.1:1337');
});  


