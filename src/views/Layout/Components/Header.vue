<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="Menu" class="Menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../../public/image/gly.jpg" />
        管理员
      </div>
      <div class="header-icon pull-left">
        <svg-icon iconClass="Exit" class="Exit"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'layoutHeader',
  setup(props, { root }){
    const navMenuState = () => {
      root.$store.commit('SET_COLLAPSE')
    }
    return {
      navMenuState
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #ffffff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1) );
  @include webkit(transition, all .3s ease 0s);
  line-height: 75px;
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    width: 50px;
    height: 50px;
    // border: 1px solid #ffffff;
    // border-radius: 50px;
    // line-height: 75px;
    // vertical-align: middle;
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
  }
}
</style>
