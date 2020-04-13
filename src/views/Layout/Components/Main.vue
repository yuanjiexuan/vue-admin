<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">addD</div>
    </div>
  </div>
</template>
<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "mainmenu",
  setup(){
    //const str = ref('{"name": "手把手撸代码", "title": "aaaaaa"}');转成对象
    //const str = ref('["aaa","bbb"]') //["aaa","bbb"]
    // const json11 = reactive(JSON.parse(str.value))
    // console.log(str.value)
    // console.log(json11[0])
    // return {
    //   str,
    //   json
    // }
   //const 
  }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  // position: fixed;
  // left: $navMenu;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // padding: 30px;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // -webkit-box-sizing: border-box;
  height: 100vh;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-left: $navMenu + 30;
  padding-right: 30px;
  -webkit-box-sizing: border-box;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all .3s ease 0s);
  box-sizing: border-box;
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  @include webkit(box-sizing, border-box);
  background-color: #fff;
}
</style>
