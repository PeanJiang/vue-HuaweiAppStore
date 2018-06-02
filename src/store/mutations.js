import * as types from './mutation-types';

const mutations = {
	[types.SUGGEST_IS_SHOW](state, show) {
		state.suggestIsShow = show;
	},
	[types.APP_ID](state, id) {
		state.appId = id;
	}
}

export default mutations;