var g_ZairyoList = [];
var g_RyoriList = [];
var g_ZairyoAndRyori;

var ZairyoFunc = function(zairyoMei, category, subcategory){
  this.zairyoMei = zairyoMei;
  this.category = category;
  this.subcategory = subcategory;
}
var RyoriFunc = function(ryoriMei, zairyoList, recipeURL, syoyouJikan, bikou){
  this.ryoriMei = ryoriMei;
  this.zairyoList = zairyoList;
  this.recipeURL = recipeURL;
  this.syoyouJikan = syoyouJikan;
  this.bikou = bikou;
}
var ZairyoAndRyoriFunc = function(zairyoMeiList, ryoriList){
  this.zairyoMeiList = zairyoMeiList;
  this.ryoriList = ryoriList;
}
function output(){
  //スプレッドシートのID
  var id1 = "1_x9i7UOukzycoq3XvUt8YUTt883Pg1aXkvyqo9K2eKM"
  var file = SpreadsheetApp.openById(id1);
  var sheet1 = file.getSheetByName("マクロ実行");
  
  outputZairyoListJson();
  outputRyoriListJson();
  g_ZairyoAndRyori = new ZairyoAndRyoriFunc(g_ZairyoList, g_RyoriList);
  
  var jsonStr = JSON.stringify(g_ZairyoAndRyori);
  var folderId = sheet1.getRange(2,1).getValue();
  createFile("ZairyoAndRyoriList.json", jsonStr, folderId);   
  
  
}
function outputRyoriListJson(){
  //スプレッドシートのID
  var id1 = "1_x9i7UOukzycoq3XvUt8YUTt883Pg1aXkvyqo9K2eKM"
  var file = SpreadsheetApp.openById(id1);
  var sheet1 = file.getSheetByName("料理名一覧");
  var sheet2 = file.getSheetByName("マクロ実行");
  var ryori;
  var ryoriMei;
  var zairyoList;
  var recipeURL;
  var syoyouJikan;
  var bikou;
  var row, col;
  var syuyouZairyoSu = 10;
  var zairyo;
  
  col = 2
  row = 1
  while(true){
    ryoriMei = sheet1.getRange(col, row).getValue();
    if(ryoriMei == ""){
      break;
    }else{
      zairyoList = [];
      for(var i=0; i<syuyouZairyoSu; i++){
        zairyo = sheet1.getRange(col, row+1+i).getValue();
        if(zairyo != ""){
          zairyoList.push(zairyo);
        }
      }
      recipeURL = sheet1.getRange(col, 12).getValue();
      syoyouJikan = sheet1.getRange(col, 13).getValue();
      if(syoyouJikan == ""){
        syoyouJikan = 0;
      }
      bikou = sheet1.getRange(col,14).getValue();
      
      ryori = new RyoriFunc(ryoriMei, zairyoList, recipeURL, syoyouJikan, bikou);
      g_RyoriList.push(ryori);
    }
    col++;
  }
  var jsonStr = JSON.stringify(g_RyoriList);
  
  var folderId = sheet2.getRange(2,1).getValue();
  //createFile("RyoriList.json", jsonStr, folderId);     
  
  
  
}

function outputZairyoListJson() {
  //スプレッドシートのID
  var id1 = "1_x9i7UOukzycoq3XvUt8YUTt883Pg1aXkvyqo9K2eKM"
  var file = SpreadsheetApp.openById(id1);
  var sheet1 = file.getSheetByName("材料一覧");
  var sheet2 = file.getSheetByName("マクロ実行")
  var col, row;
  var cellvalue;
  var zairyoMei;
  var category;
  var subcategory;
  var Zairyo;
  
  col = 2
  row = 1
  while(true){
    zairyoMei = sheet1.getRange(col, row).getValue();
    category = sheet1.getRange(col, row+1).getValue();
    subcategory = sheet1.getRange(col, row+2).getValue();
    
    if(zairyoMei == ""){
      break;
    }else{
      Zairyo = new ZairyoFunc(zairyoMei, category, subcategory);
      g_ZairyoList.push(Zairyo);
      col++;
    }
    
  }
  var jsonStr = JSON.stringify(g_ZairyoList);
  
  var folderId = sheet2.getRange(2,1).getValue();
  //createFile("ZairyoList.json", jsonStr, folderId);                              
}

/**
 *ソース元:https://hrroct.hatenablog.com/entry/2019/02/28/000000
 * ファイル書き出し
 * @param {string} fileName ファイル名
 * @param {string} content ファイルの内容
 */
function createFile(fileName, content, folderId) {  
  var folder = DriveApp.getFolderById(folderId);
  var contentType = 'text/plain';
  var charset = 'utf-8';

  // Blob を作成する
  var blob = Utilities.newBlob('', contentType, fileName)
                      .setDataFromString(content, charset);

  // ファイルに保存
  folder.createFile(blob);
}
