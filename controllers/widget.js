var args = arguments[0] || {};

updateBtns();

$.goBack.addEventListener('click', function(e) {
	$.webView.goBack();
});

$.goForward.addEventListener('click', function(e) {
	$.webView.goForward();
});

var showUrlBox = args.showUrlBox || false;

if (!showUrlBox) {
	$.webViewHeaderURL.hide();
	$.webViewHeader.height = 40;
	$.webViewHeaderLabel.top = null;
}

function CalcInnerContentHeight() {
	var TotalHeights = Alloy.Globals.Util.height - 15 - (parseInt($.webViewHeader.height) + parseInt($.webViewBtns.height));

	$.webViewView.height = TotalHeights;
}

CalcInnerContentHeight();

$.ReloadStop.addEventListener('click', function(e) {
	if (e.source.title == '↻') {
		$.webView.reload();
		$.webViewHeaderLabel.text = "Loading...";
		console.log("reloading");
	} else if (e.source.title == 'X') {
		$.webView.stopLoading();
		console.log("stop reloading");
	}
});

$.CloseWebView.addEventListener('click', function(e) {
	$.WebViewWindow.close();
});

$.webView.addEventListener('beforeload', function(e) {
	$.webViewHeaderURL.value = e.url;
	$.ReloadStop.title = "X";
	//$.ReloadStop.color = "#D0D0D0";
});

$.webView.addEventListener('load', function(e) {
	updateBtns();
	$.ReloadStop.title = "↻";
	//$.ReloadStop.color = "#686868";

	var title = $.webView.evalJS('document.title');
	if ( typeof title === 'string' && title.length > 0) {
		$.webViewHeaderLabel.text = title;
	} else if (e.url) {
		$.webViewHeaderLabel.text = e.url;
	} else {
		$.webViewHeaderLabel.text = args.url;
	}
});

$.webView.url = args.url;
$.webView.scalesPageToFit = true;
$.webViewHeaderURL.value = args.url;

function updateBtns() {
	if ($.webView.canGoBack()) {
		$.goBack.enabled = true;
		$.goBack.color = "white";
	} else {
		$.goBack.enabled = true;
		$.goBack.color = "#D0D0D0";
	}

	if ($.webView.canGoForward()) {
		$.goForward.enabled = true;
		$.goForward.color = "white";
	} else {
		$.goForward.enabled = true;
		$.goForward.color = "#D0D0D0";
	}
}