<template>
    <div>
         <div class="side">
            <div class="side_clode"><i class="fas fa-times"></i></div>
            <div class="inner">
                <router-link  to="/about">任務旋轉門</router-link>
                <router-link to="/missions">任務列表</router-link>
            </div>
        </div>
        <div class="header">
            <div class="inner">
                <h1 class="logo">  <router-link to="/missions">CiRCLELiNKS</router-link> </h1>
                <div class="menu">
                    <router-link  to="/about">任務旋轉門</router-link>
                    <router-link to="/missions">任務列表</router-link>
                </div>
                <div class="side_open">
                    <i class="fas fa-bars"></i>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    neme:'Header'
}
</script>
