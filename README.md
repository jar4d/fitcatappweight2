#Basic datalogging with Meteor

###Uses the following libraries to display and manipulate a time series:
*	d3js:d3
*	charts:dc
*	mrt:crossfilter


- foodWeight
- catWeight
- waterWeight


###### TO DO ########
1. weird publish figures, and i2c issue?
2. record only differing figures on photon
3. wiring harness plugs&ribbon
4. slicing data, produce basic graphs
5. using FS to store data somewhere
6. include a unique userID
7. 3D prototype
8. another scale for water







###### DATA ########

A. Data required from user
1. breed
2. age
3. measurements (and visual)
4. current food intake
5. location (post code or current location?) -------> http://bassam.co/javascript/2013/07/28/Saving-location-in-mongodb-using-meteor/
6. Pet food 

B. Data recorded
1. cat weight
2. food consumed
3. frequency of consumption (?)
4. activity level

C. Data sets required
1. weights based on breeds and age
2. FBMI based on measurements
3. weather data (tie to weather)
4. Pet food nutrition per gram (tie to consumption)

D. Interpretive stats

http://blog.rusty.io/2012/09/17/crossfilter-tutorial/

http://bl.ocks.org/jun9/5631952 --> search dayofweek
http://square.github.io/crossfilter/

1. Prediction of target weight based on breed, age, measurements and visual. Under or over based on B1. 5 grades from skinny to super fat.
2. Lower or higher food weight target, based on the above. Within 10%. 5 grades: +10 +5 0 -5 -10%
3. Activity level based on (i)previous weeks; (ii) basic historic levels; (iii) in your area. Tied to weather. "Bert has gone out more than last week as it's been sunny..."
4. Water consumption based on food type. 
Graphs:
5. Activity level 	- percent out today DONUT *
					- this month OUTSIDE BAR CHART **
					- over the year
6. Food weight 		- NOW *
					- amount provided vs recommended this week**
 					- vs cat weight over a month? year?
7. Cat weight 		- today * 
					- This month**
8. Water 			- Today (okay or not) *
					- Over month**/year

					* Together
					** Do these monthly ones first