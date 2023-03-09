export const collectFP = () => {
	return new Promise((resolve) => {
		const entryHandler = (list: any) => {
			for (const entry of list.getEntries()) {
				if (entry.name === 'first-paint') {
					resolve(entry);
					observer.disconnect();
				}
			}
		};
		const observer = new PerformanceObserver(entryHandler);
		observer.observe({ type: 'paint', buffered: true });
	});
}