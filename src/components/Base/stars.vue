<template>
	<div class="stars">
		<span class="star" v-for="(item, index) in starNum" :class="initGrade(index + 1)"></span>
	</div>
</template>
<script type="text/javascript">
const STAR_NUM = 10;
const TOTAL_GRADE = 5;
export default {
	props: {
		grade: {
			type: Number,
			default: 5
		}
	},
	data() {
		return {
			starNum: new Array(10)
		}
	},
	methods: {
		initGrade(index) {
			let grade = TOTAL_GRADE * STAR_NUM;
			let solid = ((this.grade * STAR_NUM) - (this.grade * STAR_NUM) % TOTAL_GRADE) / 5;
			if (index <= solid) {
				if (index % 2) {
					return 's1';
				} else {
					return 's2';
				}
			} else {
				if (index % 2) {
					return 's3';
				} else {
					return 's4';
				}
			}
		}
	}
}
</script>
<style type="text/css" lang="scss" scoped>
.stars{
	display:flex;
	.star{
		margin:0;
		padding:0;
		width: 0.12rem;
		height:0.24rem;
		font-size:0;
		background-size:0.12rem 0.24rem;
		background-repeat:no-repeat;
		&.s1{
			background-image: url(s1.png);
		}
		&.s2{
			background-image: url(s2.png);
		}
		&.s3{
			background-image: url(s3.png);
		}
		&.s4{
			background-image: url(s4.png);
		}
	}
}
</style>