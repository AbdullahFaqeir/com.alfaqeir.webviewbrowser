# com.alfaqeir.webviewbrowser
Advanced WebView browser widget for Titanium, Alloy


# How To Use

    //---Calls the webview browser
    var View = Ti.UI.createView();

    var AlFaqeirWidget = Alloy.createWidget('com.alfaqeir.webviewbrowser', null, {
        url : 'http://google.com',
        showUrlBox : false // optional
    }).getView();
    AlFaqeirWidget();
    //---Calls the webview browser