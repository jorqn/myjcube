(function() {
    "use strict";
    var topDiv = document.createElement("div");
    topDiv.className = "topPane";
    document.body.appendChild(topDiv);
    var leftDiv = document.createElement("div");
    leftDiv.className = "leftPane";
    document.body.appendChild(leftDiv);

    var pageId = window.pageId;
    function buildSubPath(item) {
	if(item.id === pageId) {
	    return [item];
	}
	var i, path, node;
	for(i = 0; i < item.children.length; i++) {
	    node = item.children[i];
	    path = buildSubPath(node);
	    if(path) {
		return [item].concat(path);
	    }
	}
	return null;
    }
    var path = buildSubPath(window.menuData.navigationRoot);
    function displayLevel(index) {
	var i;
	var node = path[index], element, child;
	for(i = 0; i < node.children.length; i++) {
	    child = node.children[i];
	    element = document.createElement("h"+(1+index));
	    element.innerText = child.shortTitle;
	    leftDiv.appendChild(element);
	    if(child === path[index+1]) {
		displayLevel(index+1);
	    }
	}
    }
    displayLevel(0);
})();
