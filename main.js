//var fengniao = require("./src/target/fengniao");

   var db = require("./src/library/storage");
// db.put("test1", "hello");
   
// db.get("webCrawler.fengniao.latest").spread(function(value) {
//   console.log("aaa");
//   console.log(value);
// })
   db.get("test1").spread(function(value) {
     console.log("aaa");
     console.log(value);
   })
//db.getStream().then(function(result){
//console.log(result);
//}).otherwise(function(err){
//console.log(err);
//})
//fengniao.run();
