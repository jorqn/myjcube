define('oll/OLLTrainerSetupDiv', ['utils/MyQueryString'], function(MyQueryString) {
    var doZoom;

    function updateZoom() {
	if(doZoom) {
//	    document.body.style.margin = 0;
	    var zoomFactor = window.innerWidth / 300;
	    document.body.style.zoom = zoomFactor;
	}
    }
    
    var OLLTrainerSetupDiv = function(ollConfigDisplay, trainerPage, layout, cookieSuffix, setupPage) {
	doZoom = window.mobileMode;
	updateZoom();
	window.addEventListener('resize', updateZoom);
	
	this.ollConfigDisplay = ollConfigDisplay;
	this.selects = [];
	this.trainerPage = trainerPage;
        this.enableOnly = true;
	this.setupPage = setupPage;
	this.layout = layout;
	this.cookieSuffix = cookieSuffix || "";
	this.somethingHasChanged = false;
	if(!MyQueryString.getValue('write')) {
	    MyQueryString.addFromCookie('trainerQuery'+this.cookieSuffix);
	}
	this.div = document.createElement('div');
	this.openTrainingButton = this.createButton("<b>Start training</b>", function() {
	    if(_this.somethingHasChanged) {
		if(window.mobileMode && !confirm('Save settings and start training ?')) {
		    return;
		}
		_this.saveSettings();
	    }
            window.location.href = _this.trainerPage;
	});
	this.openTrainingWithoutSavingButton = this.createButton("Start without saving", function() {
	    var args = _this.getSaveArgs();
	    window.open(_this.trainerPage + "?urlargs=true&" + args);
	});
	this.sequenceLength = document.createElement('input');
	
	this.sequenceLength.value = MyQueryString.getIntValue('length') || 25;
	this.sequenceLength.type = 'text';
	this.sequenceLength.style.width = '50px';
	this.sequenceLength.addEventListener('input', function() {
	    _this.notifyChange();
	});

	var _this = this;
	this.saveButton = this.createButton("Save settings", function() {
	    if(window.mobileMode && !confirm('Save settings ?')) {
		return;
	    }
	    if(!window.mobileMode) {
		alert('Settings saved');
	    }
            _this.saveSettings();
	});
	this.div.appendChild(this.saveButton);
	this.div.appendChild(document.createTextNode(" - "));
	this.div.appendChild(this.openTrainingButton);
	this.div.appendChild(document.createElement('br'));
	this.div.appendChild(this.openTrainingWithoutSavingButton);
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
//	_this.div.appendChild(document.createTextNode(" - "));
//	addAllToButton('easy');
	if(window.mobileMode) {
	    _this.div.appendChild(document.createElement("br"));
	} else {
	    _this.div.appendChild(document.createTextNode(" - "));
	}
	addAllToButton('normal');
//	_this.div.appendChild(document.createTextNode(" - "));
//	addAllToButton('hard');
	if(window.mobileMode) {
	    _this.div.appendChild(document.createElement("br"));
	} else {
	    _this.div.appendChild(document.createTextNode(" - "));
	}
	addAllToButton('new');
	this.div.appendChild(document.createElement('br'));
	this.div.appendChild(document.createTextNode("Sequence length: "));
	this.div.appendChild(this.sequenceLength);

	this.initLists = {
	    exclude: MyQueryString.getIntArrayValue('exclude'),
//	    easy: MyQueryString.getIntArrayValue('easy'),
//	    hard: MyQueryString.getIntArrayValue('hard'),
	    new: MyQueryString.getIntArrayValue('new')
	};

	this.casesDiv = document.createElement('div');
	this.casesDiv.style.position = 'relative';
	this.div.appendChild(this.casesDiv);
	var y = 0;
	var i = 0, id;
	for(i = 0; i < layout.length; i++) {
	    var j = 0;
	    for(j = 0; j < layout[i].length; j++) {
		id = layout[i][j];
		if(id !== null) {
		    this.casesDiv.appendChild(this.createDivCase(id, 120*j, y));
		}
	    }
	    if(layout[i].length) {
		y += 120;
	    } else {
		y += 40;
	    }
	}
    };
    OLLTrainerSetupDiv.prototype.notifyChange = function() {
	this.somethingHasChanged = true;
    };
    function formattedDate(date) {
	if(!date) return "never"
	var d = new Date(date || Date.now()),
            day = '' + d.getDate(),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('/');
    }
    OLLTrainerSetupDiv.prototype.createDivCase = function(id, x, y) {
	var div = document.createElement('span');
	var canvas = this.ollConfigDisplay.createCanvas(id);
        var _this = this;
        if(this.enableOnly) {
            canvas.addEventListener('dblclick', function() {
                window.open(_this.trainerPage + "?only=" + id);
            });
	    var timeout;
	    canvas.addEventListener('mousedown', function() {
		timeout = setTimeout(function() {
		    var timeMap =  MyQueryString.getIntMapValue('timeStamps');
		    var counterMap = MyQueryString.getIntMapValue('counter');
		    var date = formattedDate(timeMap[id]);
		    alert('Training count: ' + (counterMap[id] || 0) + '\n' + 'Last date: ' + date);
		}, 1000);
	    });
	    canvas.addEventListener('mouseup', function() {
		clearTimeout(timeout);
	    });
	    canvas.addEventListener('mouseout', function() {
		clearTimeout(timeout);
	    });
            canvas.style.cursor = 'hand';
        }
	div.appendChild(canvas);
	function onChange(event, init) {
	    switch(select.value) {
	    case 'exclude':
		canvas.style.opacity = 1;
		canvas.style.backgroundColor = "gray";
		break;
	    // case 'hard':
	    // 	canvas.style.opacity = 1;
	    // 	canvas.style.backgroundColor = "orange";
	    // 	break;
	    case 'new':
		canvas.style.opacity = 1;
		canvas.style.backgroundColor = "red";
		break;
	    // case 'easy':
	    // 	canvas.style.opacity = 1;
	    // 	canvas.style.backgroundColor = "lightGreen";
	    // 	break;
	    default:
		canvas.style.opacity = 1;
		canvas.style.backgroundColor = "transparent";
		break;
	    }
	    if(!init) {
		_this.notifyChange();
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
	div.style.left = x + 'px';
	div.style.top = /*100 +*/ y + 'px';
//	div.style.backgroundColor = 'red';
	div.style.opacity = 1;
	onChange(null, true);
	return div;
    }
    OLLTrainerSetupDiv.prototype.createSelect = function(onChange) {
	var select = document.createElement('select');
	var options = [
	    {text: 'Exclude', value: 'exclude'},
//	    {text: 'Easy', value: 'easy'},
	    {text: 'Normal', value: 'normal'},
//	    {text: 'Hard', value: 'hard'},
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
       OLLTrainerSetupDiv.prototype.getSaveArgs = function() {
	   var lists = { exclude: [], new: [], normal: []};
	   var i, value;
	   for(i = 0; i < this.selects.length; i++) {
	       value = this.selects[i].value;
	       if(!lists[value]) {
		   alert('Unknown list');
	       }
	       lists[value].push(this.selects[i].configId);
	   }
	   console.log(lists);
	   var args = "length="+this.sequenceLength.value, key;
	   for(key in lists) {
	       if(key != 'normal') {
		   args += "&";
		   args += key + "=";
		   if(lists[key].length) {
		       for(i = 0; i < lists[key].length;i++) {
			   if(i > 0) {
			       args+=",";
			   }
			   args+=lists[key][i];
		       }
		   } else {
		       args += "empty";
		   }
	       }
	   }
	   return args;
       };
    OLLTrainerSetupDiv.prototype.saveSettings = function() {
	var exdays = 60;
	var d = new Date();
	var args = this.getSaveArgs();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = "trainerQuery" + this.cookieSuffix + "="+ args.replace(/=/g, "@") + "; " + expires ;
	this.somethingHasChanged = false;
    }
    OLLTrainerSetupDiv.prototype.createButton = function(text, onclick) {
	var button;
	button = document.createElement("a");
	button.className = 'button';
	button.innerHTML = text;
	button.onclick = onclick;
	return button;
    }
    return OLLTrainerSetupDiv;
});
