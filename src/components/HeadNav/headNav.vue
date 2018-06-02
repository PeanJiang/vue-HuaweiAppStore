<template>
	<nav id="nav-tab" v-if="isHide">
		<ul class="tab-list" ref="navList" :class="[checked ? 'active' : '', alpha]">
			<router-link tag="li" to="/recommend" class="tab-item">推荐</router-link>
			<router-link tag="li" to="/classify" class="tab-item">分类</router-link>
			<router-link tag="li" to="/rank" class="tab-item">排行</router-link>
			<router-link tag="li" to="/search" class="tab-item">搜索</router-link>
		</ul>
	</nav>
</template>
<script type="text/javascript">
const SCALE_HEIGHT = 200;
export default {
	data() {
		return {
			checked: false
		}
	},
	computed: {
		alpha() {
			return this.$route.name == 'recommend' ? 'alpha' : '';
		},
		isHide() {
			let route = this.$route.name;
			if ((route == 'recommend') || (route == 'rank') || (route == 'classify') || (route == 'search')) {
				return true;
			} else {
				return false;
			}
		}
	},
	watch: {
		$route(now, old) {
			if (now.name == 'recommend') {
				this.checked = false;
			} else {
				this.checked = true;
			}
		}
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll);
	},
	methods: {
		handleScroll(e) {
			if (!this.$refs.navList) {
				return;
			}
			let nav = this.$refs.navList;
			let scrollTop = document.documentElement.scrollTop;
			let scale = scrollTop / SCALE_HEIGHT;
			nav.style.background = `rgba(255,255,255,${scale})`;
			if (scale > 0.6) {
				this.checked = true;
			} else {
				this.checked = false;
			}
		}
	}
}
</script>
<style type="text/css" lang="scss" scoped>
@import 'common/css/variable.scss';
#nav-tab{
	position:fixed;
	width: 7.5rem;
	margin: 0 auto;
	left:0;
	right: 0;
	z-index: 999;
	height: 1rem;
	.tab-list{
		height: 1rem;
		display: flex;
		.tab-item{
			flex: 1;
			height: 1rem;
			line-height: 0.9rem;
			text-align:center;
			font-size: $font-size-l;
			color:$color-text;
			border-bottom: 2px solid $color-line;
			background: rgba(255,255,255,1);
			&.router-link-exact-active,&.router-link-active{
				color:$color-theme;
				border-bottom-color: $color-theme;
			}
		}
		&.alpha{
			.tab-item{
				color:#fff;
				border-bottom: 2px solid transparent;
				background: rgba(255,255,255,0);
				&.router-link-exact-active,&.router-link-active{
					border-bottom-color: #fff;
				}
			}
		}
		&.active{
			.tab-item{
				color:$color-text;
				&.router-link-exact-active,&.router-link-active{
					color:$color-theme;
					border-bottom-color: $color-theme;
				}
			}
		}
	}
}
</style>