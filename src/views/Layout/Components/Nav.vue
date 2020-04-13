<template>
  <div id="nav-wrap">
    <div class="logo">
      <img src="../../../../public/image/logo.png" alt="">
    </div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i :class="item.meta.icon"> </i> -->
            <svg-icon :iconClass="item.name" className="menu font12" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >
            {{ subItem.meta.name }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    //data数组
    //const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);
    /**
     * data数据
     */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    /**
     * computed 监听
     */
    // const isCollapse = computed(() => {
    //   return root.$store.state.isCollapse
    // })
    const isCollapse = computed(() => root.$store.state.isCollapse);
    //打印
    //console.log(root.$store.state.count)
    //console.log(root.$store.getters.count)

    //root.$store.commit('SET_COUNT',100)
    return {
      isCollapse,
      handleOpen,
      handleClose,
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
  text-align: center;
  img {
    margin: 28px auto 25px;
    width: 92px;
    @include webkit(transition, all .3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background: #344a5f;
  @include webkit(transition, all .3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.open {
  #nav-wrap { width: $navMenu; }
}
.close {
  #nav-wrap { width: 64px; }
  .logo img { width: 70%; }
}
</style>
