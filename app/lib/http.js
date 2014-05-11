var Alloy = require('alloy');

function Api(url, cacheable) {
	this.setUrl(url);
	this.setCacheable(!!cacheable);
}

Api.prototype = {
	setUrl : function(url) {
		this._url = url;
	},
	getUrl : function() {
		return this._url;
	},
	setCacheable : function(cacheable) {
		this._cacheable = cacheable;
	},
	getCacheable : function() {
		return this._cacheable;
	},
	get : function(callback) {
		this.createHttpRequest(this.getUrl(), 'GET', null, callback);
	},
	post : function(data, callback) {
		this.createHttpRequest(this.getUrl(), 'POST', data, callback);
	},
	put : function(id, data, callback) {
		this.createHttpRequest(this.getUrl() + id, 'PUT', data, callback);
	},
	destroy : function() {
		this.createHttpRequest(this.getUrl() + id, 'DELETE', data, callback);
	},
	setRequestHeaders : function(http) {
		http.setRequestHeader('Content-Type', 'application/json');
	},
	createHttpRequest : function(url, method, params, callback) {
		var http = Ti.Network.createHTTPClient();

		// this.setRequestHeaders(http);

		//console.log(method);
		console.log("XXX " + url);
		//console.log(params);

		http.setTimeout(6000);

		http.open(method, url);

		//  http.setRequestHeader('Authorization', Alloy.CFG.authorization);

		http.setRequestHeader("Content-Type", "application/json");

		http.onload = function(e) {
			// alert(this.responseData);
			// Ti.API.info(this.responseText);
			callback(JSON.parse(this.responseText));
		};

		http.onerror = function(e) {
			//callback(JSON.parse(this.responseText));
			var response = this.responseText;

			console.log("ERROR: " + response);

			callback({
				result : {
					error : "error",
					response : response
				}
			});

			//if (response.error_message) {
			//    console.log(response.error_message);
			// }
		};

		if (params) {
			http.send(params);
		} else {
			http.send();
		}
	}
};

module.exports = Api;
