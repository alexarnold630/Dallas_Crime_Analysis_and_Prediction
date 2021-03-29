# An Investigation into Analyzing and Predicting Dallas Crime for 2020

## https://dallas-crime-smu.herokuapp.com/

## Background
“Half the crime in the city [Boston] came from 3.6 percent of the city’s blocks…And every place they looked, they saw the same thing: Crime in every city was concentrated in a tiny number of street segments. Weisburd refers to this as  the Law of Crime Concentration.  Crime is tied to very specific places and contexts.” -Maclolm Gladwell, _Talking to Strangers: What We Should Know about the People We Don't Know_

So what are these places and contexts that crime is tied to?  In this report, we investigate crime in Dallas for the year 2020 by uncovering trends through visual analysis and creating a machine learning model to predict the status of crime incidents.  We’ll go on to explain:
- The Dallas crime data we explored.
- How we used feature engineering on this data to create our target and features for our machine learning model.
- Our prediction model of whether an incident will result in an arrest, clearance, or suspension.
- Criminal activity trends visualized by time and location.
- How our findings will support local law enforcement efforts.

## The Problem
Crime and criminal activity are prevalent issues that exist in any city. Can we then organize our efforts and focus on certain parts of the city, like Gladwell posts in his book, to better counter crime and criminal activity?

## Data
We used open-sourced Police Incident data from the city of Dallas for the entire year 2020.  This dataset provided the date and time, location information, demographic information, and type of incident in addition to much more detail within each of these categories.  We then cleaned the data by removing nulls, dropping columns, changing object types, and removing incidents due to human-error when entering in information to the dataset.

## Visualization Analysis
We developed two dashboards based on time and location to further investigate Dallas Crime.  The “Time” Dashboard looks deeper into when crimes occur, what type of crime occurs, and who is involved in each crime incident.  Filtering by Crime Category and Month allowed us to determine that most crimes occur in the month of August and on Fridays.  The “Location” Dashboard discovers where crime occurs by analyzing crime incidents by division and density.  

These maps are also filtered by Crime Category and Month.  There is a high crime density in the Central and Southern Area of Dallas, but for the month of February it has the lowest density of overall crime for the city. When filtering by crime, Assault, Larceny/Theft, and Miscellaneous crimes have the greatest density across the city.

![time](images/time_dashboard.png)
![location](images/location_dashboard.png)

### Machine Learning Model
Based on our visualization analysis, we were interested to see whether we could predict the status of a crime incident based on it’s time and location data.  We created a two-step machine learning model using the XG-Boost Classifier that allows us to predict the probability that a reported criminal incident will result in either an arrest, clearance, or suspension.

## Conclusions
We accepted our alternative hypothesis and determined that South Dallas experiences the most crime out of each division in our dataset. We also discovered that April had the lowest percentage of crime incidents out of every month in 2020. 

After investigating what type of crime occurs the most, we failed to reject our null hypothesis and determined that the most common crimes that occur throughout Dallas are miscellaneous crimes, larceny and theft, followed by assault crimes. 

## Recommendations
Based on our analysis, we recommend that the Dallas police force have more officers on duty in the month of August and allow officers vacation time in April. We also recommend providing more officers in patrolling in Central and South Dallas areas due to the increase of percentage of crime incidents in those areas. 

## Limitations
When dealing with live data we often have to deal with discrepancies in our data due to human error.   We also were only able to use a subset of data for our visualizations due to Tableau limits on file size for documents being uploaded.  Due to scope and time frame, we were only able to analyze data for the year 2020.

## Future Work
To further investigate the vast amount of crime data it would be vital to look into trends overtime. It would also be interesting to investigate other types of machine learning models using different targets such as crime category or watch. This would allow us to see what else we could potentially predict and compare the different scores between each model.
