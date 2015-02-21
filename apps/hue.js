module.exports = function(server) {
  var Color = require('color');

  var bulbQuery = server.where({type: 'huebulb'});

  console.log("********in hue app");
  function fade(bulb, color1, color2, duration){
    bulb.call('color', color1, function(){});

    var fadr = {
      hz:500,
      progress:0, 
      steps: 0,
      percent: 0,
      interval: null,
      start: Color(color1).rgbArray(),
      current: Color(color1),
      end: Color(color2).rgbArray(),
      target: bulb,
      duration: duration,
      diff: function(pos){
        return parseInt(fadr.start[pos] + (fadr.end[pos] - fadr.start[pos]) * fadr.percent);
      }
    };
 
    fadr.steps = fadr.duration / fadr.hz;
    fadr.interval = setInterval(function(){
      fadr.current = Color().rgb(fadr.diff(0), fadr.diff(1), fadr.diff(2));
      //console.log(fadr.current.hexString());
      fadr.target.call('color', fadr.current.hexString(), function(){});
      fadr.progress++;
      fadr.percent = fadr.progress / fadr.steps;
      if(fadr.progress > fadr.steps){clearInterval(fadr.interval);}
    }, fadr.hz);

    //console.log(fadr);
  }

  server.observe([bulbQuery], function(bulb){
    if (bulb.bulbName == 'Office'){
      fade(bulb, "green", "violet", 1000 * 10);
    }
    if (bulb.bulbName == 'Couch left'){
      fade(bulb, "green", "purple", 1000 * 10);
    }

    if (bulb.bulbName == 'Bike light'){
      fade(bulb, "green", "lavender", 1000 * 10);
    }
  }); 
};
