const TAB_RYORI_TYUSYUTU = "tab_RyoriTyusyutu"
const TAB_DATA_I = "tab_DataImport"
const TAB_ZAIRYO_SENTAKU = "tab_ZairyoSentaku"

var AllTabNameList = [
TAB_RYORI_TYUSYUTU,
TAB_DATA_I,
TAB_ZAIRYO_SENTAKU
];

var g_RyoriAndZairyo;

var g_ZairyoCategoryList = [];
var Cr_ZairyoCategory = "";
var Cr_ZairyoMei = "";
var DataImportFlg = false;

var g_SyuyouZairyo1 = "";
var g_SyuyouZairyo2 = "";
var g_SyuyouZairyo3 = "";
var g_SyuyouZairyo4 = "";
var g_SyuyouZairyo5 = "";
var g_SyuyouZairyoTuikaNumber = "";

InitTab();
Init();

function InitTab(){
	HiddenAllTab();
	DisplayTab(TAB_DATA_I);
}

function Init(){
}

function ChangeTab(){
	HiddenAllTab();
	
	//選択されたタブを取得
	var form1 = document.getElementById("form1");
	var selectedTabIdx = form1.tabPages.selectedIndex;
	var selectedTabNm = form1.tabPages.options[selectedTabIdx].value;

	DisplayTab(selectedTabNm);
}

//指定したタブを表示
function DisplayTab(tabNm){

	//タブごとの各種表示用処理
	if(tabNm == TAB_RYORI_TYUSYUTU){
		DisplayRyoriTyusyutuTab();
	}else if(tabNm == TAB_DATA_I){
		DisplayDataImportTab();
	}else if(tabNm == TAB_ZAIRYO_SENTAKU){
		DisplayZairyoSeitakuTab();
	}

	var tabElem1 = document.getElementById(tabNm);
	tabElem1.style.display = 'block';

}
//すべてのタブを非表示にする
function HiddenAllTab(){
	var tabElem1;
	for(var i=0; i<AllTabNameList.length; i++){
		tabElem1 = document.getElementById(AllTabNameList[i]);
		tabElem1.style.display = 'none';
	}
	
}

function ZairyoTuikaOnRyoriTyusyutuTab(value){
	if(value == 1){
		g_SyuyouZairyoTuikaNumber = 1;
	}else if(value == 2){
		g_SyuyouZairyoTuikaNumber = 2;
	}else if(value == 3){
		g_SyuyouZairyoTuikaNumber = 3;
	}else if(value == 4){
		g_SyuyouZairyoTuikaNumber = 4;
	}else if(value == 5){
		g_SyuyouZairyoTuikaNumber = 5;
	}
	
	HiddenAllTab();
	DisplayTab(TAB_ZAIRYO_SENTAKU);
}

