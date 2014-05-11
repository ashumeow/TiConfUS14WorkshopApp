Alloy.Globals.indexController = $;

var Http = require('http');

$.getView().addEventListener("android:back", function() {
	$.trigger("back");
});

if (OS_IOS) {
	$.ptr.init($.newsTable);
}

function pullToRefresh(e) {

	refreshNews(function() {
		e.hide();
	});

}

function viewArticle(e) {
	$.articleView.url = e.row.url;

	$.scrollableView.scrollToView(1);

	if (OS_ANDROID) {
		$.on("back", function() {
			$.scrollableView.scrollToView(0);
		});
	}

	if (OS_IOS) {
		$.back.show();
	}
}

if (OS_IOS) {
	function goBack() {
		if (OS_IOS) {
			$.back.hide();
		}
		$.scrollableView.scrollToView(0);
	}

}

function refreshNews(callback) {
	var Results = new Http("http://www.tidev.io/api/get_recent_posts/");

	var rows = [];

	Results.get(function(e) {

		//alert(e.pages);
		e.posts.forEach(function(post) {

			var row = Alloy.createController("newsRow");

			row.headline.text = post.title;

			post.attachments.forEach(function(a) {

				row.photo.image = a.url;
			});

			row.getView().url = post.url;

			rows.push(row.getView());

		});

		$.newsTable.setData(rows);

		if (callback) {
			callback();
		}

	});

}

refreshNews();

$.index.open();
