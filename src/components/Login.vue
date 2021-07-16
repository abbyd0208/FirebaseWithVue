<template>
  <div>
	<form class="form-signin" @submit.prevent="signin">
		<h1 class="h3 mb-3 font-weight-normal">登入任務旋轉門後台</h1>
		<label for="inputEmail" class="sr-only">Email address</label>
		<input type="email" id="inputEmail" class="form-control" placeholder="請輸入信箱" v-model="user.username" required autofocus>
		<label for="inputPassword" class="sr-only">Password</label>
		<input type="password" id="inputPassword" class="form-control" placeholder="密碼" v-model="user.password" required>
		<button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
		<p class="mt-5 mb-3 text-muted">&copy; 2021 CiRCLELiNKS 智合圈</p>
	</form>
  </div>
</template>

<script>
import {fb}  from '../firebase/firebase.js';
import Alert from'./AlertMessage';
// console.log(fb)
export default {
  name: 'HelloWorld',
  data () {
    return {
      user:{
        username:'',
        password:''
      }
    }
  },
  components:{
    Alert
  },
  methods:{
    signin(){
      let vm = this;
      
      fb.signInWithEmailAndPassword(this.user.username, this.user.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        vm.$router.push('/admin/mission-list');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // 可能錯誤：
        // auth/invalid-email email 不符規定
        // auth/user-disabled 該 email 已被停用
        // auth/user-not-found 找不到該使用者
        // auth/wrong-password 密碼錯誤
        alert(errorMessage)
        vm.$bus.$emit('message:push',errorMessage,'danger');
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
