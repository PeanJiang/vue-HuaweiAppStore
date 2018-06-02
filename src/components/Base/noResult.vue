<template>
    <div class="no-result">
        <div class="no-result-icon"><i class="iconfont icon-jinggao-yuan"></i></div>
        <p class="no-result-text">{{title}}</p>
    </div>
</template>

<script type="text/javascript">
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style type="text/css" lang="scss" scoped>
@import "common/css/variable.scss";
@import "common/css/mixin.scss";

.no-result{
    padding:0.3rem 0;
    text-align: center;
    color: $color-gray;
    .no-result-icon{
        width: 1rem;
        height: 1rem;
        margin: 0 auto;
        text-align:center;
        line-height: 1rem;
        background-size: 1rem 1rem;
        .iconfont{
            font-size:0.8rem;
            color:#ccc;
        }
    }
    .no-result-text{
        line-height: 0.5rem;
        font-size: $font-size-s;
    }
}
</style>