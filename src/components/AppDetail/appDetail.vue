<template>
	<div class="wrapper">
		<navbar :title="'应用详情'"></navbar>
		<scroll class="detail-scroll" ref="scroll"
			:data="commentList.list" 
			:scrollY="scrollY" 
			:scrollX="scrollX"
			:bounce="bounce" 
			:pullup="pullup" 
			@scrollToEnd="_getCommentMore">
			<div id="app-detail">
				<div class="d-head">
					<div class="img">
						<img v-lazy="detail.icoUri" alt="">
					</div>
					<div class="describe">
						<h3 class="name" v-text="detail.name"></h3>
						<p class="num" v-text="detail.intro"></p>
						<stars :grade="Number(detail.stars)"></stars>
						<p class="desc">
							<span class="key" v-for="item in detail.labelNames" v-text="item.name"></span>
						</p>
						<button class="i-btn">安装</button>
					</div> 
				</div>
				<div class="d-picture">
					<div class="wrap">
						<img v-for="item in detailPic.images" :src="item" alt="">
					</div>
				</div>
				<div class="d-desc">
					<table class="table">
						<tr>
							<td>资费</td>
							<td v-text="desc.tariffDesc"></td>
						</tr>
						<tr>
							<td>大小</td>
							<td v-text="desc.sizeDesc"></td>
						</tr>
						<tr>
							<td>版本</td>
							<td v-text="desc.version"></td>
						</tr>
						<tr>
							<td>时间</td>
							<td v-text="desc.releaseDate">1</td>
						</tr>
						<tr>
							<td>开发</td>
							<td v-text="desc.developer"></td>
						</tr>
						<tr>
							<td>分级</td>
							<td v-text="desc.gradeDesc"></td>
						</tr>
					</table>
				</div>
				<div class="d-desc" v-for="item in elseInfo">
					<h2 class="title" v-text="item.title"></h2>
					<p class="text" v-text="item.body"></p>
				</div>
				<div class="d-desc">
					<h2 class="title">应用介绍</h2>
					<p class="text"
						:class="isSlideUp ? 'hide-more' : ''" 
						@click="slideToggle" 
						v-html="introduce.appIntro"></p>
					<i class="more-btn iconfont icon-zuobian" 
						:class="isSlideUp ? 'up' : 'down'"
						@click="slideToggle"></i>
				</div>
				<div id="app-comment">
					<div class="title">评论<span v-text="commentNum"></span></div>
					<ul class="comment-list">
						<li class="item" v-for="item in commentList">
							<div class="avater"><img v-lazy="item.photoUrl" alt=""></div>
							<div class="info">
								<h3 class="name" v-text="item.accountName"></h3>
								<div class="device-and-time">
									<span class="device" v-text="item.phone"></span>
									<span class="time" v-text="item.operTime"></span>
								</div>
								<p class="content" v-text="item.commentInfo"></p>
								<div class="stars-wrap">
									<stars :grade="Number(item.stars)"></stars>
									<span class="versions" v-text="item.versionName"></span>
								</div>
							</div>
						</li>
					</ul>
					<loading v-show="hasMore && commentNum != 0" :row="row"></loading>
					<no-result :title="'暂无评论~'" v-if="commentNum == 0"></no-result>
				</div>
			</div>
		</scroll>
		<div class="loading-wrap" v-if="showLoading">
			<loading></loading>
		</div>
	</div>
</template>
<script type="text/javascript">
import {getAppDetail, getRelatedApp, getComment} from 'api/appDetail';
import Stars from 'components/Base/stars';
import Scroll from 'components/Base/scroll';
import Loading from 'components/Base/loading';
import noResult from 'components/Base/noResult';
import Navbar from 'components/Base/navbar'
import {mapGetters} from 'vuex';

