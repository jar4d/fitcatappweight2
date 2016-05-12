
if (Meteor.isClient) {

Meteor.subscribe('weightDB',function(){
	weightDB.findOne({}, {sort: {'_id': -1}});
});


Meteor.subscribe('keyStatsDB',function(){
	keyStatsDB.findOne({}, {sort: {'_id': -1}});
});

Meteor.subscribe('notifications');
Meteor.subscribe('keyStatsDB');
//
Template.weight.helpers({
	'weightChartPlot': function(){
		var weightDBVar = weightDB.find().fetch();

			return{
				data: { type: 'area', json: weightDBVar, keys:{  x: 'createdAt', value: ['foodWeight', 'catWeight'],   }, axes:{foodWeight: 'y',catWeight: 'y2'}//
 				},
				axis:{  
						x:{ type: 'timeseries', tick: {format: '%Y-%m-%d'}}, //this will need to change for each time period.
						y:{min:0}, 
						y2: {show: true}
					} 
				

			}
	}
});

Template.catWeightTemplate.helpers({
	'catFoodWeightChart': function(){
	var keyStatsDBVar = keyStatsDB.find().fetch();


return{
    data: {
        type: 'bar',
        json: keyStatsDBVar,
        keys: {
            x: '_id',
            value: ['weeklyAverageCatWeightResult']
        }
    },
    axis: {
            x: {
                //type: 'category'
            }
    },
    bar: {
        width: {
            ratio: 0.5
        }
    }
}

}});

Template.weight.events({
	'click #tareCatWeightButton': function(){
		Meteor.call('tareCat');
	}
});

Template.addFood.helpers({
	'foodWeightVar': function(){
		return weightDB.findOne({}, {sort: {'_id': -1}}).foodWeight;		
		//return dailyAverageCatWeightResult;
	},
	'notificationsVar':function(){
		return notifications.findOne({}, {sort: {'_id': -1}}).update;	
	}


});

Template.addFood.events({
	'click #addFoodButton': function(){
		Meteor.call('tareFood'); //resets weight value
	}
});






}
