import * as React from "react";

declare global {
	interface Window {
		androidObj: any;
		Android: any;
	}
}
/* const rules = [
    'WebView',
    '(iPhone|iPod|iPad)(?!.*Safari/)',
    'Android.*(wv|.0.0.0)'
] */

const useWebViewConfig = () => {
	/* window.androidObj = class Android { }; */
	const userAgent = navigator.userAgent;
	const isLine = /\bLine\//i.test(userAgent) || false;
	const isMobile = /(iPad|iPhone|Android|Mobile)/i.test(userAgent) || false;
	/*  const rules = [
         'Webview.iOS',
         'Webview.Android'
     ] */
	const rules = [
		"WebView",
		"WebviewiOS",
		"WebviewAndroid",
		"(iPhone|iPod|iPad)(?!.*Safari/)",
		"Android.*(wv|.0.0.0)",
	];

	const regex = new RegExp(`(${rules.join("|")})`, "ig");
	const isWebView = Boolean(userAgent.match(regex));
	/*  console.log('=================')
     console.log('userAgent: ', userAgent)
     console.log('isLine: ', isLine)
     console.log('isMobile: ', isMobile)
 
     console.log('isInApp: ', isWebView)
     console.log('=================') */
	return {
		isWebView,
	};
};

export default useWebViewConfig;
