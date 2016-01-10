//var spark = Meteor.npmRequire('spark');
var future = new (Npm.require('fibers/future'))();



  var sp = Meteor.npmRequire('sparknode');




if (Meteor.isServer) {

//var spark = Meteor.npmRequire('sparknode');
//var core =    new spark.Core({accessToken:'d12e23f44cbb73dbb07b7e3f97e0f611d4d67334',id:'40003c000c47343432313031'});
//var coreWeight = new spark.Core({accessToken:'d12e23f44cbb73dbb07b7e3f97e0f611d4d67334',id:'29003f001747343338333633'});

  var collection = new sp.Collection('29003f001747343338333633');



    collection(function(err, value) {
    //Do something with value 
    if(!err){
          console.log("getting value...",value);

    }else{
      console.log(err);
    }
  });







/*

    // signs in and lists devices on startup...
    var promise = new.Promise(function(resolve,reject){
          login();
          if(!err){
            resolve("all okay!");
          }else{
            reject("uhoh");
          }

    });


    promise.then(function(){
        console.log("called listDevices()");      
        listDevices();
      }).then(function(){
        console.log("called getDevices()");        
        getDevices();
      }).finally(function(){
        console.log("called getWeight()");                
        getWeight();
      }).catch(console.log("arg"));



  });


function login(){
 spark.login({accessToken: 'd12e23f44cbb73dbb07b7e3f97e0f611d4d67334'})
  .then( function(token) {
    console.log('Logged into Spark:', token);
    return token
  })
  .catch( 
    function(err) {
      console.error('Login to Spark failed:', err);
  });
}



function listDevices(){
  spark.listDevices()
    .then(function(devices){
        console.log('Devices: '); //, devices

      })
    .catch(
      function(err) {
        console.log('List devices call failed: ', err);
      });
}


function getDevices(){
    spark.getDevice('29003f001747343338333633')
    .then(function(data,err) {
        device1 = data;
        console.log('Got device name: ' + data.name);

    })
    .catch(
      function(err){
        console.log("Something bad has happened when getting device: ", err); 
      });
}

function getWeight(){
    console.log('getting weight...');
}





*/



//On device 
/*    




spark.getVariable('29003f001747343338333633', 'weight').then(
  function(data){
    console.log(data);
  },
  function(err){
    console.log(err);
  });

*/


//change to a collection??


/*
INITIAL WORKFLOW:

SETUP MODE:
1. button to enter setup mode
2. if setup mode:
3. ask to put empty bowl on scale, then click tare to zero

FILL BOWL OPERATION:
1. Click app button to fill bowl
2. Check If reading =0, if not, then a tare is needed (see above) 
3. If reading = 0, then feed back grams until goal is reached (goal stored in weightDB)

FOOD MONITORING OPERATION:
1.  take a set of measures every 5 seconds (prob too often)
2.  disregard any readings that are similar +- a number...




coreScale.weight.autoupdate = true; //can also be set to time in MS
 
//Do something on update 
coreScale.weight.on('update', Meteor.bindEnvironment(function handler(value) {
  console.log(value);
  
//SETUP
Meteor.methods({
  'tare': function(){
  coreScale.doFunction('tare', function(err, data) {
    //Do something - or not?
  });
  },

  'fillBowl': function(){
  if(step == 0){
    return("take bowl off pad..");
    if(weight <10){
    return("place bowl onto pad...");
    }
    if(weight>100){
    return("accounting for bowl weight..");
    
    }
    
  }



  });


  }



});


coreWeight.on('weight', function(info) { //note that this is for a 'publish..'
  console.log(info);
  console.log(info.data);
  //send an email with the number of cups remaining. 
});

  weightDB.insert({
    

  })






  console.log(core.weight.value);
}));
 
//Stop update with any falsy value. 
coreScale.weight.autoupdate = false;
 
*/






//FLAP BELOW

//CORE EVENT SYNTAX: core.on(eventName, function handler(eventData) {/*do something;*/});
//Watches for an event, logs numerically into database. Wraps as an Async function.



}
