<template>
	<div class="loading" :class="row ? 'row' : ''">
		<img class="img" width="24" height="24" src="./loading.gif">
		<p class="desc">{{title}}</p>
	</div>
</template>

<script type="text/javascript">
export default {
	props: {
		title: {
			type: String,
			default: '正在载入，请稍后...'
		},
		row: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style type="text/css" lang="scss" scoped>
@import "common/css/variable.scss";
.loading{
	width: 100%;
	padding: 0.2rem 0;
	margin: auto;
	text-align: center;
	&.row{
		.img,.desc{
			display:inline-block;
			vertical-align:middle;
		}
	}
	.img{
		width: 24px;
		height: 24px;
		display:inline-block;
	}
	.desc{
	    font-size: $font-size-s;
	    color: $color-gray;
	}
}
</style>
