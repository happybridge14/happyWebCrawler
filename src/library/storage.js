var when = require("../../bower_components/when");

var levelup = require("level");
var db = levelup("../../mydb");
var CACHE_MAX = 10;
var TEST = 1;

var localCache = {
  "lasItemKey": "",
  "data": {},
  "indexList": [],
  "put": function(key,value) {
    var me = this;
    if (data.hasOwnProperty(key)){
      var position = 0;
      var length = me.indexList.length;
      for (var i = 0; i < length; i++) {
        if (me.indexList[i] === key) {
          position = i;
          break;
        }
      }
      me.indexList.splice(position);
      me.indexList.push(key);
    } else {
      me.indexList.push(key);
      if (me.indexList.length > CACHE_MAX) {
        me.indexList.pop();
      }
    }
  },
  "get": function() {
    
  }
};

var putAndCache = function() {
  
}

var checkAndGet = function() {
  
}




exports.put = function(key, value) {
  return when.promise(function(resolve, reject) {
    db.put(key, value, function(error){
      !error ? resolve([]) : reject(error);
    })
  })
}
exports.get = function(key) {
  return when.promise(function(resolve, reject) {
    db.get(key, function(error, value) {
      !error ? resolve([value]) : reject(error);
    })
  })
}
exports.checkAndPut = function(key, value) {
  
}
