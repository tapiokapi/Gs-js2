'use strict';

let startX = 0; //マウスが押された時の開始位置（X座標）
let startY = 0; //マウスが押された時の開始位置（Y座標）
let endX = 0; //線を引いた後の終了位置（X座標）
let endY = 0; //線を引いた後の終了位置（Y座標）
let isDraw = false; //ボタン押しているかの状態

// canvasの要素を取得
let canvas = $("#canvas").get(0);
// 描画の設定
let context = canvas.getContext('2d');

// canvasの色を決める
context.fillStyle = "rgb(255,255,255)";
// 四角形を描画
context.fillRect(0, 0, canvas.width, canvas.height);
// 最初にペンの色、太さを設定
context.strokeStyle = $('#color1').css("background-color");
context.lineWidth = 2;
$("#color1").addClass("select");


// マウスボタンクリック時
$("#canvas").mousedown(function(e) {
  isDraw = true;
  // マウスカーソルのページ上の座標（pageX）から、canvasのページ上の座標を引くことで、canvas情の座標を計算
  startX = e.pageX - $(this).offset().left;
  startY = e.pageY - $(this).offset().top;
  // console.log(startX, startY);
  // ブラウザのデフォルトイベント（クリック処理）を行わなくする。chromeの異常を防止できる。
  e.preventDefault();
});

// マウスボタン離した時
$("#canvas").mouseup(function() {
  isDraw = false;
});

// マウスを動かした時
$("#canvas").mousemove(function(e) {
  if(isDraw) { // ボタンが押されているかチェック
    endX = e.pageX - $("canvas").offset().left;
    endY = e.pageY - $("canvas").offset().top;
    drawLine(startX, startY, endX, endY);
    // 線を引き終わったら、次に線を引く時のために現在の位置を開始位置にする
    startX = endX;
    startY = endY;
  }
});

// canvasからはみ出した時
$("#canvas").mouseleave(function(e) {
  if(isDraw) {
    endX = e.pageX - $("canvas").offset().left;
    endY = e.pageY - $("canvas").offset().top;
    drawLine(startX, startY, endX, endY);
    startX = endX;
    startY = endY;
  }
  isDraw = false
});

// 色を変える
$(".color").click(function() {
  // 線の色に、colorクラスの背景色（background-color）を設定
  context.strokeStyle = $(this).css("background-color");
  // colorクラスに付与されたselectクラスを全部消して、選択された時の挙動を初期化
  $(".color").removeClass("select");
  // 選んだカラーパレットに対してだけ、選択された時の挙動を付与
  $(this).addClass("select");
});

// ペンの太さを変える
$(".pen").click(function() {
  if($(this).attr("id") == "normal") {
    context.lineWidth = 2;
  } else {
    context.lineWidth = 6;
  }
  $(".pen").removeClass("select");
  $(this).addClass("select");
});

// 塗りつぶす
$("#fill").click(function() {
  // ペンの色を塗り潰し用の色に設定
  context.fillStyle = context.strokeStyle;
  // 塗りつぶす（canvasサイズの四角を再描画する）
  context.fillRect(0, 0, canvas.width, canvas.height);
});

// ロード処理
$("#load").click(function() {
  // ローカルストレージからデータを取得
  let dataURL = localStorage.getItem("dataURL");
  if(dataURL) {
    // 画像生成
    let img = new Image();
    img.onload = function() {
      // canvasに画像を描く(描画する画像、元画像の使用範囲の開始座標（x,y）)
      context.drawImage(img, 0, 0);
    }
    img.src = dataURL;
    alert("画像を読み込みました");
  } else {
    alert("保存された画像がありません");
  }
});

// セーブ処理
$("#save").click(function() {
  /* canvasの内容をDataURLと言われる文字列に変換
     DataURLとは、画像などのデータを、文字列にしてHTMLに埋め込む方式
     localStorage.setItem(key, value)で、ローカルストレージに保存
  */
  localStorage.setItem('dataURL', canvas.toDataURL('image/png'));
  alert("画像を保存しました");
});

// データ削除処理
$("#clear").click(function() {
  localStorage.clear();
  alert("画像を削除しました");
})

// ボタンにカーソルを置いた時
$(".tools div").hover(
  function() {
    $(this).addClass("hover");
  },
  function() {
    $(this).removeClass("hover");
  }
);

// 色チェンジ処理(時間ない＆思いつかないので、無理やりif文で分岐させる...)
$("#change").click(function() {
  if($("#color1").attr("id") == "color1") {
    $("#color1").attr("id", "chg-color1");
  } else if($("#chg-color1").attr("id") == "chg-color1") {
    $("#chg-color1").attr("id", "color1");
  }

  if($("#color2").attr("id") == "color2") {
    $("#color2").attr("id", "chg-color2");
  } else if($("#chg-color2").attr("id") == "chg-color2") {
    $("#chg-color2").attr("id", "color2");
  }

  if($("#color3").attr("id") == "color3") {
    $("#color3").attr("id", "chg-color3");
  } else if($("#chg-color3").attr("id") == "chg-color3") {
    $("#chg-color3").attr("id", "color3");
  }

  if($("#color4").attr("id") == "color4") {
    $("#color4").attr("id", "chg-color4");
  } else if($("#chg-color4").attr("id") == "chg-color4") {
    $("#chg-color4").attr("id", "color4");
  }

  if($("#color5").attr("id") == "color5") {
    $("#color5").attr("id", "chg-color5");
  } else if($("#chg-color5").attr("id") == "chg-color5") {
    $("#chg-color5").attr("id", "color5");
  }

  if($("#color6").attr("id") == "color6") {
    $("#color6").attr("id", "chg-color6");
  } else if($("#chg-color6").attr("id") == "chg-color6") {
    $("#chg-color6").attr("id", "color6");
  }

  if($("#color7").attr("id") == "color7") {
    $("#color7").attr("id", "chg-color7");
  } else if($("#chg-color7").attr("id") == "chg-color7") {
    $("#chg-color7").attr("id", "color7");
  }

  if($("#color8").attr("id") == "color8") {
    $("#color8").attr("id", "chg-color8");
  } else if($("#chg-color8").attr("id") == "chg-color8") {
    $("#chg-color8").attr("id", "color8");
  }

  if($("#color9").attr("id") == "color9") {
    $("#color9").attr("id", "chg-color9");
  } else if($("#chg-color9").attr("id") == "chg-color9") {
    $("#chg-color9").attr("id", "color9");
  }



});

// 描画処理
function drawLine(x1, y1, x2, y2) {
  // パスを初期化
  context.beginPath();
  // 開始位置
  context.moveTo(x1, y1);
  // 線を引いた後の位置
  context.lineTo(x2, y2);
  // 線を描画する
  context.stroke();
}