function DisplayRyoriTyusyutuTab(){
}
function DisplayDataImportTab(){
	var spanElem;
	
	spanElem = document.getElementById("ImportDataFlgOnDataImportTab");
	if(DataImportFlg == true){
		spanElem.innerHTML = "材料-料理データ：インポート済み"
	}else{
		spanElem.innerHTML = "材料-料理データ：インポート未完了"
	}
}
function DisplayZairyoSeitakuTab(){
	var spanElem;
	var divElem;
	var brElem;
	var zairyoMeiTopMargin = 0;
	var str1;
	
	divElem = document.getElementById("categoryTab1");
	divElem.style.backgroundColor = "rgb(100, 255, 100)";
	divElem.style.width = "500px";
	divElem.style.margin = "20px 5px";
	//カテゴリーのDivをクリア
	while(divElem.firstChild != null){ divElem.removeChild(divElem.firstChild); }
	
	for(var i=0; i<g_ZairyoCategoryList.length; i++){
		spanElem = document.createElement("span");
		spanElem.innerHTML = "　";
		spanElem.innerHTML += g_ZairyoCategoryList[i];
		spanElem.innerHTML += "　";
		if(g_ZairyoCategoryList[i] == Cr_ZairyoCategory){
			spanElem.style.border = "thick solid rgb(255, 0, 0)";
			spanElem.style.color = "red";
		}else{
			spanElem.style.border = "thick solid rgb(0, 0, 0)";
			spanElem.style.color = "black";
		}
		spanElem.style.fontWeight = "bold";
		spanElem.style.margin = "20px 5px";
		spanElem.value = g_ZairyoCategoryList[i];
		spanElem.onclick = function(){
			//alert(this.value);
			Cr_ZairyoCategory = this.value;
			Cr_ZairyoMei = "";
			DisplayZairyoSeitakuTab();
		}
		
		divElem.appendChild(spanElem);
		
		if( ((i+1) % 3) == 0){
			brElem = document.createElement("br");
			divElem.appendChild(brElem);
			
			brElem = document.createElement("br");
			divElem.appendChild(brElem);
		}
	}
	
	divElem = document.getElementById("zairyoTab1");
	divElem.style.backgroundColor = "rgb(100, 100, 255)";
	divElem.style.width = "800px";
	divElem.style.margin = "20px 5px";
	//材料名のDivをクリア
	while(divElem.firstChild != null){ divElem.removeChild(divElem.firstChild); }
	var zairyoList = GetZairyoList(Cr_ZairyoCategory);

	var zairyoMeiList = [];
	for(var k=0; k<zairyoList.length; k++){
		zairyoMeiList.push(zairyoList[k].zairyoMei);
	}
	zairyoMeiList.sort();
	
	for(var j=0; j<zairyoMeiList.length; j++){
		spanElem = document.createElement("span");
		spanElem.innerHTML = "　";
		spanElem.innerHTML += zairyoMeiList[j];
		spanElem.innerHTML += "　";
		if(zairyoMeiList[j] == Cr_ZairyoMei){
			spanElem.style.border = "thick solid rgb(255, 0, 0)";
			spanElem.style.color = "red";
		}else{
			spanElem.style.border = "thick solid rgb(0, 0, 0)";
			spanElem.style.color = "black";
		}
		spanElem.style.fontWeight = "bold";
		spanElem.style.margin = "20px 5px";
		spanElem.value = zairyoMeiList[j];
		spanElem.onclick = function(){
			Cr_ZairyoMei = this.value;
			DisplayZairyoSeitakuTab();
		}
		divElem.appendChild(spanElem);
		
		if( ((j+1) % 5) == 0){
			brElem = document.createElement("br");
			divElem.appendChild(brElem);
			
			brElem = document.createElement("br");
			divElem.appendChild(brElem);
		}
	}
	
	var btnElem = document.getElementById("SentakuOnZairyoSentakuTab");
	btnElem.style.fontSize = "20px";
}

function ZairyoSentaku(){
	var textElem;
	
	if(g_SyuyouZairyoTuikaNumber == 1){
		textElem = document.getElementById("Zairyo1OnRyoriTyusyutuTab");
	}else if(g_SyuyouZairyoTuikaNumber == 2){
		textElem = document.getElementById("Zairyo2OnRyoriTyusyutuTab");
	}else if(g_SyuyouZairyoTuikaNumber == 3){
		textElem = document.getElementById("Zairyo3OnRyoriTyusyutuTab");
	}else if(g_SyuyouZairyoTuikaNumber == 4){
		textElem = document.getElementById("Zairyo4OnRyoriTyusyutuTab");
	}else if(g_SyuyouZairyoTuikaNumber == 5){
		textElem = document.getElementById("Zairyo5OnRyoriTyusyutuTab");
	}
	textElem.value = Cr_ZairyoMei;
	
	HiddenAllTab();
	DisplayTab(TAB_RYORI_TYUSYUTU);
	
}

