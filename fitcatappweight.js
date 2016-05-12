weightDB = new Mongo.Collection('WeightDB');
keyStatsDB = new Mongo.Collection('keyStatsDB');
notifications = new Mongo.Collection('Notifications');

var weightyID = '29003f001747343338333633'; // = devices[1]
var flapID = '40003c000c47343432313031'; // = devices[0] when using RF, should be able to get this using listDevices...



if (Meteor.isServer) {
  Meteor.startup(function () {
        notifications.insert({ update : "" });

      weightDB.remove({});
      weightDB.insert({ createdAt: new Date(2016, 1, 1, 7, 0, 0, 0), foodWeight: 100, catWeight: 10000 });
      weightDB.insert({ createdAt: new Date(2016, 1, 1, 9, 0, 0, 0), foodWeight: 50, catWeight: 10000 });
      weightDB.insert({ createdAt: new Date(2016, 1, 1, 13, 0, 0, 0), foodWeight: 0, catWeight: 5000 });
      weightDB.insert({ createdAt: new Date(2016, 1, 2, 13, 0, 0, 0), foodWeight: 0, catWeight: 5000 });
      weightDB.insert({ createdAt: new Date(2016, 1, 2, 11, 0, 0, 0), foodWeight: 0, catWeight: 10000 });
     
  });




var spark = Meteor.npmRequire('spark');

Meteor.publish('weightDB',function(){
  return weightDB.find();
});

Meteor.publish('keyStatsDB',function(){
  return keyStatsDB.find();
});

Meteor.publish('notifications',function(){
  return notifications.find();
});
//each one of these is the start of a period...
var nowDate = moment({hour: 0})._d; 
var dateWeekBegin= moment({hour: 0,minute:0}).subtract(7,'days')._d; 
var dateMonthBegin = moment({hour: 0,minute:0}).subtract(31,'days')._d; //month doesnt work??

console.log("nowDate: ", nowDate);
console.log("dateWeekBegin: ", dateWeekBegin);
console.log("dateMonthBegin: ", dateMonthBegin);

var dailyAverageCatWeight = [
      { "$match" : { 'createdAt': { '$gt': nowDate } } },
      {"$group": { "_id": {"day": { "$dayOfWeek": "$createdAt" }}, "catWeightAverage" : { "$avg": "$catWeight"}}}
]; 

var weeklyAverageCatWeight = [
      { "$match" : { 'createdAt': { '$gt': dateWeekBegin } } },
      {"$group": { "_id": { "$dayOfWeek": "$createdAt" }, "catWeightAverage" : { "$avg": "$catWeight"}}} 
]; 

var monthlyAverageCatWeight = [
      { "$match" : { 'createdAt': { '$gt': dateMonthBegin } } },
      {"$group": { "_id": { "$dayOfMonth": "$createdAt" }, "catWeightAverage" : { "$avg": "$catWeight"}}}
]; 

var dailyAverageCatWeightResult = weightDB.aggregate(dailyAverageCatWeight);
var weeklyAverageCatWeightResult = weightDB.aggregate(weeklyAverageCatWeight);
var monthlyAverageCatWeightResult = weightDB.aggregate(monthlyAverageCatWeight);

console.log("dailyAverageCatWeightResult: ", dailyAverageCatWeightResult);
console.log("weeklyAverageCatWeightResult: ", weeklyAverageCatWeightResult); //this one
console.log("monthlyAverageCatWeightResult: ", monthlyAverageCatWeightResult);

  console.log("XX Weekday: ", weeklyAverageCatWeightResult[i]._id);
  console.log("XX Weight Avg: ", weeklyAverageCatWeightResult[i].avg);

  //add into an araay [a,b,c]
  keyStatsDB.insert({
  createdAt: new Date(),
  weeklyAverageCatWeightResultArrayDay: weeklyAverageCatWeightResultArrayDay,
  weeklyAverageCatWeightResultArrayAverage: weeklyAverageCatWeightResultArrayAverage,
  //dailyAverageCatWeightResult: dailyAverageCatWeightResult,
  //weeklyAverageCatWeightResult: weeklyAverageCatWeightResult,
  //monthlyAverageCatWeightResult: monthlyAverageCatWeightResult

  });




}

for(i=0; i<monthlyAverageCatWeightResult.length; i++){
  console.log("XX Monthday: ", monthlyAverageCatWeightResult[i]._id);
  console.log("XX Weight Avg: ", monthlyAverageCatWeightResult[i].avg);  

    //add into an araay [a,b,c]

}


keyStatsDB.insert({
  createdAt: new Date(),
  dailyAverageCatWeightResult: [dailyAverageCatWeightResult],
  weeklyAverageCatWeightResult: [weeklyAverageCatWeightResult],
  monthlyAverageCatWeightResult: [monthlyAverageCatWeightResult]

});



