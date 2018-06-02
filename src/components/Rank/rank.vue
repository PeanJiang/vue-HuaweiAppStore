<template>
	<div class="wrapper">
		<div class="placeholder"></div>
		<div class="rank-list" v-for="(list, i) in rankList" v-if="list.dataList.length>1">
			<div class="title">
				<h3 class="name" v-html="list.name"></h3>
				<div class="more" @click="more(rankList[i - 1].detailId, list.name)">更多<i>&gt;</i></div>
			</div>
			<ul class="list" v-for="(item, index) in list.dataList" @click="addId(item.appid)">
				<li class="item">
					<div class="num">{{index + 1}}</div>
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
		<foot></foot>
		<div class="loading-wrap" v-if="!rankList.length">
			<loading></loading>
		</div>
	</div>
</template>
<script type="text/javascript">
import {getRank} from 'api/rank';
import {mapMutations} from 'vuex';
import Loading from 'components/Base/loading';
import Foot from 'components/Foot/foot';
import axios from 'axios';

export default {
	data() {
		return {
			rankList: [],
			totalPage: 2
		}
	},
	created() {
		this._getRank();
	},
	methods: {
		_getRank(){
			getRank().then(axios.spread((page1, page2) => {
				this.rankList = page1.data.layoutData.concat(page2.data.layoutData);
				console.log(this.rankList)
			}))
		},
		addId(id) {
			this.$router.push({
				path: `/appDetail/${id}`
			})
			this.setAppId(id);
		},
		more(id, title) {
			console.log(id)
			this.$router.push({
				path: `/more/${id}`,
				query: {
					title: title
				}
			})
		},
		...mapMutations({
			'setAppId': 'APP_ID'
		})
	},
	components: {
		Loading,
		Foot
	}
}
</script>
<style type="text/css" lang="scss" scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.rank-list{
	&>.title{
		display: flex;
		justify-content: space-between;
		padding:0 0.3rem;
		height:0.7rem;
		line-height: 0.7rem;
		font-size: $font-size-m;
		color:$color-text;
		background: #f7f7f7;
		.more{
			color:$color-gray;
			i{
				padding-left:0.1rem;
				font-family:'simsun';
				font-weight: bold;
				color:#ccc;
			}
		}
	}
	.list{
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
.placeholder{
	height: 1rem;
}
</style>