export default {
	data() {
		return {
			detail: [],
			detailPic: [],
			commentList: [],
			relatedApp: [],
			introduce: [],
			desc: [],
			elseInfo: [],
			commentNum: 0,

			scrollY: true,
			scrollX: false,
			pullup: true,
			beforeScroll: true,
			bounce: false,

			page: 1,
			hasMore: true,
			row: true,
			showLoading: true,
			isSlideUp: true
		}
	},
	computed: {
		appId() {
			return this.$route.params.id;
		}
	},
	// watch: {
	// 	appId(id) {
	// 		if (id) {
	// 			this.$refs.scroll.scrollTo(0, 0);
	// 			this._getAppDetail(id);
	// 			this._getRelatedApp(id);
	// 			this._getComment(this.appId);
	// 		}
	// 	}
	// },
	created() {
		this._getAppDetail(this.appId);
		this._getRelatedApp(this.appId);
		this._getComment(this.appId);
	},
	methods: {
		_getAppDetail(id) {
			getAppDetail(id).then((res) => {
				this.detail = res.data.layoutData[0].dataList[0];
				this.detailPic = res.data.layoutData[1].dataList[0];
				this.desc = res.data.layoutData[2].dataList[0];
				this.introduce = res.data.layoutData[5].dataList[0];
				this.elseInfo = res.data.layoutData[3].dataList;
			}).catch((err) => {
				console.log(err);
			})
		},
		_getRelatedApp(id) {
			getRelatedApp(id).then((res) => {
				this.relatedApp = res.data.layoutData;
			}).catch((err) => {
				console.log(err);
			})
		},
		_getComment(id) {
			this.showLoading = true;
			getComment(id, this.page).then((res) => {
				this.commentList = res.data.list;
				this.commentNum = res.data.count;
				this.showLoading = false;
			}).catch((err) => {
				console.log(err);
			})
		},
		_getCommentMore() {
			if (!this.hasMore || this.commentNum == 0) {
				return;
			}
			this.page++;
			getComment(this.appId, this.page).then((res) => {
				if (this.page >= res.data.totalPages) {
					this.this.hasMore = false;
					return;
				}
				this.commentList = this.commentList.concat(res.data.list);
			}).catch((err) => {
				console.log(err);
			})
		},
		slideToggle() {
			this.isSlideUp = !this.isSlideUp;
		}
	},
	components: {
		Stars,
		Scroll,
		Loading,
		noResult,
		Navbar
	}
}
</script>
<style type="text/css" lang="scss" scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.detail-scroll{
	position:fixed;
	left:0;
	right:0;
	top:0.9rem;
	bottom:0;
	margin:0 auto;
	width: 7.5rem;
	overflow: hidden;
}
#app-detail{
	padding:0 0.3rem;
	font-size:$font-size-s;
	color:$color-text;
	.d-head{
		padding:0.3rem 0;
		display:flex;
		.img{
			width: 1.5rem;
			height: 1.5rem;
			overflow: hidden;
		}
		.describe{
			flex:1;
			padding-left:0.3rem;
			position:relative;
			line-height: 0.3rem;
			.name{
				font-size:$font-size-m;
				color:$color-title;
				line-height: 0.4rem;
			}
			.num{
				padding-top:0.1rem;
			}
			.stars{
				color:#ffbb1e;
			}
			.desc{
				padding-top:0.1rem;
				.key{
					padding:0 0.3rem 0 0;
				}
			}
			.i-btn{
				width: 1.2rem;
				height: 0.5rem;
				outline:none;
				position:absolute;
				right:0;
				top:0.5rem;
				color:#fff;
				background: $color-theme;
				border:0 ;
				border-radius: 0.25rem;
			}
		}
	}
	.d-picture{
		overflow-x:scroll;
		-webkit-overflow-scrolling:touch;
		.wrap{
			overflow-y: hidden;
			height:5.4rem;
			white-space: nowrap;
			&::-webkit-scrollbar{
				display:none;
			}
			img{
				display: inline-block;
				margin-right:0.1rem;
				width: auto;
				height:5.4rem;
				&:last-child{
					margin-right:0;
				}
			}
		}
	}
	.d-desc{
		position:relative;
		padding:0.2rem 0;
		margin-top:0.1rem;
		border-bottom:1px solid $color-line;
		.table{
			tr{
				td{
					&:first-child{
						padding-right:0.2rem;
						color:$color-gray;
					}
				}
			}
		};
		.title{
			font-size:$font-size-m;
			color:$color-title;
		}
		.text{
			padding-top:0.2rem;
			line-height: 1.5;
			white-space: pre-wrap;
			&.hide-more{
				@include text-overflow(3);
			}
		}
		.more-btn{
			position:absolute;
			right:0;
			bottom:0.2rem;
			font-size:0.36rem;
			color:#ccc;
			background: #fff;
			&.up{
				transform: rotate(-90deg);
			}
			&.down{
				transform: rotate(90deg);
			}
		}
	}
	#app-comment{
		margin-top:0.2rem;
		&>.title{
			padding:0.1rem 0;
			font-size:$font-size-m;
			color:$color-title;
		}
		.comment-list{
			.item{
				padding:0.15rem 0 0.3rem 0;
				display:flex;
				border-top:1px solid $color-line;
				&:first-child{
					border-top:0;
				}
				.avater{
					width: 0.8rem;
					height: 0.8rem;
					overflow: hidden;
					background: url(avater.png) no-repeat;
					background-size: cover;
					border-radius:50%;
				}
				.info{
					flex:1;
					padding-left:0.3rem;
					.name{
						font-size:$font-size-m;
						color:$color-title;
					}
					.device-and-time{
						color:$color-gray;
						display:flex;
						justify-content:space-between;
						.device{
						}
						.time{

						}
					}
					.content{
						padding-top:0.1rem;
						line-height: 1.5;
						color:$color-title;
					}
					.stars-wrap{
						padding-top:0.05rem;
						align-items:center;
						display:flex;
						.versions{
							padding-left:0.1rem;
							color:$color-gray;
						}
					}
				}
			}
		}
	}
}
</style>