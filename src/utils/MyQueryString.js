define('utils/MyQueryString', [], function () {
    function createObject(string) {
	var query_string = {};
	var query = string;
	var vars = string.split("&");
	for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
            // If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
		query_string[pair[0]] = decodeURIComponent(pair[1]);
		// If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
		var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
		query_string[pair[0]] = arr;
		// If third or later entry with this name
	    } else {
		query_string[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	} 
	return query_string;
    }
    var QueryString = function () {
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	return createObject(window.location.search.substring(1));
    }();

    var cookies;

    function readCookie(name){
	var c,C,i;
        if(cookies){ return cookies[name]; }

        c = document.cookie.split('; ');
        cookies = {};

        for(i=c.length-1; i>=0; i--){
           C = c[i].split('=');
           cookies[C[0]] = C[1];
        }

        return cookies[name];
    }

    var MyQueryString = {
	addFromCookie: function(name) {
	    if(!this.getBoolValue('urlargs')) {
		var cookie = readCookie(name);
		if(cookie) {
		    var cookieObject = createObject(cookie.replace(/@/g,'='));
		    var key;
		    for(key in cookieObject) {
			if(!QueryString.hasOwnProperty(key)) {
			    QueryString[key] = cookieObject[key];
			}
		    }
		}
	    }
	},
	saveToCookie: function(name, exdays, keys) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = name + "="+ MyQueryString.toQueryString(keys).replace(/=/g, "@") + "; " + expires ;
	},
        getBoolValue: function(name) {
            return this.getValue(name) === "true";
        },
	getValue: function(name) {
	    return QueryString[name];
	},
	setValue: function(name, value) {
	    QueryString[name] = value;
	},
	setArrayValue: function(name, value) {
	    QueryString[name] = this.arrayToQueryStringValue(value);
	},
	setMapValue: function(name, map) {
	    var values = [];
	    var key;
	    for(key in map) {
		values.push(key, map[key]);
	    }
	    this.setArrayValue(name, values);
	    
	},
	getIntValue: function(name) {
	    return QueryString[name] !== undefined ? parseInt(QueryString[name]) : null;
	},
	getIntArrayValue: function(name,separator) {
	    var sep = separator || ',';
	    var value = this.getValue(name);
	    if(value === 'empty') {
		return [];
	    }
	    if(value) {
		var valueSplit = value.split(sep);
		var rval = [];
		var i;
		for(i = 0; i < valueSplit.length; i++) {
		    rval.push(parseInt(valueSplit[i]));
		}
		return rval;
	    } else {
		return null;
	    }
	},
	getIntMapValue: function(name, separator) {
	    var sep = separator || ',';
	    var values = this.getIntArrayValue(name, sep);
	    var i = 0;
	    var map = {};
	    for(i = 0; values && i < values.length; i+= 2) {
		map[values[i]] = values[i+1];
	    }
	    return map;
	},
	arrayToQueryStringValue: function(arrayValue,separator) {
	    var sep = separator || ',';
	    var i, value = '';
	    for(i = 0; i < arrayValue.length; i++) {
		if(i > 0) {
		    value += sep;
		}
		value += arrayValue[i];
	    }
	    return value;
	},
	toQueryString: function(keys) {
	    var key;
	    var rval = "";
	    for(key in QueryString) {
		if(key !== "" && (!keys || keys.indexOf(key) >= 0)) {
		     if(rval !== "") {
			 rval += "&";
		     }
		     rval += key + "=" + QueryString[key];
		}
	    }
	    return rval;
	}
    };
    return MyQueryString;
});
