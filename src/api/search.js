import axios from 'axios';


export function getSearchKey() {
	let url = '/uowap/index';
	let data = {
		method: 'internal.getNewHotSearchList',
		serviceType: 13
	}
	return axios(url, {params: data});
}

export function getSearchList(key, page) {
	let url = '/uowap/index';
	let data = {
		method: 'internal.getTabDetail',
		maxResults: 25,
		reqPageNum: page,
		serviceType: 13,
		uri: `searchApp|${key}`
	}
	return axios(url, {params: data});
}

export function getSuggest(key) {
	let url = '/uowap/index';
	let data = {
		method: 'internal.completeSearchWord',
		serviceType: 13,
		isCommendApp: 1,
		keyword: key
	}
	return axios(url, {params: data});
}