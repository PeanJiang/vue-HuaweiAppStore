<template>
	<div class="wrapper">
		<slider v-if="slider.length">
			<swiper-slide v-for="item in slider" :key="item.detailId">
				<img :src="item.commendIcon" alt="">
			</swiper-slide>
		</slider>
		<div class="app-list-item" v-for="list in appList">
			<div class="head" v-if="list['dataList-type'] == 3">
				<h3 class="title" v-html="list.dataList[0].name"></h3>
				<span class="more" @click="more(list.detailId, list.dataList[0].name)">更多<i>&gt;</i></span>
			</div>
			<scroll class="list-wrap" :data="appList">
				<ul class="list" ref="listGroup" v-if="list['dataList-type'] == 3">
					<li class="item" v-for="item in list.dataList[0].list"  @click="addId(item.appid)">
						<div class="img">
							<img v-lazy="item.icon">
						</div>
						<p class="name" v-html="item.name"></p>
						<p class="size" v-html="item.intro"></p>
					</li>
				</ul>
				<ul class="list wap-link" ref="listGroup" v-if="list['dataList-type'] == 2">
					<li class="item" v-for="item in list.dataList">
						<div class="img">
							<img v-lazy="item.icon">
						</div>
					</li>
				</ul>
			</scroll>
			<div class="underline"></div>
		</div>
		<div class="loading-wrap" v-if="!appList.length">
			<loading></loading>
		</div>
		<foot></foot>
	</div>
</template>
<script type="text/javascript">
import {getRecommend} from 'api/recommend';
import {swiperSlide} from 'vue-awesome-swiper';
import Slider from 'components/Base/slider';
import Scroll from 'components/Base/scroll';
import Loading from 'components/Base/loading';
import Foot from 'components/Foot/foot';
import axios from 'axios';

export default {
	data() {
		return {
			slider: [],
			appList: [],
			totalPage: 2,
			loadingShow: true
		}
	},
	created() {
		this._getRecommend();
	},
	mounted() {
		
	},
	methods: {
		_getRecommend() {
			let _this = this;
			getRecommend().then(axios.spread(function (page1, page2) {
				page1.data.layoutData.forEach((item, index) => {
					if (index == 0) {
						_this.slider = item.dataList;
					} else {
						_this.appList.push(item);
					}
				})
				_this.appList = _this.appList.concat(page2.data.layoutData)
  			}));
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
		Slider,
		Scroll,
		swiperSlide,
		Loading,
		Foot
	}
}
</script>
<style type="text/css" lang="scss" scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.loading-wrap{
	z-index:1000;
}
.app-list-item{
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
</style>