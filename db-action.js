const NeDB = require('nedb');
var db = {};

db.users = new NeDB({
  filename: './src/data/ntzkdb'
});

db.users.loadDatabase();

// DBの数をカウントして、chrgeを合計して表示
let sum = 0;
let docCharge = 0;

function sumChargeDB(){
    var x = null;
    db.users.find({}, function (err, count) {
        x = count;
        showDbCount();
    });
    function showDbCount() {
        // console.log(x); // x have docs now
        console.log("DB num is " + x.length); // x have docs now
        sumCharge(x.length);
    }
    function sumCharge(numLength){
        var docCharge = 0;
        for(var i = 0; i < numLength; i++){
            var num = 1001 + i;
            db.users.find(
                {id: num},
                function(err, docs){
                    docCharge = Number(docs[0]["charge"]);
                    // console.log(docs[0]["day"]);
                    // console.log(docs[0]);
                    sum = sum + Number(docCharge);
                    console.log(docs[0]["day"] + " : " + docCharge + " : " + sum);
                }
            );
        }
    }
}
sumChargeDB();
// console.log(sum);

// remove
// db.users.remove(
//     {id: 1044},
//     {multi: true},
//     function (err, numRemoved){
//       console.log("[REMOVE]");
//       console.log(numRemoved);
//   });

// count
// db.users.count({},function(err, count){
//     // console.log('err: ',err);
//     console.log(count);
//     count = count;
//     return count;
// });
