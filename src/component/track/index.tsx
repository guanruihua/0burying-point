import React, { useState, useRef } from 'react'

/*
performanceData 用于收集页面性能相关参数，如FP、FCP、FMP、LCP、DOM Load、white time等一系列参数。
xhrRequestResList 用于捕获页面中所有xhr 请求，收集请求方式、响应完成时间。
fetchRequestResList 用于捕获页面中所有fetch 请求，收集请求方式、响应完成时间。
resourceList 用于收集页面中所有文件、静态资源的请求数据，如js、css、img。
userInfo 用于收集用户相关信息，如浏览器参数、用户IP、城市、语言等。
errorList 用于收集发生在生产环境下错误的捕获，包括error和rejectError。
clickEventList 用于收集用户在页面上的点击行为
*/

export const Track = (props: any, ref: any) => {
	const { children } = props;

	const [performanceData, setPerformanceData] = useState({});
	const xhrRequestResList = useRef([]);
	const fetchRequestResList = useRef([]);
	const resourceList = useRef({});
	const userInfo = useRef({});
	const errorList = useRef([]);
	const clickEventList = useRef([]);

	return (
		<div />
	)

}