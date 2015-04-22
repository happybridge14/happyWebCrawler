var when = require("../../bower_components/when");
var content = require("../library/content");
var db = require("../library/storage");

var URL_SHANGHAI_PAGE1 = "http://www.fengniao.com/secforum/search.php?bid=1&pid=24&stid=2&ptypeid=2&sortfield=posttime";
var KEY_PREFIX = "webCrawler.fengniao.";

var ret = {};

var getData = function(){
  content.getDataFromURI(URL_SHANGHAI_PAGE1).spread(function($){
      var BEGIN_INDEX = 1;
      var items = $("body>table tr");
      var length = items.length;
      length  = 2;
      for (var i = BEGIN_INDEX ; i < length; i++) {
        console.log(items.eq(i).find("td").eq(2).text());
        console.log(items.eq(i).find("td").eq(6).text());
        if (i === 1) {

        }
      }
      db.put("webCrawler.fengniao.latest", items.eq(1).find("td").eq(2).text());
    })
}
exports.run = function(){
  setInterval(getData, 20000);
  getData();
}
