var when = require("when");
var levelup = require("level");
var db = levelup("../../mydb");
var poly = require("../../bower_components/poly/poly");

var dbMethods = ["put", "get", "batch", "del"];
var methodFactory = function(property) {
  exports[property] = function() {
    var arg = arguments;
    return when.promise(function(resolve, reject) {
      var callbackFun = function(error, value){
        var ret = !value ? [] : [value];
        !error ? resolve(ret): reject(error); 
      };
      Array.prototype.push.call(arg, callbackFun);
      db[property].apply(db, arg);
    })
  }
}

dbMethods.forEach(function(value, index) {
  methodFactory(value);
})

exports.batchChain = function() {
  return db.batch();
}

exports.delSome = function(condition) {
  var keyAry = [];
  db.createKeyStream(condition)
    .on("data", function(data) {
      keyAry.push({type:'del', key:data});
    })
    .on("error", function(err) {
    })
    .on("close", function() {
      db.batch(keyAry);
    })
    .on("end", function() {
    })
}

//condition:{gt:2, values:true};
//gt(e), ls(e), limit
//List all: start: a, end: a~
//method!name!function!timestamp!id....
exports.getStream = function(type, condition) {
  var retAry = [];
  var operationFun;
  var type = arguments[0];
  var condition = arguments[1];
  switch (type){
  case "key":
    operationFun = db.createKeyStream;
    break;
  case "value":
    operationFun = db.createValueStream;
    break;
  default:
    operationFun = db.createReadStream;
    condition = type;
    break;
  }
  return when.promise(function(resolve, reject, process) {
    operationFun.call(db, condition)
      .on("data", function(data) {
        retAry.push(data);
        process(data);
      })
      .on("error", function(err) {
        reject(err);
      })
      .on("close", function() {
        resolve(retAry);
      })
      .on("end", function() {
        process("end")
      })
  })
}