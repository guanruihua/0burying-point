// 捕获 fetch 思路和 xhr 类似，只不过fetch 本身基于 promise 实现，在重写 fetch api的时候通过promise的形式去写就可以
// 统计每个fetch请求的信息
const monitorFetchRequest = (callback) => {
  const originalFetch = window.fetch;

  function overwriteFetch() {
    window.fetch = function newFetch(url, config) {
      const startTime = Date.now();
      const reportData: fetchRequestType = {
        startTime,
        endTime: 0,
        duration: 0,
        success: false,
        status: 0,
        url,
        method: (config?.method || 'GET').toUpperCase(),
        subType: 'fetch',
        type: 'performance',
      };
      return originalFetch(url, config)
        .then((res) => {
          reportData.endTime = Date.now();
          reportData.duration = reportData.endTime - reportData.startTime;
          const data = res.clone();
          reportData.status = data.status;
          reportData.success = data.ok;
          callback(reportData);
          return res;
        })
        .catch((err) => {
          reportData.endTime = Date.now();
          reportData.duration = reportData.endTime - reportData.startTime;
          reportData.status = 0;
          reportData.success = false;
          callback(reportData);
          throw err;
        });
    };
  }
  overwriteFetch();
};