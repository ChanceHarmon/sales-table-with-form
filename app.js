'use strict';

console.log('connected');


var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

var cities = [];
var table = document.getElementById('sales_table');
var form = document.getElementById('store_form');

function Store(name, minCust, maxCust, avgSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.hourlyDailyTotal = [];
  this.finalTotalDaily = 0;
  cities.push(this)
}


function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Store.prototype.hourlySales = function () {
  for (var i = 0; i < hours.length; i++) {
    var hourlySale = Math.floor(randomNum(this.minCust, this.maxCust) * this.avgSale);
    this.hourlyDailyTotal.push(hourlySale)
    this.finalTotalDaily += hourlySale;
  }
  //return true;
}

//This function is solid, dont touch
function renderHeader() {
  var tableHeader = document.createElement('tr')
  table.append(tableHeader)
  var cityLabel = document.createElement('th');
  cityLabel.textContent = 'Store Location';
  tableHeader.append(cityLabel);
  for (var i = 0; i < hours.length; i++) {
    var headerCellHour = document.createElement('th');
    headerCellHour.textContent = hours[i];
    tableHeader.append(headerCellHour);
  }
  var dailyTotalLabel = document.createElement('th');
  dailyTotalLabel.textContent = 'End of day Sales'
  tableHeader.append(dailyTotalLabel)
}

//Perfecto
Store.prototype.renderStore = function () {
  var cityRow = document.createElement('tr');
  table.append(cityRow);
  var cityLabel = document.createElement('th')
  cityLabel.textContent = this.name;
  cityRow.append(cityLabel)
  for (var i = 0; i < this.hourlyDailyTotal.length; i++) {
    var hourCell = document.createElement('td');
    hourCell.textContent = this.hourlyDailyTotal[i];
    cityRow.append(hourCell);
  }
  var endOfDay = document.createElement('th');
  endOfDay.textContent = this.finalTotalDaily;
  cityRow.append(endOfDay);
}

//This works perfect, just need to work of add a store now...
function renderFooter() {
  var totalsRow = document.createElement('tr');
  table.append(totalsRow);
  var totalLabel = document.createElement('th');
  totalLabel.textContent = 'Total';
  totalsRow.append(totalLabel);

  var cooDeeGra = 0;
  for (var i = 0; i < hours.length; i++) {
    var totalByHour = 0;
    for (var j = 0; j < cities.length; j++) {
      totalByHour += cities[j].hourlyDailyTotal[i];
    }
    var storesHourTotal = document.createElement('th');
    storesHourTotal.textContent = totalByHour;
    cooDeeGra += totalByHour;
    totalsRow.append(storesHourTotal)
  }
  var addItAllUp = document.createElement('th');
  addItAllUp.textContent = cooDeeGra;
  totalsRow.append(addItAllUp)

}

//Working as intended
function addAStore(event) {
  event.preventDefault();
  var name = event.target.store.value;
  var min = parseInt(event.target.min.value);
  var max = parseInt(event.target.max.value);
  var avg = parseInt(event.target.avg.value);

  var newStore = new Store(name, min, max, avg);
  newStore.hourlySales();

  table.textContent = '';
  renderHeader();
  for (var i = 0; i < cities.length; i++) {
    cities[i].renderStore();
  }
  renderFooter();
}


//works like a dream, but this will need the most work
function pageLoad() {
  renderHeader()
  new Store('Seattle', 3, 8, 3);
  new Store('Edmonds', 5, 7, 2);
  new Store('Vashon', 3, 12, 7);
  new Store('Ballard', 5, 7, 5);
  new Store('GreenWood', 9, 13, 8);

  for (var i = 0; i < cities.length; i++) {
    cities[i].hourlySales();
    cities[i].renderStore();
  }
  renderFooter();
  form.addEventListener('submit', addAStore);
}
pageLoad();
