<template>
	<div class="wrapper">
		<div class="placeholder"></div>
		<div id="classify-list">
			<div class="title">所有分类</div>
			<ul class="list">
				<li class="item" v-for="item in classifyList" @click="addId(item.detailId, item.name)">
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
		<foot></foot>
		<div class="loading-wrap" v-if="!classifyList.length">
			<loading></loading>
		</div>
	</div>
</template>
<script type="text/javascript">
import {getClassify} from 'api/classify';
import Loading from 'components/Base/loading';
import Foot from 'components/Foot/foot';

export default {
	data() {
		return {
			classifyList: []
		}
	},
	created() {
		this._getClassify();
	},
	methods: {
		_getClassify() {
			getClassify().then((res) => {
				this.classifyList = res.data.layoutData[1].dataList;
			}).catch((err) => {
				console.log(err);
			})
		},
		addId(id, title) {
			this.$router.push({
				path: `/classifyDetail/${id}`,
				query: {
					title: title
				}
			})
		}
	},
	components: {
		Loading,
		Foot
	}	
}
</script>
<style type="text/css" lang="scss" scoped>
@import 'common/css/variable.scss';
.placeholder{
	height:1rem;
}
#classify-list{
	&>.title{
		padding:0 0.3rem;
		height:0.7rem;
		line-height: 0.7rem;
		font-size: $font-size-m;
		color:$color-text;
		background: #f7f7f7;
	}
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
</style>