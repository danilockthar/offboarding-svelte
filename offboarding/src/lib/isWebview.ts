export const isWebview = (userAgent: string) => {
	const rules = [
		'WebView',
		'WebviewiOS',
		'WebviewAndroid'
		/*  '(iPhone|iPod|iPad)(?!.*Safari/)', */
	];

	const regex = new RegExp(`(${rules.join('|')})`, 'ig');
	const isWebView = Boolean(userAgent.match(regex));

	return isWebView;
};
