<template>
	<div class="scroll-wrap">
		<div class="suggest">
			<div class="suggest-list">
				<ul class="list-type2">
					<li class="item" v-for="item in appList" @click="addId(item.detailId)">
						<div class="img">
							<img v-lazy="item.icon" alt="">
						</div>
						<div class="describe">
							<h3 class="name" v-html="item.name"></h3>
							<p class="size" v-html="item.sizeDesc"></p>
							<p class="desc" v-html="item.comment"></p>
							<button class="i-btn">安装</button>
						</div>
					</li>
					<li v-if="!appList && !list.length">
						<no-result :title="'暂无搜索结果~'"></no-result>
					</li>
				</ul>
				<ul class="list-type1">
					<li class="item" v-for="item in list" v-html="item" @click="selectSuggest(item)"></li>
				</ul>
			</div>
			<div class="loading-wrap" v-if="showLoading">
				<loading></loading>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {getSuggest} from 'api/search';
import Loading from 'components/Base/loading';
import NoResult from 'components/Base/noResult';
export default {
	data() {
		return {
			list: [],
			appList: [],
			showLoading: false
		}
	},
	props: {
		keyword: {
			type: String,
			default: ''
		}
	},
	watch: {
		keyword(key) {
			this._getSuggest(key);
		}
	},
	methods: {
		_getSuggest(key) {
			this.showLoading = true;
			getSuggest(key).then((res) => {
				this.list = res.data.list;
				this.appList = res.data.appList;
				this.showLoading = false;
			}).catch((err) => {
				console.log(err)
			})
		},
		selectSuggest(key) {
			this.$emit('selectSuggest', key)
		},
		addId(idStr) {
			let reg = new RegExp('(^|app\|)[a-z0-9]+(_+|$)', 'i');
			let id = idStr.match(reg)[0].replace(/_+/g, '');
			this.$router.push({
				path: `/appDetail/${id}`
			})
		}
	},
	components: {
		Loading,
		NoResult
	}
}
</script>
<style type="text/css" lang="scss" scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.loading-wrap{
	top:1.9rem;
}
.suggest-list{
	padding: 0 0.3rem;
	.list-type2{
		.item{
			height:2rem;
			display:flex;
			align-items:center;
			border-bottom:1px solid $color-line;
			.num{
				width: 0.4rem;
				padding:0.3rem 0;
				height: 2rem;
				font-size:0.36rem;
				color:#b0b3cd;
			}
			.img{
				width: 1.3rem;
				height:1.3rem;
				overflow: hidden;
				img{
					height:1.3rem;
				}
			}
			.describe{
				position:relative;
				width: 4.8rem;
				height:2rem;
				padding: 0.35rem 0;
				margin-left:0.4rem;
				font-size:$font-size-m;
				line-height: 0.36rem;
				color: $color-gray;
				@extend .vertical-center;
				.name{
					max-width:3.6rem;
					line-height: 0.5rem;
					font-size:$font-size-m-x;
					color:$color-title;
					@extend .nowrap;
				}
				.desc{
					@extend .nowrap;
				}
				.i-btn{
					outline:none;
					position:absolute;
					right:0;
					top:0.45rem;
					display:block;
					width: 1.2rem;
					height: 0.5rem;
					border:2px solid $color-line;
					color:$color-theme;
					background: #fff;
					border-radius:0.25rem;
					&:active{
						background: #eee;
					}
				}
			}
			&:last-child{
				border-bottom:0;
			}
		}
	}
	.list-type1{
		font-size:$font-size-m-x;
		.item{
			padding: 0.3rem 0;
			line-height: 0.4rem;
			color:$color-title;
			border-top:1px solid $color-line;
		}
	}
}
</style>