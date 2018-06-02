<template>
	<swiper :options="swiperOptions" ref="mySwiper" >
		<slot></slot>
		<div class="swiper-pagination"  slot="pagination"></div>
	</swiper>
</template>
<script type="text/javascript">
import {swiper} from 'vue-awesome-swiper';

export default {
	name: 'swipper',
	data() {
		return {
			swiperOptions: {
			    autoplay: true,
			    loop: true,
			    direction: 'horizontal',
			    pagination: {
			    	el: '.swiper-pagination'
			    },
			    navigation: {
			    	nextEl: '.swiper-button-next',
			    	prevEl: '.swiper-button-prev'
			    }
			}
		}
	},
	created() {
		window.addEventListener('resize', () => {
			this.$refs.mySwiper.swiper;
		})
	},
	components: {
		swiper
	}
}
</script>
<style type="text/css" lang="scss">
.swiper-pagination-bullet.swiper-pagination-bullet-active{
	background: #fff;
}
.swiper-pagination-bullet{
	width: 6px;
	height: 6px;
	&.active{
		opacity:1;
		background: #fff;
	}
}
</style>