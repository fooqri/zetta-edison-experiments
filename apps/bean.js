
module.exports = function(server) {
  var beanQuery = server.where({ type: 'ble-bean' });
  server.observe([beanQuery], function(bean){
    console.log("*** Observerd");
    bean.on("connect", function(m){
      bean.setColor("#004300", function(){
        console.log("****set color");
        setInterval(function(){
          console.log("Temperature: ", Math.floor(bean.temperature*1.8+32));
          console.log("ax: ", bean.accelerationX,"ay: ", bean.accelerationY, "az: ", bean.accelerationZ);
        } , 1000);
      });
    });
  });
};



