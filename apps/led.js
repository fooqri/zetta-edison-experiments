module.exports = function(server) {
  var ledQuery = server.where({ type: 'led' });

  server.observe([ledQuery], function(led){
    if (led.available('turn-on-pulse')) {
      led.call('turn-on-pulse');
    }
  });
};

