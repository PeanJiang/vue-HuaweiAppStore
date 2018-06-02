<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll';
import {getStyle} from 'common/js/dom';

export default {
	props: {
		probeType: {
			type: Number,
			default: 1
		},
		click: {
			type: Boolean,
			default: true
		},
		data: {
			type: Array,
			default: null
		},
		scrollX: {
			type: Boolean,
			default: true
		},
		scrollY: {
			type: Boolean,
			default: false
		},
		freeScroll: {
			type: Boolean,
			default: false
		},
		preventDefault: {
			type: Boolean,
			default: false
		},
		pullup: {
			type: Boolean,
			default: false
		},
		beforeScroll: {
			type: Boolean,
			default: false
		},
		bounce: {
			type: Boolean,
			default: true
		}
	},
	mounted() {
		setTimeout(() => {
		  	this._initScroll();
		}, 20)
	},
	methods: {
		_initScroll() {
			if (!this.$refs.wrapper) {
				return;
			}
			this.scroll = new BScroll(this.$refs.wrapper, {
				probeType: this.probeType,
				click: this.click,
				scrollX: this.scrollX,
				scrollY: this.scrollY,
				freeScroll: this.freeScroll,
				preventDefault: this.preventDefault,
				bounce: this.bounce
			})
			if (this.pullup) { //上拉加载用
				this.scroll.on('scrollEnd', () => {
					if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
						this.$emit('scrollToEnd');
					}
				})
			}

			if (this.beforeScroll) {
				this.scroll.on('beforeScrollStart', () => {
					this.$emit('beforeScroll');
				})
			}
			if (this.scrollX) { //如果横向滚动，初始化宽度
				let children = this.$refs.wrapper.children[0];
				let item = children.childNodes;
				let width = 0;
				let margin = 0;
				let ml = 0;
				for (let i = 0; i < item.length; i++) {
					width += Number.parseInt(item[i].clientWidth);
					ml = Number.parseInt(getStyle(item[i], 'margin-left'));
					margin += ml;
				}
				children.style.width = (width + margin + ml) + 'px';
			}
		},
		refresh() {
			this.scroll && this.scroll.refresh();
		},
		enable() {
			this.scroll && this.scroll.enable();
		},
		disable() {
			this.scroll && this.scroll.disable();
		},
		scrollTo() {
			this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
		},
		scrollToElement() {
			this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
		}
	},
	watch: {
		data() {
			setTimeout(() => {
			  this.refresh();
			}, 50)
		}
	}
}
</script>
<style type="text/css" lang="scss" scoped>
	
</style>