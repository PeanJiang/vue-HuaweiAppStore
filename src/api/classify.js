import axios from 'axios';

export function getClassify() {
	let url = '/uowap/index';
	let data = {
		method:'internal.getTabDetail',
		serviceType:13,
		reqPageNum:1,
		uri:'34789c86f4654624ba9e63cf1353c860',
		maxResults:25
	}
	return axios(url, {params: data});
}

export function getClassifyDetail(uri) {
	let url = '/uowap/index';
	let data = {
		method: 'internal.getTabDetail',
		serviceType: 13,
		uri: uri,
		maxResults: 25,
		reqPageNum: 1
	}
	return axios(url, {params: data});
}