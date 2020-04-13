<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { ref, computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String, //定义接受得值的属性
      default: "qqqq",
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  }, //["iconClass","className"],
  setup(props) {
    //console.log(props.iconClass);
    const msg = ref("afaf");

    const iconName = computed(() => `#icon-${props.iconClass}`);

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    return {
      msg,
      iconName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
  &.font12 {
    font-size: 20px;
  }
  color: #ffffff;
}
</style>
