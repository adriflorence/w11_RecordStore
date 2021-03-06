const _ = require("lodash");

const Collector = function(budget){
  this.budget = budget;
  this.collection = [];
}

Collector.prototype.addRecord = function (record) {
  this.collection.push(record);
};

Collector.prototype.buyRecord = function (recordStore, record) {
  if(recordStore.inventory.includes(record) && (this.budget >= record.price)){
    recordStore.inventory.pop(record);
    recordStore.till += record.price;
    this.collection.push(record);
    this.budget -= record.price;
  }
};

Collector.prototype.sellRecord = function (recordStore, record) {
  if((this.collection.includes(record)) && (recordStore.till >= record.price) && (!recordStore.inventory.includes(record))){
    this.collection.pop(record);
    this.budget += record.price;
    recordStore.inventory.push(record);
    recordStore.till -= record.price;
  }
};

Collector.prototype.totalValue = function () {
  return _.sumBy(this.collection, "price");
};

Collector.prototype.totalValueByGenre = function (genre) {
  var stringValue = _.chain(this.collection)
        .filter(record => record.genre === genre)
        .sumBy("price").value().toFixed(2);
  return parseFloat(stringValue);
};

Collector.prototype.mostValuableRecord = function () {
  return _.maxBy(this.collection, "price");
};

Collector.prototype.sortByValue = function () {
  return _.sortBy(this.collection, 'price').reverse(); // add .reverse() for ascending order
};

Collector.prototype.compareValue = function (anotherCollector) {
  if(this.totalValue() > anotherCollector.totalValue()){
    return this;
  } else if (this.totalValue() < anotherCollector.totalValue()) {
    return anotherCollector;
  } else {
    return "equal value of records";
  }
};

module.exports = Collector;
