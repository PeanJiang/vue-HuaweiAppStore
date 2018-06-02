<template>
	<div>
		<scroll class="scroll-wrap scroll-prevent" 
			:data="searchList" 
			:scrollY="scrollY" 
			:scrollX="scrollX"
			:bounce="bounce" 
			:pullup="pullup" 
			@scrollToEnd="searchMore">
			<div class="result">
				<div class="search-list" v-for="list in searchList">
					<div class="list-type1" v-if="list['listId'] == -1">
						<div class="head">
							<h3 class="title" v-html="list.dataList[0].name"></h3>
							<span class="more" @click="more(list.dataList[0].detailId, list.dataList[0].name)">更多<i>&gt;</i></span>
						</div>
						<scroll class="list-wrap" :data="searchList">
							<ul class="list" ref="listGroup">
								<li class="item" v-for="item in list.dataList[0].list" @click="addId(item.appid)">
									<div class="img">
										<img v-lazy="item.icon">
									</div>
									<p class="name" v-html="item.name"></p>
									<p class="size" v-html="item.intro"></p>
								</li>
							</ul>
						</scroll>
						<div class="underline"></div>
					</div>
					<ul class="list-type2" v-if="list['listId'] != -1">
						<li class="item" v-for="item in list.dataList" @click="addId(item.appid)">
							<div class="img">
								<img v-lazy="item.icon" alt="">
							</div>
							<div class="describe">
								<h3 class="name" v-html="item.name"></h3>
								<p class="size" v-html="item.sizeDesc"></p>
								<p class="desc" v-html="item.memo"></p>
								<button class="i-btn">安装</button>
							</div>
						</li>
					</ul>
				</div>
				<loading v-show="hasMore" :row="row"></loading>
			</div>
		</scroll>
		<div class="loading-wrap" v-show="showLoading">
			<loading></loading>
		</div>
	</div>
</template>
<script type="text/javascript">
import Scroll from 'components/Base/scroll';
import Loading from 'components/Base/loading';
import {getStyle} from 'common/js/dom';
import {getSearchList} from 'api/search';

export default {
	props: {
		searchApp: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			searchList: [],
			showLoading: false,
			page: 1,
			hasMore: true,
			row: true,

			scrollY: true,
			scrollX: false,
			pullup: true,
			beforeScroll: true,
			bounce: false
		}
	},
	watch: {
		searchApp(key) {
			this._getSearchList(key);
		}
	},
	methods: {
		_getSearchList(key) {
			this.showLoading = true;
			getSearchList(key, this.page).then((res) => {
				this.searchList = res.data.layoutData;
				this.showLoading = false;
			}).catch((err) => {
				console.log(err)
			});
		},
		searchMore() {
			if (!this.hasMore) {
				return;
			}
			this.page++;
			getSearchList(this.searchApp, this.page).then((res) => {
				this.searchList = this.searchList.concat(res.data.layoutData);
				if (!res.data.layoutData.length) {
					this.hasMore = false;
				}
			}).catch((err) => {
				console.log(err)
			});
		},
		addId(id) {
			this.$router.push({
				path: `/appDetail/${id}`
			})
		},
		more(id, title) {
			this.$router.push({
				path: `/more/${id}`,
				query: {
					title: title
				}
			})
		}
	},
	components: {
		Scroll,
		Loading
	}
}
</script>
<style type="text/css" lang="scss" scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.scroll-wrap.scroll-prevent{
	overflow: hidden;
}
.loading-wrap{
	top:2rem;
}
.search-list{
	.list-type1{
		margin-top:0.2rem;
		.head{
			padding: 0 0.3rem;
			height: 0.6rem;
			line-height: 0.6rem;
			font-size: $font-size-m;
			display:flex;
			justify-content: space-between;
			.title{
				color:$color-title;
			}
			.more{
				color:$color-gray;
				i{
					padding-left:0.1rem;
					font-family: 'simsun';
				}
			}
		}
		.list-wrap{
			width: 7.5rem;
			.list{
				display:flex;
				.item{
					width: 1.2rem;
					margin-left: 0.3rem;
					white-space:nowrap;
					.img{
						width: 1.2rem;
						height: 1.2rem;
					}
					.name{
						padding-top:0.1rem;
						@extend .nowrap;
					}
					.size{
						white-space:nowrap;
						color:$color-gray;
					}
				}
				&.wap-link{
					.item{
						width:3.3rem;
						.img,img{
							width:3.3rem;
							height:1.6rem;
						}
					}
				}
			}
		}
		.underline{
			width: 6.9rem;
			height:0.2rem;
			margin: 0 auto;
			border-bottom: 1px solid $color-line;
		}
	}
	.list-type2{
		padding: 0 0.3rem;
		.item{
			height:2rem;
			display:flex;
			align-items:center;
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
				border-bottom:1px solid $color-line;
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
				.item{
					.describe{
						border-bottom:0;
					}
				}
			}
		}
	}
}
</style>