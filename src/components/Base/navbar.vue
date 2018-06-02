<template>
	<header id="navbar">
		<div class="navbar">
			<div class="icon" @click="back"><i class="iconfont icon-zuojiantou"></i></div>
			<div class="title" v-text="title"></div>
			<div class="icon" @click="goSearch"><i class="iconfont icon-sousuo"></i></div>
		</div>
	</header>
</template>
<script type="text/javascript">
export default {
	props: {
		title: {
			type: String,
			default: '详情'
		}
	},
	methods: {
		back() {
			this.$router.back();
		},
		goSearch() {
			this.$router.push({path:'/search'})
		}
	}
}
</script>
<style type="text/css" lang="scss" scoped>
@import 'common/css/variable.scss';
@import 'common/css/mixin.scss';
#navbar{
	height:0.9rem;
	.navbar{
		width: 7.5rem;
		height:0.9rem;
		padding:0 0.3rem;
		position:fixed;
		left:0;
		right:0;
		top:0;
		margin: 0  auto;
		z-index:999;
		display:flex;
		background: #fff;
		box-shadow: 0 1px 2px #ddd;
		.icon,.title{
			height:0.9rem;
			line-height: 0.9rem;;
		}
		.title{
			padding:0 0.3rem;
			flex:1;
			text-align:center;
			font-size:$font-size-l;
			color:$color-title;
			@extend .nowrap;
		}
		.iconfont{
			font-size:$font-size-l-x;
			color:$color-theme;
			&.icon-zuojiantou{
				font-size:0.6rem;
			}
		}
	}
}
</style>