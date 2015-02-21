var zetta = require('zetta');
var LEDs = require('../index');

zetta()
  .use(LEDs, 13)
  .listen(1337, function(){
    console.log('Zetta is running at http://127.0.0.1:1337');
  });
