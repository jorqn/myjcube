define('oll/CaseConfigurator', ['utils/MyQueryString'], function(MyQueryString) {
    var CaseConfigurator = function (ollConfigDisplay, caseTable, trainerPage) {
	this.ollConfigDisplay = ollConfigDisplay;
	this.caseTable = caseTable;
	this.trainerPage = trainerPage;
    };
    CaseConfigurator.prototype.createConfiguratorDiv = function(id, x, y, onCloseCB) {
        var _this = this;
	var div = this.createElement('div', x, y);
	var divCase;
	this.div = div;
        div.style.width = "175px";
        div.style.height = "178px";
	div.style.backgroundColor = "rgba(128,128,128,1)";
	var rotate1 = this.createElement('input', 0, 0);
	rotate1.type = 'button';
	rotate1.value = '<-- rotate';
	rotate1.addEventListener('click', function () {
	    var rotate = _this.caseTable[id].rotate + 3;
	    _this.caseTable[id].rotate = rotate % 4;
	    divCase = _this.refreshDivCase(id, div, divCase);
	});
	div.appendChild(rotate1);
	var rotate2 = this.createElement('input', 100, 0);
	rotate2.type = 'button';
	rotate2.value = 'rotate -->';
	rotate2.addEventListener('click', function() {
	    var rotate = _this.caseTable[id].rotate + 1;
	    _this.caseTable[id].rotate = rotate % 4;
	    divCase = _this.refreshDivCase(id, div, divCase);
	});
	div.appendChild(rotate2);
	divCase = this.refreshDivCase(id, div, divCase);
//	div.appendChild(document.createElement('br'));
//	div.appendChild(document.createElement('br'));
	var trainOnly = this.createElement('input', 70, 150);
	trainOnly.type = 'button';
	trainOnly.value = 'Train';
	trainOnly.addEventListener('click', function() {
            window.open(_this.trainerPage + "?only=" + id);
	    onCloseCB();
	});
	div.appendChild(trainOnly);
	var close = this.createElement('input', 120, 150);
	close.type = 'button';
	close.value = 'Close';
	close.addEventListener('click', onCloseCB);
	div.appendChild(close);
        return div;
    };
    CaseConfigurator.prototype.refreshDivCase = function(id, div, divCase) {
	if(divCase) {
	    div.removeChild(divCase);
	}
	divCase = this.createDivCase(id, 25, 20);
        divCase.style.zIndex = -1;
	divCase = divCase;
	div.appendChild(divCase);
	return divCase;
    };
    CaseConfigurator.prototype.createElement = function(name, x, y) {
        var element = document.createElement(name);
        element.style.position = "absolute";
        element.style.left = x + "px";
        element.style.top = y + "px";
        return element;
    };
    CaseConfigurator.prototype.createDivCase = function(id, x, y, notifyChangeCB, onActionCB) {
	var div = this.createElement('span', x, y);
        div.style.width = this.ollConfigDisplay.size;
        div.style.height = this.ollConfigDisplay.size;
	var canvas = this.ollConfigDisplay.createCanvas(id, 0, 0, this.caseTable[id].rotate);
        var _this = this;
	if(_this.trainerPage) {
            canvas.addEventListener('dblclick', function() {
                onActionCB();
            });
	}
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
	    _this.caseTable[id].list = select.value;
	    if(!init && notifyChangeCB) {
		notifyChangeCB();
	    }
	}
	var select = this.createSelect(onChange);
	select.configId = id
	var key;
        key = this.caseTable[id].list;
        select.value = key;
	// for(key in this.initLists) {
	//     if(this.initLists[key] && this.initLists[key].indexOf(id) >= 0) {
	// 	select.value = key;
	//     }
	// }
	div.mySelect = select;
	div.appendChild(select);
	onChange(null, true);
        div.style.position = "absolute";
        div.style.top = y + "px";
        div.style.left = x + "px";
	return div;
    };
    CaseConfigurator.prototype.createSelect = function(onChange) {
        var select = this.createElement('select', this.ollConfigDisplay.size - 100, this.ollConfigDisplay.size - 20);
//	var select = document.createElement('select');
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
	// select.style.position = 'absolute';
	// select.style.left = (this.ollConfigDisplay.size - 100) + 'px';
	// select.style.top = (this.ollConfigDisplay.size - 20) + 'px';

	select.onchange = onChange;

	return select;
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
    return CaseConfigurator;
});
