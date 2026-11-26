// Wraps "tsLAN" in a .brand span, so text the CSS uppercases keeps the
// lowercase "ts". Covers text built at runtime, such as the phone menu
// and rendered markdown.
function markBrand(root) {
	var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
	var found = [];
	while (walker.nextNode()) {
		var node = walker.currentNode;
		var parent = node.parentNode;
		if (node.nodeValue.indexOf('tsLAN') < 0) continue;
		if (/^(SCRIPT|STYLE|TEXTAREA)$/.test(parent.nodeName)) continue;
		if (parent.classList.contains('brand')) continue;
		found.push(node);
	}
	found.forEach(function(node) {
		var fragment = document.createDocumentFragment();
		node.nodeValue.split('tsLAN').forEach(function(part, index) {
			if (index > 0) {
				var brand = document.createElement('span');
				brand.className = 'brand';
				brand.textContent = 'tsLAN';
				fragment.appendChild(brand);
			}
			if (part) fragment.appendChild(document.createTextNode(part));
		});
		node.parentNode.replaceChild(fragment, node);
	});
}

markBrand(document.body);
