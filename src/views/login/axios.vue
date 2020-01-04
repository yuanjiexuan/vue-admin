<template>
  <div id="login">
    <!-- <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{'current': isActive}"
          v-for="(item,index) in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
    </div>-->
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>
<script>
import { start } from "repl";
export default {
  name: "login",
  data() {
    return {
      menuTab: [{ txt: "登录" }, { txt: "注册" }],
      msg: "Welcom to your vue.js app"
    };
  },
  created() {},
  methods: {
    //vue中数据驱动视图渲染
    toggleMenu(data) {},
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "" },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["target temp", "set temp"]
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          show: false,
          type: "value"
        },
        series: [
          {
            name: "target temp",
            type: "line",
            step: "start",
            data: [20, 20, 25, 26, 24, 23, 24]
          },
          {
            name: "set temp",
            type: "line",
            step: "start",
            data: [20, 20, 25, 24, 24, 23, 24]
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
