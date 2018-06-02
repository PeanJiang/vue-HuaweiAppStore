import axios from 'axios';

export function getRank(page) {
	let url = '/uowap/index';

	let params = {
		method:'internal.getTabDetail',
		serviceType:13,
		uri:'c3c9084e96b7452181b0844474a7859d',
		maxResults:25,
		ver:1.1,
	}
	function page1() {
		let data = Object.assign({}, params, {
			reqPageNum: 1
		})
		return axios.get(url, {params: data});
	}
	function page2() {
		let data = Object.assign({}, params, {
			reqPageNum: 2
		})
		return axios.get(url, {params: data});
	}
	return axios.all([page1(), page2()]);
}