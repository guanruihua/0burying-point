
// 捕捉错误分为了同步错误（console.aaa(123)）和异步错误（promise所遗漏未捕捉到的reject）
// 因此在全局挂载两个通用事件，当捕获到错误时推入错误列表中即可。

export const getJavaScriptError = (callback: any) => {
	window.addEventListener('error', ({ message, filename, type }) => {
		callback({
			msg: message,
			url: filename,
			type,
			time: new Date().getTime(),
		});
	});
};

export const getJavaScriptAsyncError = (callback: any) => {
	window.addEventListener('unhandledrejection', (e) => {
		callback({
			type: 'promise',
			msg: (e.reason && e.reason.msg) || e.reason || '',
			time: new Date().getTime(),
		});
	});
};