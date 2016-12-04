define('oll/OLLTrainerSetupDiv', ['utils/MyQueryString'], function(MyQueryString) {
    var OLLTrainerSetupDiv = function(ollConfigDisplay, trainerPage, layout, cookieSuffix) {
	this.ollConfigDisplay = ollConfigDisplay;
	this.selects = [];
	this.trainerPage = trainerPage;
	this.layout = layout;
	this.cookieSuffix = cookieSuffix || "";
	// var layout = [[49, 50],
	// 	      [51, 52],
	// 	      [55, 56],
	// 	      [57],
	// 	      [],
	// 	      [1,2],
	// 	      [3,4],
	// 	      [5,6],
	// 	      [7,30],
	// 	      [],
	// 	      [47,48],
	// 	      [],
	// 	      [45,46],
	// 	      [],
	// 	      [20,21],
	// 	      [],
	// 	      [22,23],
	// 	      [24,25],
	// 	      [43,44],
	// 	      [],
	// 	      [8,9],
	// 	      [10,11],
	// 	      [],
	// 	      [35,36],
	// 	      [37,38],
	// 	      [],
	// 	      [12,13],
	// 	      [14,15],
	// 	      [16,17],
	// 	      [],
	// 	      [33,34],
	// 	      [],
	// 	      [18,19],
	// 	      [31,32],
	// 	      [],
	// 	      [26,27],
	// 	      [28,29],
	// 	      [],
	// 	      [39,40],
	// 	      [41,42],
	// 	      [],
	// 	      [53,54]
	// 	     ];
	if(!MyQueryString.getValue('write')) {
	    MyQueryString.addFromCookie('trainerQuery');
	}
	this.div = document.createElement('div');
	this.openTrainingButton = this.createButton("<b>Start training</b>", function() {
	    _this.openPage(_this.trainerPage);
	});
	this.sequenceLength = document.createElement('input');
	
	this.sequenceLength.value = MyQueryString.getIntValue('length') || 25;
	this.sequenceLength.type = 'text';
	this.sequenceLength.style.width = '50px';

	// this.resetButton = document.createElement("input");
	// this.resetButton.type = "button";
	// this.resetButton.value = "Reset";
	// this.resetButton.onclick = function() {
	//     window.location.href = "OLLTrainerSetup.html?write=true";
	// }


	var _this = this;
	this.div.appendChild(this.createButton("Save settings", function() {
	    _this.openPage("OLLTrainerSetup.html");	    
	}));
	this.div.appendChild(document.createTextNode(" - "));
	this.div.appendChild(this.openTrainingButton);
	this.div.appendChild(document.createElement('br'));
	this.div.appendChild(document.createElement('br'));

	function addAllToButton(value) {
	    _this.div.appendChild(_this.createButton("All to " + value, function() {
		var i;
		for(i = 0; i < _this.selects.length; i++) {
		    _this.selects[i].value = value;
		    _this.selects[i].onchange();
		}
	    }));
	}

	addAllToButton('exclude');
	_this.div.appendChild(document.createTextNode(" - "));
	addAllToButton('easy');
	_this.div.appendChild(document.createTextNode(" - "));
	addAllToButton('normal');
	_this.div.appendChild(document.createTextNode(" - "));
	addAllToButton('hard');
	_this.div.appendChild(document.createTextNode(" - "));
	addAllToButton('new');
	this.div.appendChild(document.createElement('br'));
	this.div.appendChild(document.createTextNode("Sequence length: "));
	this.div.appendChild(this.sequenceLength);

//	this.div.appendChild(this.resetButton);
	this.initLists = {
	    exclude: MyQueryString.getIntArrayValue('exclude'),
	    easy: MyQueryString.getIntArrayValue('easy'),
	    hard: MyQueryString.getIntArrayValue('hard'),
	    new: MyQueryString.getIntArrayValue('new')
	};

	var i = 0, id;
	for(i = 0; i < layout.length; i++) {
	    var j = 0;
	    for(j = 0; j < layout[i].length; j++) {
		id = layout[i][j];
		if(id !== null) {
		    this.div.appendChild(this.createDivCase(id, j, i));
		}
	    }
//	    this.div.appendChild(document.createElement('br'));
	}
    };
    OLLTrainerSetupDiv.prototype.createDivCase = function(id, x, y) {
	var div = document.createElement('span');
	var canvas = this.ollConfigDisplay.createCanvas(id);
	div.appendChild(canvas);
	function onChange() {
	    switch(select.value) {
	    case 'exclude':
		canvas.style.opacity = 1;
		canvas.style.backgroundColor = "gray";
		break;
	    case 'hard':
		canvas.style.opacity = 1;
		canvas.style.backgroundColor = "orange";
		break;
	    case 'new':
		canvas.style.opacity = 1;
		canvas.style.backgroundColor = "red";
		break;
	    case 'easy':
		canvas.style.opacity = 1;
		canvas.style.backgroundColor = "lightGreen";
		break;
	    default:
		canvas.style.opacity = 1;
		canvas.style.backgroundColor = "transparent";
		break;
	    }
	}
	var select = this.createSelect(onChange);
	select.configId = id
	var key;
	for(key in this.initLists) {
	    if(this.initLists[key] && this.initLists[key].indexOf(id) >= 0) {
		select.value = key;
	    }
	}
	this.selects.push(select);
	div.appendChild(select);
	div.style.position = 'absolute';
	div.style.left = (120*x) + 'px';
	div.style.top = 100 + (120*y) + 'px';
//	div.style.backgroundColor = 'red';
	div.style.opacity = 1;
	onChange();
	return div;
    }
    OLLTrainerSetupDiv.prototype.createSelect = function(onChange) {
	var select = document.createElement('select');
	var options = [
	    {text: 'Exclude', value: 'exclude'},
	    {text: 'Easy', value: 'easy'},
	    {text: 'Normal', value: 'normal'},
	    {text: 'Hard', value: 'hard'},
	    {text: 'New', value: 'new'}
	];
	var i, option;
	for(i = 0; i < options.length; i++) {
	    option = document.createElement('option');
	    option.text = options[i].text;
	    option.value = options[i].value;
	    if(option.value === 'normal') {
		option.selected = 'selected';
	    }
	    select.appendChild(option);
	}
	select.style.position = 'absolute';
	select.style.left = (this.ollConfigDisplay.size - 100) + 'px';
	select.style.top = (this.ollConfigDisplay.size - 20) + 'px';

	select.onchange = onChange;

	return select;
    };
    OLLTrainerSetupDiv.prototype.openPage = function(pageURL) {
	var lists = {};
	var i, value;
	for(i = 0; i < this.selects.length; i++) {
	    value = this.selects[i].value;
	    if(!lists[value]) {
		lists[value] = [];
	    }
	    lists[value].push(this.selects[i].configId);
	}
	console.log(lists);
	var args = "write=true&length="+this.sequenceLength.value, key;
	for(key in lists) {
	    if(key != 'normal') {
		args += "&";
		args += key + "=";
		for(i = 0; i < lists[key].length;i++) {
		    if(i > 0) {
			args+=",";
		    }
		    args+=lists[key][i];
		}
	    }
	}
	var exdays = 60;
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = "trainerQuery" + this.cookieSuffix + "="+ args.replace(/=/g, "@") + "; " + expires ;
        window.location.href = pageURL + "?"+args;
//	window.open("OLLTrainer.html"+args);
    }
    OLLTrainerSetupDiv.prototype.createButton = function(text, onclick) {
	// var button;
	// button = document.createElement("input");
	// button.type = "button";
	// button.value = text;
	// button.onclick = onclick;
	// return button;
	var button;
	button = document.createElement("a");
	button.className = 'button';
	button.innerHTML = text;
	button.onclick = onclick;
	return button;
    }
    return OLLTrainerSetupDiv;
});
