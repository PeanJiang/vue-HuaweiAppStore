<template>
	<div class="wrapper">
		<navbar :title="title"></navbar>
		<div class="classify-list" v-if="showClassify">
			<ul class="list">
				<li class="item" v-for="item in classifyList" @click="addDetail(item.detailId, item.name)">
					<div class="img">
						<img v-lazy="item.icon" alt="">
					</div>
					<div class="name-wrap">
						<h3 class="name" v-html="item.name"></h3>
						<i class="icon">&gt;</i>
					</div>
				</li>
			</ul>
		</div>
		<div class="classify-detail" v-if="!showClassify">
			<div class="app-list-item" v-for="list in appList">
				<div class="head" v-if="list['dataList-type'] == 3">
					<h3 class="title" v-html="list.dataList[0].name"></h3>
					<span class="more" @click="more(list.detailId, list.dataList[0].name)">更多<i>&gt;</i></span>
				</div>
				<scroll class="list-wrap" :data="appList" ref="scroll">
					<ul class="list" ref="listGroup">
						<li class="item" v-for="item in list.dataList[0].list"  @click="addId(item.appid)">
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
		</div>
		<div class="loading-wrap" v-show="showLoading">
			<loading></loading>
		</div>
	</div>
</template>
<script type="text/javascript">
import {getClassifyDetail} from 'api/classify';
import Scroll from 'components/Base/scroll';
import Navbar from 'components/Base/navbar';
import Loading from 'components/Base/loading';

export default {
	data() {
		return {
			classifyList: [],
			appList: [],
			showClassify: true,
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
	watch: {
		detailId(id) {
			if (id) {
				this._getClassifyDetail(id);
			}
		}
	},
	created() {
		this._getClassifyDetail(this.detailId);
	},
	methods: {
		_getClassifyDetail(id) {
			this.showLoading = true;
			getClassifyDetail(id).then((res) => {
				if (res.data.layoutData.length > 1) {
					this.appList = res.data.layoutData;
					this.showClassify = false;
				} else {
					this.classifyList = res.data.layoutData[0].dataList;
					this.showClassify = true;
				}
				this.showLoading = false;
			}).catch((err) => {
				console.log(err);
			})
		},
		addDetail(id, title) {
			this.$router.push({
				path: `/classifyDetail/${id}`,
				query: {
					title: title
				}
			})
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
		Navbar,
		Loading
	}
}
</script>
<style type="text/css" lang="scss" scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
.loading-wrap{
	position:fixed;
}
.classify-list{
	.list{
		padding: 0 0.3rem;
		.item{
			height:1.1rem;
			display: flex;
			align-items:center;
			.img{	
				width: 0.8rem;
				height:0.8rem;
				overflow: hidden;
				border-radius: 50%;
			}
			.name-wrap{
				height: 1.1rem;
				margin-left:0.3rem;
				flex:1;
				display:flex;
				align-items:center;
				justify-content: space-between;
				border-bottom:1px solid $color-line;
				.name{
					font-size: $font-size-m;
					color:$color-title;
				}
				.icon{
					font: bold 36px 'simsun';
					color:#ddd;
				}
			}
			&:last-child{
				.name-wrap{
					border-bottom:0;
				}
			}
		}
	}	
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