function GetZairyoList(category){
	var zairyo;
	var resultList = [];
	
	for(var i=0; i<g_RyoriAndZairyo.zairyoMeiList.length; i++){
		zairyo = g_RyoriAndZairyo.zairyoMeiList[i];
		if(zairyo.category == category){
			resultList.push(zairyo);
		}else if(zairyo.subcategory == category){
			resultList.push(zairyo);
		}
	}
	return resultList;
}
function Test1(){
	var category;
	var subcategory="";
	var zairyoMei;
	var zairyo;
	
	
	category = "野菜";
	zairyoMei = "キャベツ";
	zairyo = new Zairyo(category, zairyoMei, subcategory);	
	g_ZairyoList.push(zairyo);

	category = "野菜";
	zairyoMei = "トマト";
	zairyo = new Zairyo(category, zairyoMei, subcategory);	
	g_ZairyoList.push(zairyo);
	
	category = "野菜";
	zairyoMei = "レタス";
	zairyo = new Zairyo(category, zairyoMei, subcategory);	
	g_ZairyoList.push(zairyo);
	
	category = "野菜";
	zairyoMei = "ナス";
	zairyo = new Zairyo(category, zairyoMei, subcategory);	
	g_ZairyoList.push(zairyo);
	
	category = "野菜";
	zairyoMei = "ニンジン";
	zairyo = new Zairyo(category, zairyoMei, subcategory);	
	g_ZairyoList.push(zairyo);
	
	category = "野菜";
	zairyoMei = "セロリ";
	zairyo = new Zairyo(category, zairyoMei, subcategory);	
	g_ZairyoList.push(zairyo);
	
	category = "魚";	
	zairyoMei = "サンマ";
	zairyo = new Zairyo(category, zairyoMei, subcategory);	
	g_ZairyoList.push(zairyo);
	
	category = "肉";	
	zairyoMei = "鶏肉";
	zairyo = new Zairyo(category, zairyoMei, subcategory);	
	g_ZairyoList.push(zairyo);
	
	category = "調味料";	
	zairyoMei = "唐辛子";
	zairyo = new Zairyo(category, zairyoMei, subcategory);	
	g_ZairyoList.push(zairyo);
}

function AddZairyoCategory(category){
	var newFlg = true;
	for(var i=0; i<g_ZairyoCategoryList.length; i++){
		if(g_ZairyoCategoryList[i] == category){
			newFlg = false;
			break;
		}
	}
	
	if(newFlg == true){
		g_ZairyoCategoryList.push(category);
	}
}
function ImportDataOnDataImportTab(){
      var fileRef = document.getElementById('fileOnDataImportTab');
	  var content;
	  var category1;
	  var subcategory1;
	  
      if (1 <= fileRef.files.length) {
			var reader = new FileReader();
			//ファイル読み出し完了後の処理を記述
			reader.onload = function (theFile) {
			var content = theFile.target.result;
			g_RyoriAndZairyo = JSON.parse(content);
			for(var i=0; i<g_RyoriAndZairyo.zairyoMeiList.length; i++){
				category1 =  g_RyoriAndZairyo.zairyoMeiList[i].category;
				subcategory1 = g_RyoriAndZairyo.zairyoMeiList[i].subcategory;
				
				if(!g_ZairyoCategoryList.includes(category1)){
					g_ZairyoCategoryList.push(category1);
				}
				
				if(subcategory1 != "" && !g_ZairyoCategoryList.includes(subcategory1)){
					g_ZairyoCategoryList.push(subcategory1);
				}
			}
			Cr_ZairyoCategory = g_ZairyoCategoryList[0];
			DataImportFlg = true;
			DisplayDataImportTab();
        }

		//ファイル読み出し
        reader.readAsText(fileRef.files[0], "utf-8");

      }
}

var g_reader = new FileReader();
var g_File;
var fileElem = document.getElementById("fileOnDataImportExportTab");
fileElem.onchange = function(event) {
    g_File = event.target.files[0];
};

function SearchRyori(searchZairyoList, keyword){
	var useFlg;
	var resultList = [];
	var ryori, zairyoList1;
	var useZairyo;
	
loop1: for(var i=0; i<g_RyoriAndZairyo.ryoriList.length; i++){
		ryori = g_RyoriAndZairyo.ryoriList[i];
		
		zairyoList1 = ryori.zairyoList;
loop2:	for(var j=0; j<searchZairyoList.length; j++){
			useFlg = false;
			for(var k=0; k<zairyoList1.length; k++){
				if(zairyoList1[k] == searchZairyoList[j]){
					useFlg = true;
					break;
				}
			}
			if(useFlg == false){
				continue loop1;
			}
		}
		if(keyword == "" || ryori.bikou.indexOf(keyword) != -1){
			resultList.push(ryori);
		}
	}
	
	return resultList;
}

function RyoriTyusyutuOnRyoriTyusyutuTab(){
	var zairyoList = [];
	var keyword;
	var zairyo;
	var ryoriList1;
	
	textElem = document.getElementById("KeyWordOnRyoriTyusyutuTab");
	keyword = textElem.value;
	
	textElem = document.getElementById("Zairyo1OnRyoriTyusyutuTab");
	zairyo = textElem.value;
	if(zairyo != ""){
		zairyoList.push(zairyo);
	}

	textElem = document.getElementById("Zairyo2OnRyoriTyusyutuTab");
	zairyo = textElem.value;
	if(zairyo != ""){
		zairyoList.push(zairyo);
	}
	
	textElem = document.getElementById("Zairyo3OnRyoriTyusyutuTab");
	zairyo = textElem.value;
	if(zairyo != ""){
		zairyoList.push(zairyo);
	}
	
	textElem = document.getElementById("Zairyo4OnRyoriTyusyutuTab");
	zairyo = textElem.value;
	if(zairyo != ""){
		zairyoList.push(zairyo);
	}

	textElem = document.getElementById("Zairyo5OnRyoriTyusyutuTab");
	zairyo = textElem.value;
	if(zairyo != ""){
		zairyoList.push(zairyo);
	}

	ryoriList = SearchRyori(zairyoList, keyword);
	
	var spanElem = document.getElementById("HitCountOnRyoriTyusyutuTab");
	spanElem.innerHTML = ryoriList.length;
	
	// 0~ryoriList.length;
	var random1 = Math.floor(Math.random() * ryoriList.length);
	DisplayRyoriDiv(ryoriList[random1]);
}
function DisplayRyoriDiv(ryori){
	var divElem;
	var spanElem;
	var brElem;
	var hrefElem;
	
	
	divElem = document.getElementById("RyoriDivOnTyusyutuBtnOnRyoriTyusyutuTab");
	//カテゴリーのDivをクリア
	while(divElem.firstChild != null){ divElem.removeChild(divElem.firstChild); }
	
	spanElem = document.createElement("span");
	spanElem.innerHTML = "料理名:";
	spanElem.innerHTML += ryori.ryoriMei;
	divElem.appendChild(spanElem);
	
	brElem = document.createElement("br");
	divElem.appendChild(brElem);
	
	spanElem = document.createElement("span");
	spanElem.innerHTML = "主要材料:";
	for(var i=0; i<ryori.zairyoList.length; i++){
		if(i != 0){
			spanElem.innerHTML += ",　";
		}
		spanElem.innerHTML += ryori.zairyoList[i];
	}
	divElem.appendChild(spanElem);
	
	brElem = document.createElement("br");
	divElem.appendChild(brElem);
	
	spanElem = document.createElement("span");
	spanElem.innerHTML = "レシピURL:";
	divElem.appendChild(spanElem);
	
	hrefElem = document.createElement("a");
	hrefElem.href = ryori.recipeURL;
	hrefElem.innerHTML = ryori.recipeURL;
	hrefElem.target = "_blank";
	divElem.appendChild(hrefElem);
	
	brElem = document.createElement("br");
	divElem.appendChild(brElem);
	
	spanElem = document.createElement("span");
	spanElem.innerHTML = "所要時間:";
	spanElem.innerHTML += ryori.syoyouJikan;
	spanElem.innerHTML += "分";
	divElem.appendChild(spanElem);
	
	brElem = document.createElement("br");
	divElem.appendChild(brElem);
	
	spanElem = document.createElement("span");
	spanElem.innerHTML = "備考:";
	spanElem.innerHTML += ryori.bikou;
	divElem.appendChild(spanElem);
	
	brElem = document.createElement("br");
	divElem.appendChild(brElem);
}


//材料のコンストラクタ
function Zairyo(category, zairyoMei, subcategory){
	this.category = category;
	this.zairyoMei = zairyoMei;
	this.subcategory = subcategory;
	
	AddZairyoCategory(category);
	if(subcategory != ""){
		AddZairyoCategory(subcategory);
	}
}
//料理のコンストラクタ
function Ryori(ryoriMei, zairyoMeiList, recipeURL, syoyouJikan, bikou){
	this.ryoriMei = ryoriMei;
	this.zairyoMeiList = zairyoMeiList;
	this.recipeURL = recipeURL;
	this.syoyouJikan = syoyouJikan;
	this.bikou = bikou;
} 