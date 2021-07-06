<template>
    <div>
        <div class="container">
            <form style="max-width:600px; margin:0 auto;" @submit.prevent="updateUser">
                     <div class="form-group row">
                        <label for="username" class="col-sm-2 col-form-label">名稱</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="username" placeholder="請填入名稱" 
                            @change="onchange(name,'name')"
                            v-model="name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="Email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email"  class="form-control" id="Email" placeholder="請輸入Email"
                            @change="onchange(email,'email')"
                            v-model="email">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">更新密碼</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" placeholder="請輸入新密碼"
                            @change="onchange(passWord,'passWord')"
                            v-model="passWord">
                        </div>
                    </div>
                     <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary">儲存</button>
                    </div>
            </form>
        </div>
    </div>
</template>

<script>
import {fb}  from '../../firebase/firebase.js';
export default {
    data(){
        return{
            name:'',
            email:'',
            passWord:'',
            edit:{}
        }
    },
    methods:{
        onchange(val,e){
            let vm = this;
            vm.edit[e] = val;
        },
        updateUser(){
            let vm = this;
            if(vm.edit.passWord){
                vm.updatePassword();
            }
            
            if(vm.edit.email){
             
                vm.updateUserEmail();
            }
            
            if(vm.edit.name){
                vm.updateUserProfile();
            }
        },
        updateUserEmail(){
            let vm = this;
            const user = fb.currentUser;
            
            user.updateEmail(vm.edit.email)
            .then(() => {
               vm.$bus.$emit('message:push', 'Email更新成功！','success');
            }).catch((error) => {
                vm.$bus.$emit('message:push', error.message );
            });
            
        },
        updatePassword(){
            let vm = this;
            const user = fb.currentUser;

            user.updatePassword(vm.edit.passWord)
            .then(() => {
                vm.$bus.$emit('message:push', '密碼更新成功！','success');
            }).catch((error) => {
                vm.$bus.$emit('message:push', error.message ,'danger');
            });
           
        },
        updateUserProfile() {
            let vm = this;
            const user = fb.currentUser;
            user.updateProfile({displayName: vm.edit.name})
            .then(() => {
                vm.$bus.$emit('message:push', '名稱更新成功！','success');
            }).catch((error) => {
                vm.$bus.$emit('message:push', error.message ,'danger');
            });  
        },
        getUserProfileProvider() {
            let vm = this;
            const user = fb.currentUser;

            if (user !== null) {
                user.providerData.forEach((profile) => {
                    vm.email = profile.email;
                    vm.name = profile.displayName;
                    console.log(profile)
                    // console.log("Sign-in provider: " + profile.providerId);
                    // console.log("  Provider-specific UID: " + profile.uid);
                    // console.log("  Name: " + profile.displayName);
                    // console.log("  Email: " + profile.email);
                    // console.log("  Photo URL: " + profile.photoURL);
                });
            }
        }
    },
    created(){
        this.getUserProfileProvider();
    }
}
</script>