//****************************


var dailyMaxFeedWeight = [ //tells you how total food weight cat has been fed today. Pre-filtered
      { "$match" : { 'createdAt': { '$gt': nowDate } } },
      {"$group": { "_id": {"day": { "$dayOfWeek": "$createdAt" }}, "max" : { "$max": "$foodWeight"}}}
]; 

var weeklyMaxFeedWeight = [ //tells you how total food weight cat has been fed in the last week, by day.  
      { "$match" : { 'createdAt': { '$gt': dateWeekBegin } } },
      {"$group": { "_id": null, "max" : { "$max": "$foodWeight"}}} 
]; 

var monthlyMaxFeedWeight = [ //tells you how total food weight cat has been fed in the last month, by day.  
      { "$match" : { 'createdAt': { '$gt': dateMonthBegin } } },
      {"$group": { "_id": {"day": { "$dayOfWeek": "$createdAt" }}, "max" : { "$max": "$foodWeight"}}}
]; 


var dailyMaxFeedWeightResult = weightDB.aggregate(dailyMaxFeedWeight);
var weeklyMaxFeedWeightResult = weightDB.aggregate(weeklyMaxFeedWeight);
var monthlyMaxFeedWeightResult = weightDB.aggregate(monthlyMaxFeedWeight);

console.log("dailyMaxFeedWeightResult: ", dailyMaxFeedWeightResult[0]);
console.log("weeklyMaxFeedWeightResult: ", weeklyMaxFeedWeightResult[0]);
console.log("monthlyMaxFeedWeightResult: ", monthlyMaxFeedWeightResult[0]);













Meteor.methods({
        'tareFood': function(){
            console.log("called tare function");
            coreWeight.callFunction('tareFunction','tareFood')
            .then(function(data){
                console.log("Success calling tare function", data);
            })
            .catch(function(err){
                console.log("An error when calling the tare function: ", err);
            });
      },

        'tareCat': function(){
            console.log("called tare function");
            coreWeight.callFunction('tareFunction','tareCat')
            .then(function(data){
                console.log("Success calling tare function", data);
            })
            .catch(function(err){
                console.log("An error when calling the tare function: ", err);
            });
      },      

        'callOpenStream':function(token){
            wrapOpenStream(token);
        }
});


//Opens a stream to collect all variables
 var openStream = function() {
    console.log("Waiting on foodWeight openStream");
    //Get your event stream
    var req = spark.getEventStream('wgtStr', '29003f001747343338333633', 
    Meteor.bindEnvironment(function(data) { //error, data, response 
      var parsedData = JSON.parse(data.data);
       //var jsonData = JSON.parse(parsedData.data);
      //seems to log whether data or not....

       //event name, coreID, Callback
            //add into weightDB database...  
                weightDB.insert({
                createdAt: new Date(),
                foodWeight: parsedData.foodWeight, //data.foodWeight
                catWeight: parsedData.catWeight
              });
              console.log("Updated weights:")
              console.log('foodWeight: ', parsedData.foodWeight, " g");
              console.log('catWeight: ', parsedData.catWeight, " g");

            }));

    req.on('end', function() {
        console.log("weightstream ended!  re-opening in 3 seconds...");
        setTimeout(openStream, 3 * 1000);
    });

  var notificationReq = spark.getEventStream('notifications', '29003f001747343338333633',
    Meteor.bindEnvironment(function(data){
       var parsedNotificationData = data.data;

       notifications.insert({
        update: parsedNotificationData
       });

       console.log('notifications: ', parsedNotificationData);

    }));

    notificationReq.on('end', function() {
        console.log("weightstream ended!  re-opening in 3 seconds...");
        setTimeout(openStream, 3 * 1000);
    });












};

function signIn(){
    console.log("attempting to sign in...");
    spark.login({accessToken:'d12e23f44cbb73dbb07b7e3f97e0f611d4d67334'})
    .then(function(token){
        console.log("Login okay", token);
        return token;
    })

    var devicesPr = spark.listDevices();

    devicesPr.then(function(devices){
        console.log('Devices: ', devices); //, devices
        coreWeight = devices[1];
    })
    .catch(
      function(err){
        console.log("Something bad has happened when getting device: ", err); 
      });
}



//////////////////////////////////////////////////////////////////////////////////////////

var wrapSignIn = Meteor.wrapAsync(signIn);
var wrapOpenStream = Meteor.wrapAsync(openStream);

//...and go:

    Promise.all([signIn()])
    .then(function(token){
      wrapOpenStream(token);
    })
    .catch(function(){
      console.log("something went wrong..")
    });
  
  




















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




