// 统计每个xhr网络请求的信息
const monitorXHRRequest = (callback: any) => {
  const originOpen = XMLHttpRequest.prototype.open;
  const originSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function newOpen(...args: any[]) {
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
      const reportData: any = {
        // const reportData: xhrRequestType = {
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
