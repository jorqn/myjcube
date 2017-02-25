define('oll/OLLTrainerSetupDiv', ['utils/MyQueryString', 'oll/CaseConfigurator'], function(MyQueryString, CaseConfigurator) {
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
	this.cookieSuffix = cookieSuffix || "";
	MyQueryString.addFromCookie('trainerQuery'+this.cookieSuffix);
	this.initLists = {
	    exclude: MyQueryString.getIntArrayValue('exclude'),
	    new: MyQueryString.getIntArrayValue('new')
	};

	this.caseConfigurator = new CaseConfigurator(ollConfigDisplay, this.initLists, trainerPage);
	this.ollConfigDisplay = ollConfigDisplay;
	this.selects = [];
	this.trainerPage = trainerPage;
        this.enableOnly = true;
	this.setupPage = setupPage;
	this.layout = layout;
	this.somethingHasChanged = false;
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
	this.openOnlyNewTrainingButton = this.createButton("Start training only new", function() {
	    if(_this.somethingHasChanged) {
		if(window.mobileMode && !confirm('Save settings and start training ?')) {
		    return;
		}
		_this.saveSettings();
	    }
            window.location.href = _this.trainerPage+"?onlyNew=true";
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
	if(window.mobileMode) {
	    this.div.appendChild(document.createElement('br'));
	} else {
	    this.div.appendChild(document.createTextNode(" - "));
	}
	this.div.appendChild(this.openOnlyNewTrainingButton);
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

	this.casesDiv = document.createElement('div');
	this.casesDiv.style.position = 'relative';
	this.div.appendChild(this.casesDiv);
	var y = 0;
	var i = 0, id, divCase;
	for(i = 0; i < layout.length; i++) {
	    var j = 0;
	    for(j = 0; j < layout[i].length; j++) {
		id = layout[i][j];
		if(id !== null) {
		    divCase = this.caseConfigurator.createDivCase(id, 120*j, y, this.notifyChange.bind(this), this.onCaseAction.bind(this, id));
		    this.selects.push(divCase.mySelect);
		    divCase.style.opacity = 1;
		    this.casesDiv.appendChild(divCase);
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
    OLLTrainerSetupDiv.prototype.onCaseAction = function(id) {
//	window.open(this.trainerPage + "?only=" + id);
        var gray = document.createElement('div');
        gray.style.position = "absolute";
        gray.style.top = document.body.scrollTop + "px";
        window.addEventListener('scroll', function () {
            gray.style.top = document.body.scrollTop + "px";
        });
        gray.style.left = "0px";
        gray.style.width = "100%";
        gray.style.height = "100%";
        gray.style.backgroundColor = "rgba(0,0,0,0.3)";
        var div = this.caseConfigurator.createConfiguratorDiv(id, undefined, undefined, function onClose() {
            document.body.removeChild(gray);
        });
        div.style.position="absolute";
        // div.style.position.top = "50px";
        // div.style.position.left = "50px";
        div.style.top = 0;
        div.style.left = 0;
        div.style.bottom = 0;
        div.style.right = 0;
        div.style.margin = "auto";
        div.style.zIndex = 10;
        gray.appendChild(div);
        document.body.appendChild(gray);
    },
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
