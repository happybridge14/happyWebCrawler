var fengniao = require("./src/target/fengniao");

// var db = require("./src/library/storage");
// db.get("webCrawler.fengniao.latest").spread(function(value) {
//   console.log("aaa");
//   console.log(value);
// })
// var db = require("./src/library/storage");
// db.get("webCrawler.fengniao.latest").spread(function(value) {
//   console.log("aaa");
//   console.log(value);
// })

// var levelup = require("level");
// var db = levelup("../../mydb");
// db.get("webCrawler.fengniao.latest", function(error, value){
//   console.log(value);
// })
// db.createReadStream()
//   .on('data', function(data){
//     console.log("hello")
//     console.log(data.key, "=", data.value);
//   })
//   .on('close', function(data){
//     console.log("close")
//   })
//   .on('end', function(data){
//     console.log("end")
//   })
fengniao.run();
