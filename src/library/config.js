var fs = require("fs");
var when = require("when");
var poly = require("../../bower_components/poly/poly");

var CONFIG_FOLDER = "config";
var CONFIG_FILENAME_SUFFIX = /.json$/;
var CONFIG_ENCODING = "utf-8";
var _config = {};
var _configFiles = [];

var readFolder = function() {
  return when.promise(function(resolve, reject) {
    fs.readdir("config", function(err, files){
      !err ? resolve(files) : reject(err);
    });
  })
}
var readFile = function(filename) {
  return when.promise(function(resolve, reject) {
    fs.readFile(filename, CONFIG_ENCODING, function(err, data){
      !err ? resolve(data) : reject(err);
    });
  });
}

readFolder(CONFIG_FOLDER).then(function(files){
  _configFiles = files.filter(function(value){
    return /.json$/.test(value);
  });
  return when.all(_configFiles.map(function(value){
    return readFile(CONFIG_FOLDER + "/" + value);
  }));
}).then(function(dataAry){
  dataAry.forEach(function(value) {
    console.log(value);
    try {
      var jsonObject = JSON.parse(value);
    } catch(e) {
      when.reject(e);
    }
  })
}).otherwise(function(err){
  console.error(err);
})

//fs.readdir("config", function(err, files){
//_configFiles = files.filter(function(value){
//  return /.json$/.test(value);
//});
//
//})
//    _configFiles = files.filter(function(value){
//      return /.json$/.test(value);
