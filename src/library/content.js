(function(define) { 
  'use strict';
  define(function (require) {

  var when = require("when");
  var http = require("http");
  var cheerio = require("cheerio");

  var content = {};

  content.getDataFromURI = function(uri) {
    return when.promise(function(resolver){
      http.get(uri, function(ret){
        var chunks = [];
        var size = 0;
        ret.on("data", function(chunk){
          chunks.push(chunk);
          size += chunk.length;
        })
        ret.on("end", function(){
          var data = Buffer.concat(chunks, size);
          var html = data.toString();
          var $ = cheerio.load(html);
          resolver([$]);
        })
      })
    })
  }

  return content;
  });
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });