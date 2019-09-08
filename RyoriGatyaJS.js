const TAB_RYORI_TYUSYUTU = "tab_RyoriTyusyutu"
const TAB_DATA_I = "tab_DataImport"
const TAB_ZAIRYO_SENTAKU = "tab_ZairyoSentaku"

var AllTabNameList = [
TAB_RYORI_TYUSYUTU,
TAB_DATA_I,
TAB_ZAIRYO_SENTAKU
];

var g_ZairyoList = [];
var g_ZairyoCategoryList = [];
var Cr_ZairyoCategory = "";
var Cr_ZairyoMei = "";

var g_SyuyouZairyo1 = "";
var g_SyuyouZairyo2 = "";
var g_SyuyouZairyo3 = "";
var g_SyuyouZairyoTuikaNumber = "";

InitTab();
Test1();
Init();

function InitTab(){
	HiddenAllTab();
	DisplayTab(TAB_DATA_I);
}

function Init(){
	Cr_ZairyoCategory = g_ZairyoList[0].category;
	Cr_ZairyoMei = "";
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
	}
	
	HiddenAllTab();
	DisplayTab(TAB_ZAIRYO_SENTAKU);
}

function DisplayRyoriTyusyutuTab(){
}
function DisplayDataImportTab(){
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
	for(var j=0; j<zairyoList.length; j++){
		spanElem = document.createElement("span");
		spanElem.innerHTML = "　";
		spanElem.innerHTML += zairyoList[j].zairyoMei;
		spanElem.innerHTML += "　";
		if(zairyoList[j].zairyoMei == Cr_ZairyoMei){
			spanElem.style.border = "thick solid rgb(255, 0, 0)";
			spanElem.style.color = "red";
		}else{
			spanElem.style.border = "thick solid rgb(0, 0, 0)";
			spanElem.style.color = "black";
		}
		spanElem.style.fontWeight = "bold";
		spanElem.style.margin = "20px 5px";
		spanElem.value = zairyoList[j].zairyoMei;
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
	}
	textElem.value = Cr_ZairyoMei;
	
	HiddenAllTab();
	DisplayTab(TAB_RYORI_TYUSYUTU);
	
}

function GetZairyoList(category){
	var zairyo;
	var resultList = [];
	
	for(var i=0; i<g_ZairyoList.length; i++){
		zairyo = g_ZairyoList[i];
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