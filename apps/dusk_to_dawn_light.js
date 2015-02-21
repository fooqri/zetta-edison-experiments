module.exports = function(server) {
  var photocellQuery = server.where({ type: 'photocell' });
  var ledQuery = server.where({ type: 'led' });
  var eledQuery = server.where({ type: 'eled' });
  var beanQuery = server.where({ type: 'bean' });
  
  console.log('before  observer');
  
  server.observe([beanQuery, eledQuery, photocellQuery, ledQuery], function(bean, eled, photocell, led){
  //server.observe([eledQuery, photocellQuery, ledQuery], function(eled, photocell, led){

    console.log('in observer');
    if (eled.available('turn-on-pulse')) {
      console.log("in eled");
      eled.call('turn-on-pulse');
    }
    
    //if (bean.available('startMonitors')){
      console.log("in bean.available");
      bean.startMonitors(function(err) {
        if (err)
          console.log('ERROR: ', err);
        else
          console.log("Connected: ");
      });
    //}
    

    photocell.streams.intensity.on('data', function(m) {
      if(m.data < 0.5) {
        if (led.available('turn-on')) {
          led.call('turn-on');
        }
      } else {
        if (led.available('turn-off')) {
          led.call('turn-off');
       }
     }
   });
  });
  console.log('after  observer');
};

