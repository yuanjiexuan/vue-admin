<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="name"></use>
    </svg>
</template>
<script>
import { ref, reactive, isref, toRefs, onMounted } from "@vue/composition-api";
export default {
    name: "svgIcon",
    props: ["iconClass","className"],
    setup(props){
        console.log(props.iconClass)
        const msg = ref("afaf");
         return {
             msg
         }
    }
}
</script>
<style lang="scss" scoped>

</style>