<template>
    <div>
        <aside>
            <div class="list-group">
               <h5>帳號管理</h5>
                <router-link class="item-link"  to="/admin/user-admin">帳號管理</router-link>
            </div>
            <div class="list-group">
               <h5>任務管理</h5>
                <router-link class="item-link"  to="/admin/mission-add">新增任務</router-link>
                <router-link class="item-link"  to="/admin/mission-list">任務列表</router-link>
            </div>
            <div class="list-group">
               <h5>焦點管理</h5>
                <router-link class="item-link"  to="/admin/mission-point">焦點管理</router-link>
            </div>
             <div class="list-group">
               <h5>產業標籤管理</h5>
                <router-link class="item-link"  to="/admin/industry-manage">產業標籤管理</router-link>
            </div>
        </aside>
    </div>
</template>

<script>
export default {
    name:"Aside"
}
</script>