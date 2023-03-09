/* eslint-disable*/
const onClick = (callback: any) => {
	['mousedown', 'touchstart'].forEach((eventType) => {
		let timer: any
		window.addEventListener(eventType, (event) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				// const target = event.target as eventDom & EventTarget;
				const target = event.target as any & EventTarget;
				const { top, left } = (target as any).getBoundingClientRect();
				callback({
					top,
					left,
					eventType,
					pageHeight: document.documentElement.scrollHeight || document.body.scrollHeight,
					scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
					type: 'behavior',
					subType: 'click',
					target: target.tagName,
					paths: (event as any).path?.map((item: any) => item.tagName).filter(Boolean),
					startTime: event.timeStamp,
					outerHTML: target.outerHTML,
					innerHTML: target.innerHTML,
					width: target.offsetWidth,
					height: target.offsetHeight,
					viewport: {
						width: window.innerWidth,
						height: window.innerHeight,
					},
				});
			}, 500);
		});
	});
};