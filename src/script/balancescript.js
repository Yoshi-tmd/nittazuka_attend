// mainscript.js

// 今日の日付を表示
window.onload = function(){
    // 今日の日時を取得
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    // 月と日を2桁表示にする処理
    var toTwoDigits = function(num, digit){
        num += '';
        if (num.length < digit){
            num = '0' + num;
        }
        return num;
    }

    var yyyy = toTwoDigits(year, 4);
    var mm = toTwoDigits(month, 2);
    var dd = toTwoDigits(day, 2);
    var ymd = yyyy + "-" + mm + "-" + dd;

    //最初にロードした時だけ、その日の日付を表示する
    document.getElementById("date").value = ymd;
    console.log(ymd);

    //フォームを取得
    let form = document.forms.mainForm;

    //date
    console.log(form.date.value);

    //state
    if(form.state.value == 'Reception'){
        console.log('Reception is true');
    } else {
        console.log('Payment is true');
    }

    //charge
    form.charge.value = 0;
    console.log(form.charge.value);

    //note
    form.notes.value = "";
    console.log(form.notes.value);

}

// nedbを呼び出し
const NeDB = require('nedb');
var db = {};

// DBを参照
db.users = new NeDB({
  filename: './src/data/ntzkdb'
});

db.users.loadDatabase();

// フォームの値を取得して、ntxkdbにインサートする
// ボタンを押したら実行
function getFormValue(){
    let form = document.forms.mainForm;

    //date
    console.log(form.date.value);
    alert(form.date.value);
    var insertDate = form.date.value;

    //state
    if(form.state_rec.checked){
        console.log('Reception is true');
        alert('Reception is true');
        var insertState = 'reseption';
    } else {
        console.log('Payment is true');
        alert('Payment is true');
        var insertState = 'payment';
    }

    //charge
    console.log(form.charge.value);
    var insertCharge = Number(form.charge.value);
    // paymentだったらマイナスつける
    if(insertState == 'payment'){
        insertCharge *= -1;
    }
    alert(form.charge.value);

    //note
    console.log(form.notes.value);
    var insertNotes = form.notes.value;
    if(insertNotes){
        alert(form.notes.value);
    }

    // DBをカウント
    var idNum = null;
    db.users.find({}, function (err, count) {
        idNum = count;
        showDbCount();
    });
    // Dbの数を数えて、インサート関数を実行
    function showDbCount() {
        // console.log(x); // x have docs now
        // alert("DB num is " + idNum.length); // x have docs now
        insertData(idNum.length);
    }

    // データをインサートする関数
    function insertData(idnumber){
        db.users.insert(
            {
                id: idnumber+1001,
                day: insertDate,
                state: insertState,
                charge: insertCharge,
                notes: insertNotes
            }
            ,function(err, newDoc){
                console.log("[INSERT]");
                console.log(newDoc);
            });
    }
}

