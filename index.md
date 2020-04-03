# covid-19

Another take on a visualization of COVID-19 Data. 
Trying to extrapolate with a simple model on current data. Feel free to suggest changes.

It has lots of shortcomings, in particular:

* just extrapolating how the measures will stop new infections and assuming we can get that to zero (magic number: sampling x days of decrease in growth rate).
* active cases assume a confirmed case will recover in 14 days (or so, look at the code)
* proper models would look at more indicative factors as described here: https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Steckbrief.html

Please consider this an experiment until peer reviewed. So far I think it is too nice, real results will be higher.

View the graph:

* [Germany](graph.html?country=Germany)
* [US](graph.html?country=US)
* [Sweden](graph.html?country=Sweden)
* [China](graph.html?country=China)