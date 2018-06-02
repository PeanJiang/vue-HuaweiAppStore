<template>
    <div id="app">
    	<head-nav></head-nav>
        <div id="container">
        	<router-view></router-view>
        </div>
    </div>
</template>

<script type="text/javascript">
import HeadNav from 'components/HeadNav/headNav.vue';
import BScroll from 'better-scroll';

export default {
	data() {
		return {
			scrollX: false,
			scrollY: true
		}
	},
    components: {
        HeadNav,
        BScroll
    }
}
</script>

<style type="text/css" lang="scss">
#app{
	margin: 0 auto;
	width: 7.5rem;
	overflow-x: hidden;
	background-color: #fff;
}
.loading-wrap{
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index:998;
    display:flex;
    background: #fff;
}
</style>
