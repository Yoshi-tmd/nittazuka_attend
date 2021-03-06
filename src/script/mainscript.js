// mainscript.js

// 今日の日付を表示
var ymd;
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
    ymd = yyyy + "-" + mm + "-" + dd;

    document.getElementById("club-date").value = ymd;
    console.log(ymd);
    return ymd;
}

// 出席人数と金額の算出
// コースの定義
const course = document.getElementById('formarea');
console.log(course.dataset.course);
let unitPrice;

// 単価の設定
if(course.dataset.course == 'basic'){
    unitPrice = 200;
} else {
    unitPrice = 300;
}
console.log(unitPrice);

// 人数と金額の変数宣言
let count = 0;
let total = 0;

// 決定ボタンを押したときのイベント関数
function showValue(){
    let menNum = 8;

    if(count!=0){
        count = 0;
    }

    for (let i = 1; i <= menNum; i++){
        let str = 'radio0' + i + '-attend';
        console.log(str);
        
        let val  = document.getElementById(str);
        console.log(val);
        if(val.checked){
            count++;
        }
    }

    // 人数をHTMLに挿入
    console.log(count);
    document.getElementById('resultNum').innerHTML = count;

    // 合計金額を算出、HTMLに挿入
    total = count * unitPrice;
    document.getElementById('resultAmount').innerHTML = total;

    return count, total;
}

// 確定ボタン押したときのイベント
function confirmFunc(){
    let act = confirm('確認です\nokoko?');
    if (act) {
        console.log(count);
        console.log(total);
        console.log(ymd);
    } else {
        console.log('nono');
    }
}
