<template>
    <div class="admin">
        <header>
            <h4>任務旋轉門後台</h4>
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

export default {
    name:'Dashboard',
    data(){
        return{
            data:''
        }
    },
    components:{
        Aside
    },
    
}


</script>


