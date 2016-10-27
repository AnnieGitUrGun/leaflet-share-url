/* 
 * Leaflet Share URL v1.0.0 - 2016-10-27 
 * 
 * Copyright 2016 Anne Canoune 
 * acano@menv.com 
 * 
 * Licensed under the MIT license. 
 * 
 * Demo: 
 * 
 *
 * Sources: 
 * http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 * https://github.com/makinacorpus/Leaflet.Social
 * 
 */


(function() {

// custom share button control
L.Control.shareURL = L.Control.extend({
	includes: L.Mixin.Events,
	options: {
		position: 'bottomleft',
		shareTitle: 'Copy URL',
		shareText: '<i class="fa fa-link" style="line-height:2;"></i>'
	},

	onAdd: function (map) {
		var controlName = 'alc-control-share',
			container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
			options = this.options;

		this._shareButton = this._createButton(options.shareText, options.shareTitle, controlName + '-copy', container, this._copyURL);

		return container;
	},

	_copyURL: function (e) {
		var url = window.location.href;
		window.prompt("Copy location to clipboard: Ctrl+C or Cmd+C, Enter", url);
	},

	_createButton: function (html, title, className, container, fn) {
		var link = L.DomUtil.create('a', className, container);
		link.innerHTML = html;
		link.href = '#';
		link.title = title;

		L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation)
			.on(link, 'click', L.DomEvent.preventDefault)
			.on(link, 'click', this._copyURL, this);

		return link;
	}
});

L.Map.addInitHook(function () {
	if (this.options.shareURL) {
		this.shareURL = new L.Control.shareURL();
		this.addControl(this.shareURL);
	}
});

L.control.shareURL = function (options) {
	return new L.Control.shareURL(options);
};

}).call(this);