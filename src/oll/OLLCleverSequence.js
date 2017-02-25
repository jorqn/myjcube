define('oll/OLLCleverSequence', ['oll/OLLConfigs', 'utils/MyQueryString'], function(OLLConfigs, MyQueryString) {
    "use strict";
    var OLLCleverSequence = function(params) {
	params = params || {};

	this.cookieName = params.pll ? "PLLHistory" : "OLLHistory";
	MyQueryString.addFromCookie(this.cookieName);
	this.timeMap = MyQueryString.getIntMapValue("timeStamps");
	this.counterMap = MyQueryString.getIntMapValue("counter");
	var i;
	// var timeValues = MyQueryString.getIntArrayValue("timeStamps") || [];
	// var i = 0;
	// for(i = 0; i < timeValues.length; i+= 2) {
	//     this.timeMap[timeValues[i]] = timeValues[i+1];
	// }
	// var counterMap = {};
	// var counterValues = MyQueryString.getIntArrayValue("counter");
	// for(i = 0; i < counterValues.length; i+= 2) {
	//     this.counterMap[counterValues[i]] = counterValues[i+1];
	// }

	this.excludeCases = params.excludeCases || [];
//	this.easyCases = params.easyCases || [];
	this.newCases = params.newCases || [];
//	this.hardCases = params.hardCases || [];
	this.middleCases = [];
	for(i = 0; i < OLLConfigs.nbOLLConfigs; i++) {
	    if(/*this.easyCases.indexOf(i+1) < 0 && this.hardCases.indexOf(i+1) < 0 && */this.excludeCases.indexOf(i+1) < 0 && this.newCases.indexOf(i+1) < 0) {
		this.middleCases.push(i+1);
	    }
	}
	if(params.pll) {
	    for(i = 1000; i < 1000+OLLConfigs.nbPLLConfigs; i++) {
		if(/*this.easyCases.indexOf(i+1) < 0 && this.hardCases.indexOf(i+1) < 0 && */this.excludeCases.indexOf(i+1) < 0 && this.newCases.indexOf(i+1) < 0) {
		    this.middleCases.push(i+1);
		}
	    }
	}
    };

    OLLCleverSequence.prototype.onSuccess = function(index) {
	var time = (new Date()).getTime();
	var id = this.sequence[index];
	this.timeMap[id] = time;
	var oldCounter = this.counterMap[id] || 0;
	this.counterMap[id] = oldCounter+1;
	// var timeValues = [];
	// var key;
	// for(key in this.timeMap) {
	//     timeValues.push(key, this.timeMap[key]);
	// }
	// MyQueryString.setArrayValue("timeStamps", timeValues);
	// var counterValues = [];
	// for(key in this.counterMap) {
	//     counterValues.push(key, this.counterMap[key]);
	// }
	// MyQueryString.setArrayValue("counter", counterValues);
	MyQueryString.setMapValue("timeStamps", this.timeMap);
	MyQueryString.setMapValue("counter", this.counterMap);
	MyQueryString.saveToCookie(this.cookieName, 60, ["timeStamps", "counter"]);
    };

    OLLCleverSequence.prototype.buildSequence = function(length) {
	var _this = this;
	function buildCaseList(list) {
	    var rval = [];
	    var i, time, timeMapValue;
	    for(i = 0; i < list.length; i++) {
		timeMapValue = _this.timeMap[list[i]];
		time = timeMapValue ? (Math.floor(timeMapValue / (1000*3600*2))) : 0;
		rval.push({ id: list[i], time: time });
	    }
	    rval.sort(function (a,b) {
		return a.time - b.time;
	    });
	    return rval;
	}
	function pickInList(list, remove) {
	    var index = Math.floor(Math.random()*list.length);
	    var result = list[index];
	    if(remove) {
		list.splice(index, 1);
	    }
	    return result;
	}
    

	var lists = {
//	    easyCases: buildCaseList(this.easyCases.concat([])),
	    middleCases: buildCaseList(this.middleCases.concat([])),
//	    hardCases: buildCaseList(this.hardCases.concat([])),
	    newCases: buildCaseList(this.newCases.concat([])),
	};

	var listHat = !MyQueryString.getBoolValue('onlyNew') ? [ 'middleCases', 'middleCases',
						   'newCases', 'newCases', 'newCases', 'newCases', 'newCases', 'newCases', 'newCases', 'newCases']
	    : ['newCases'];
	function removeEmptyLists() {
	    var i;
	    for(i = listHat.length - 1; i >= 0; i--) {
		if(lists[listHat[i]].length === 0) {
		    listHat.splice(i, 1);
		}
	    }
	}

	function pickInListWithTime(list) {
	    var time = list[0].time;
	    var length = 1;
	    while(length < list.length && list[length].time === time) {
		length ++;
	    }
	    
	    var index = Math.floor(Math.random()*length);
	    var result = list[index].id;
	    list.splice(index, 1);
	    return result;
	}

	function pickNext() {
	    var listName = pickInList(listHat);
	    return pickInListWithTime(lists[listName]);
	}


	removeEmptyLists();
	this.sequence = [];
	while(this.sequence.length < length && listHat.length > 0) {
	    this.sequence.push(pickNext());
	    removeEmptyLists();
	}
	
    }

    // OLLCleverSequence.prototype.buildMelange = function () {
    // 	this.melange = [];
    // 	this.melange = this.melange.concat(this.easyCases);
    // 	this.melange = this.melange.concat(this.middleCases);
    // 	this.melange = this.melange.concat(this.middleCases);
    // 	this.melange = this.melange.concat(this.hardCases);
    // 	this.melange = this.melange.concat(this.hardCases);
    // 	this.melange = this.melange.concat(this.hardCases);
    // 	this.melange = this.melange.concat(this.hardCases);
    // 	this.melange = this.melange.concat(this.newCases);
    // 	this.melange = this.melange.concat(this.newCases);
    // 	this.melange = this.melange.concat(this.newCases);
    // 	this.melange = this.melange.concat(this.newCases);
    // 	this.melange = this.melange.concat(this.newCases);
    // 	this.melange = this.melange.concat(this.newCases);
    // 	this.melange = this.melange.concat(this.newCases);
    // 	this.melange = this.melange.concat(this.newCases);
    // };

    // OLLCleverSequence.prototype.getIndex = function() {
    // 	return Math.floor((Math.random() * this.melange.length));
    // }

    // OLLCleverSequence.prototype.removeConfig = function(index) {
    // 	this.melange = this.melange.filter(function(elt) {
    // 	    return elt !== index;
    // 	});
    // }

    // OLLCleverSequence.prototype.add = function() {
    // 	var index;
    // 	index = this.getIndex();
    // 	this.sequence.push(this.melange[index]);
    // 	this.removeConfig(this.melange[index]);
    // }

    // OLLCleverSequence.prototype.buildSequence = function(length) {
    // 	this.buildMelange();
    // 	this.sequence = [];

    // 	var i;
    // 	for(i = 0; i < length && this.melange.length > 0; i++) {
    // 	    this.add();
    // 	}

    // };

    return OLLCleverSequence;
});
