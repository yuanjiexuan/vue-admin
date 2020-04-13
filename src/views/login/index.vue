<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{'current': item.current}"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form">
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
              >{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
          >{{ model === "login" ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "@/api/login";
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVCode
} from "@/utils/validate.js";
export default {
  name: "login",
  //setup(props, context) {
  setup(props, { refs, root }) {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误")); //true
      } else {
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6-20位的数字+字母!"));
      } else {
        callback();
      }
    };
    //验证重复密码
    let validatePasswords = (rule, value, callback) => {
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    //验证码
    let validateCode = (rule, value, callback) => {
      ruleForm.code = stripscript(value);
      value = ruleForm.code;

      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (validateVCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    const model = ref("login");
    //登录按钮禁用状态
    const loginButtonStatus = ref(true);
    //计时器
    const timer = ref(null);
    //验证码按钮状态
    //const codeButtonStatus = ref(false)
    //const codeButtonText = ref("获取验证码")

    //
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码"
    });
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    //声明函数
    const toggleMenu = data => {
      menuTab.forEach((elem, index) => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type;
      //重置表单
      //this.$refs[formName].resetFields();//2.0
      refs.loginForm.resetFields(); //3.0
      //console.log(122)
    };
    //获取验证码
    const getSms = () => {
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式有误，请重新输入！！");
        return false;
      }
      //获取验证码
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };
      setTimeout(() => {
        GetSms(requestData)
          .then(response => {
            let data = response.data;
            root.$message({
              message: data.message,
              type: "success"
            });
            //启用登录或者注册按钮
            loginButtonStatus.value = false;
            //调定时器，倒计时
            countDown(60);
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }, 3000);
      // .then(response => {

      // }).catch(error => {
      //   console.log(error)
      // })
    };
    //提交表单
    const submitForm = (loginForm => {
      const axios = require("axios");
      //提交表单
      refs[loginForm].validate((valid) => {
        if (valid) {
          //三元运算
          model.value === 'login' ? login() : register()
          // if (model.value === 'login') {
          //   login()
          // } else {
          //   register()
          // }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    })
    /**
     * 登录
     */
    const login = () => {
      let responseData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password), //加密
        code: ruleForm.code
      }
      Login(responseData)
        .then(response => {
          console.log('登录成功')
          console.log(response)
          root.$router.push({
            name: "Console"
          })
        })
        .catch(error => {});
    }
    /**
     * 注册
     */
    const register = () => {
      let responseData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register"
      }
      Register(responseData)
        .then( response => {
          let data = responseData.data;
          root.$message({
            message: data.message,
            type: "succsee"
          });
          //模拟注册成功
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(error => {
          console.log(error)
        });
    }
    // 倒计时
    const countDown = number => {
      //判断定时器是否存在，存在清楚
      if (timer.value) {
        clearInterval(timer.value);
      }
      //60 和 0 不见了故意留bug
      //两种倒计时 setTimeout 只执行一次
      //setInterval 不断执行
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          codeButtonStatus.status = false;
          codeButtonStatus.text = "再次获取验证码";
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };
    const clearCountDown = () => {
      //还原验证码按钮的默认状态
      codeButtonStatus.status = false;
      codeButtonStatus.text = "获取验证码";
      //清除倒计时
      clearInterval(timer.value);
    };
    return {
      menuTab,
      toggleMenu,
      model,
      rules,
      submitForm,
      ruleForm,
      getSms,
      loginButtonStatus,
      codeButtonStatus,
      timer,
      countDown
    };
    onMounted(() => {
      //GetSms();
      console.log("1313");
    });
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
.login-form {
  margin-top: 29px;
  label {
    display: block;
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 3px;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
    line-height: 40px;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
