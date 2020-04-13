import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //isCollapse: JSON.parse(Cookie.get('isCollapse')) || false,
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    //isCollapse: JSON.parse(localStroge.getItem('isCollapse')) || false,
    //count: 10
  },
  getters: { //computed
    count: state => state.count + 10,
    //es5
    // count: function (state) {
    //   return state.count + 10
    // }
  },
  mutations: {
    //大小写都可以
    SET_COLLAPSE(state){
      state.isCollapse = !state.isCollapse
      //html5本地存储
      sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
      //localStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
      //Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
      console.log(state.isCollapse)
    },

    // SET_COUNT(state, value){ 
    //   state.count = value
    //   console.log(state.count)
    // }
  },
  actions: {}
});
