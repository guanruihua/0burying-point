// 获取用户信息
export const getUser = () => {
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = `https://pv.sohu.com/cityjson?ie=utf-8`;
    document.body.appendChild(scriptElement);
    scriptElement.onload = () => {
      try {
        document.body.removeChild(scriptElement);
        /// eslint-disable-next-line
        resolve((window as any).returnCitySN)
      } catch (e) {
        reject(e);
      }
    };
  });
}