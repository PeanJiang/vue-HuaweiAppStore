<template>
	<div class="wrapper">
		<div class="placeholder"></div>
		<div class="search-wrap">
			<div class="search-box">
				<div class="input-wrap">
					<input v-model="keyword" @keyup="showSuggest" @focus="showSuggest" class="input" type="text" placeholder="搜索应用、游戏">
					<div class="delete-key" v-show="keyword != ''" @click="deleteKey"><i class="iconfont icon-guanbi"></i></div>
				</div>
				<div class="to-btn" @click="addKey(keyword)"><i class="iconfont icon-sousuo"></i></div>
			</div>
			<div class="wrapper">
				<div class="scroll-wrap" v-show="!keyword">
					<div class="hot">
						<div class="keyword-list" v-for="list in searchList">
							<div class="title" v-html="list.name">综合</div>
							<ul class="list">
								<li class="item shortcut" v-for="(item, index) in list.adList" v-if="index<4" @click="addId(item.detailId)">
									<div class="img">
										<img v-lazy="item.icon">
									</div>
									<p class="name" v-html="item.name"></p>
								</li>
								<li class="item" v-for="item in list.dataList" v-html="item.name" @click="addKey(item.name)"></li>
							</ul>
						</div>
					</div>
					<foot></foot>
				</div>
				<suggest v-show="key && !showList && keyword " :keyword="key" @selectSuggest="addKey"></suggest>
				<search-list v-show="searchApp && showList" :searchApp="searchApp"></search-list>
			</div>
		</div>
		<div class="loading-wrap" v-if="!searchList.length">
			<loading></loading>
		</div>
	</div>
</template>
<script type="text/javascript" scoped>
import {getSearchKey} from 'api/search';
import Loading from 'components/Base/loading';
import Suggest from 'components/Search/suggest';
import SearchList from 'components/Search/searchList';
import Foot from 'components/Foot/foot';
import {mapMutations} from 'vuex';

export default {
	data() {
		return {
			searchList: [],
			keyword: '',
			searchApp: '',
			key: '',
			showList: true
		}
	},
	computed: {
		
	},
	created() {
		this._getSearchKey();
	},
	methods: {
		_getSearchKey() {
			getSearchKey().then((res) => {
				this.searchList = res.data.list;
			}).catch((err) => {
				console.log(err);
			})
		},
		showSuggest() {
			if (this.keyword != '') {
				this.key = this.keyword;
				this.showList = false;
			}
		},
		addKey(key) {
			this.keyword = key;
			this.searchApp = key;
			this.showList = true;
		},
		deleteKey() {
			this.keyword = '';
			this.searchApp = '';
		},
		addId(idStr) {
			let reg = new RegExp('(^|app\|)[a-z0-9]+(_+|$)','i');
			let id = idStr.match(reg)[0].replace(/_+/g, '');
			this.$router.push({
				path: `/appDetail/${id}`
			})
		}
	},
	components: {
		Loading,
		Suggest,
		SearchList,
		Foot
	}
}
</script>
<style type="text/css" lang="scss">
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.placeholder{
	height:1rem;
}
.scroll-wrap{
	position:fixed;
	width: 7.5rem;
	top:2rem;
	bottom:0;
	margin:0 auto;
	overflow-x:hidden;
	overflow-y: scroll;
	overflow-scrolling:touch;
	&::-webkit-scrollbar{
		display:none;
	}
}
.search-box{
	padding:0.15rem 0.3rem;
	display:flex;
	justify-content:space-between;
	.input-wrap{
		position:relative;
		.delete-key{
			position:absolute;
			right:0;
			top:0;
			width: 0.65rem;
			height:0.65rem;
			z-index:2;
			text-align:center;
			line-height: 0.65rem;
			font-size:0.36rem;
			.iconfont{
				font-size:0.48rem;
				color:#ccc;
			}
		}
	}
	.input{
		padding:0 0.3rem;
		width: 6.1rem;
		height:0.65rem;
		outline: none;
		border:0;
		background: #efefef;
		border-radius: 0.325rem;
		&::placeholder{
			color:#a8a5a5;
		}
	}
	.to-btn{
		width: 0.8rem;
		height:0.65rem;
		text-align:center;
		line-height: 0.65rem;
		.iconfont{
			font-size:0.32rem;
			color:#b0b0b0;
		}
	}
}
.keyword-list{
	color:$color-title;
	padding:0.2rem 0;
	margin:0 0.3rem;
	border-bottom:1px solid $color-line;
	.title{
		line-height: 0.3rem;
	}
	.list{
		font-size:0;
		.item{
			font-size:0.26rem;
			display:inline-block;
			padding: 0 0.3rem;
			line-height: 0.9rem;
			font-size:$font-size-m;
			&.shortcut{
				margin-top:20px;
				padding:0 0.35rem;
				white-space:nowrap;
				font-size:$font-size-s;
				.img{
					width: 1rem;
					height: 1rem;
					overflow: hidden;
				}
				.name{
					width: 1rem;;
					padding-top:0.1rem;
					line-height: 0.6rem;
					@extend .nowrap;
				}
			}
		}
	}
}
</style>