<template>
    <div class="admin">
        <Alert></Alert>
        <header class="d-flex justify-content-between">
            <h4>任務旋轉門後台</h4>
            <a class="btn btn-light" href="#" @click="signOut">登出</a>
        </header>
         <Aside></Aside>
        <div class="container-fluid">
             <div class="container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
import Aside from'./Aside';
import Alert from'./AlertMessage';
import {fb}  from '../firebase/firebase.js';

export default {
    name:'Dashboard',
    data(){
        return{
            data:''
        }
    },
    components:{
        Aside,
        Alert
    },
    methods:{
        
        signOut(){
            let vm = this;
            fb.signOut();
            const user = fb.currentUser;

            if (user) {
                console.log(user)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                // ...
            } else {
                console.log('登出')
                // No user is signed in.
            }
            // vm.$router.push('/login');
        }
    }
    
}


</script>


