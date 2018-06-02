import axios from 'axios';

export function getAppDetail(id) {
	let url = '/uowap/index';
	let data = {
		method: 'internal.getTabDetail',
		serviceType: 13,
		reqPageNum: 1,
		uri: `app|${id}`,
		maxResults: 10
	}

	return axios(url, {params: data});
}

export function getRelatedApp(id) {
	let url = '/uowap/index';
	let data = {
		method: 'internal.getTabDetail',
		serviceType: 13,
		reqPageNum: 1,
		uri: `combinerelatedapp|${id}`,
		maxResults: 10
	}
	return axios(url, {params: data});
}

export function getComment(id, page) {
	let url = '/uowap/index';
	let data = {
		method: 'internal.user.commenList3',
		serviceType: 13,
		reqPageNum: page,
		maxResults: 10,
		appid:id
	}
	return axios(url, {params: data});
}