import axios from 'axios';

export function getMoreList(uri, page) {
	let url = '/uowap/index';
	let data = {
		method: 'internal.getTabDetail',
		serviceType: 13,
		uri: uri,
		maxResults: 25,
		reqPageNum: page
	}
	return axios(url, {params: data});
}