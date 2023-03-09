//  捕获xhr请求其实很简单，在原有的XMLHttpRequest.prototype上的open、send方法上记录我们所需要的参数，如url、method，同时在send方法中介入loadend方法，当请求完成，整理参数。
// 当状态码在200~300之间，则判定为success，最后通过异步回调函数的机制，回传到组件中，加入状态。
// 统计每个xhr网络请求的信息
export const monitorXHRRequest = (callback:any) => {
  const originOpen = XMLHttpRequest.prototype.open;
  const originSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function newOpen(...args:any) {
    this.url = args[1];
    this.method = args[0];
    originOpen.apply(this, args);
  } as any

  XMLHttpRequest.prototype.send = function newSend(...args) {
    this.startTime = Date.now();

    const onLoadend = () => {
      this.endTime = Date.now();
      this.duration = this.endTime - this.startTime;

      const { status, duration, startTime, endTime, url, method } = this;
			type xhrRequestType = any
      const reportData: xhrRequestType = {
        status,
        duration,
        startTime,
        endTime,
        url,
        method: (method || 'GET').toUpperCase(),
        success: status >= 200 && status < 300,
        subType: 'xhr',
        type: 'performance',
      };
      callback(reportData);
      this.removeEventListener('loadend', onLoadend, true);
    };

    this.addEventListener('loadend', onLoadend, true);
    originSend.apply(this, args);
  };
};
