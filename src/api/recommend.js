import axios from 'axios';

export function getRecommend(page) {
  let url = '/uowap/index';

  let params = {
    method: 'internal.getTabDetail',
    serviceType: 13,
    uri: '483c32d38b8e49e1b4b6f65ab854b778',
    maxResults: 25
  }

  function page1() {
  	let data = Object.assign({}, params, {
  		reqPageNum: 1
  	})
  	return axios.get(url, {params: data})
  }

  function page2() {
  	let data = Object.assign({}, params, {
  		reqPageNum: 2
  	})
  	return axios.get(url, {params: data})
  }

  return axios.all([page1(), page2()]);
}
