define('oll/CaseConfigurator', ['utils/MyQueryString'], function(MyQueryString) {
    var CaseConfigurator = function (ollConfigDisplay, initLists, trainerPage) {
	this.ollConfigDisplay = ollConfigDisplay;
	this.initLists = initLists;
	this.trainerPage = trainerPage;
    };
    CaseConfigurator.prototype.createConfiguratorDiv = function(id, onCloseCB) {
	var div = document.createElement('div');
	div.styles.backgroundColor = "rgba(1,1,1,0.5)";
	var rotate1 = document.createElement('input');
	rotate1.type = 'button';
	rotate1.value = '<-- rotate';
	rotate1.addEventListener('click', function () {
	});
	div.appendChild(rotate1);
	var rotate2 = document.createElement('input');
	rotate2.type = 'button';
	rotate2.value = 'rotate -->';
	rotate2.addEventListener('click', function() {
	    
	});
	div.appendChild(rotate2);
	div.appendChild(document.createElement('br'));
	var divCase = this.createDivCase(id);
	div.appendChild(divCase);
	div.appendChild(document.createElement('br'));
	var trainOnly = document.createElement('input');
	trainOnly.type = 'button';
	trainOnly.value = 'Train';
	trainOnly.addEventListener('click', function() {
	});
	div.appendChild(trainOnly);
	var close = document.createElement('input');
	close.type = 'button';
	close.value = 'Close';
	close.addEventListener('click', onCloseCB);
	div.appendChild(close);
    }
    CaseConfigurator.prototype.createDivCase = function(id, notifyChangeCB) {
	var div = document.createElement('span');
	var canvas = this.ollConfigDisplay.createCanvas(id);
        var _this = this;
	if(_this.trainerPage) {
            canvas.addEventListener('dblclick', function() {
		window.open(_this.trainerPage + "?only=" + id);
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
	    if(!init && notifyChangeCB) {
		notifyChangeCB();
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
	div.mySelect = select;
	div.appendChild(select);
	onChange(null, true);
	return div;
    };
    CaseConfigurator.prototype.createSelect = function(onChange) {
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
