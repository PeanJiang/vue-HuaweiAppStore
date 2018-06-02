<template>
	<div id="more-app">
		<navbar :title="title"></navbar>
		<scroll class="more-list" ref="scroll" 
			:data="list" 
			:scrollY="scrollY" 
			:scrollX="scrollX"
			:bounce="bounce" 
			:pullup="pullup" 
			@scrollToEnd="_getMoreApp">
			<ul class="list">
				<li class="item" v-for="item in list" @click="addId(item.appid)">
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
				<li v-if="hasMore">
					<loading :row="row"></loading>
				</li>
				<li v-if="!hasMore">
					<foot></foot>
				</li>
			</ul>
			
		</scroll>
		<div class="loading-wrap" v-if="showLoading">
			<loading></loading>
		</div>
	</div>
</template>
<script type="text/javascript">
import Navbar from 'components/Base/navbar';
import Scroll from 'components/Base/scroll';
import Loading from 'components/Base/loading';
import Foot from 'components/Foot/foot';
import {getMoreList} from 'api/moreList';

export default {
	data() {
		return {
			list: [],

			scrollY: true,
			scrollX: false,
			pullup: true,
			beforeScroll: true,
			bounce: false,

			page: 1,
			hasMore: true,
			row: true,
			showLoading: true
		}
	},
	computed: {
		detailId() {
			return this.$route.params.id;
		},
		title() {
			return this.$route.query.title;
		}
	},
	created() {
		this._getMoreList(this.detailId, this.page);
	},
	methods: {
		_getMoreList(id, page) {
			this.showLoading = true;
			getMoreList(id, page).then((res) => {
				this.list = res.data.layoutData[0].dataList;
				this.showLoading = false;
			}).catch((err) => {
				console.log(err);
			})
		},
		_getMoreApp() {
			if (!this.hasMore) {
				return;
			}
			this.page++;
			getMoreList(this.detailId, this.page).then((res) => {
				if (this.page >= res.data.totalPages) {
					this.hasMore = false;
					return;
				}
				this.list = this.list.concat(res.data.layoutData[0].dataList);
			}).catch((err) => {
				console.log(err);
			})
		},
		addId(id) {
			this.$router.push({
				path: `/appDetail/${id}`
			})
		}
	},
	components: {
		Navbar,
		Scroll,
		Loading,
		Foot
	}
}
</script>
<style type="text/css" lang="scss" scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';

.more-list{
	position:fixed;
	left:0;
	right:0;
	bottom:0;
	top:0.9rem;
	.list{
		padding: 0 0.3rem;
		.item{
			width: 100%;
			height:2rem;
			display:flex;
			align-items:center;
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
				width: 5.2rem;
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
</style>