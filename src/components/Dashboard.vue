<template>
    <div class="admin">
        <header>
            <h4>任務旋轉門後台</h4>
        </header>
         <aside>
            <div class="list-group">
               <h5>任務管理</h5>
                <router-link class="item-link"  to="/admin/mission-add" >新增任務</router-link>
               <a class="item-link" href="#">任務列表</a>
            </div>
            <div class="list-group">
               <h5>焦點管理</h5>
                <router-link class="item-link"  to="/admin/mission-point">焦點管理</router-link>
            </div>
             <div class="list-group">
               <h5>產業標籤管理</h5>
               <a class="item-link" href="#">新增標籤</a>
               <a class="item-link" href="#">標籤列表</a>
            </div>
        </aside>
        <div class="container-fluid">
           
             <div class="container">
                <h5>任務列表</h5>
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" width="10%">id</th>
                            <th scope="col" width="10%">排序值</th>
                            <th scope="col">標題</th>
                            <th scope="col">公司名稱</th>
                            <th scope="col">推薦星星</th>
                            <th scope="col">刊登開始</th>
                            <th scope="col">刊登結束</th>
                            <th scope="col">上/下架</th>
                            <th scope="col" width="10%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                         <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>1</td>
                            <td>2021/5/12</td>
                            <td>2021/6/12</td>
                            <td>上架</td>
                            <td> <button type="button" class="btn btn-primary btn-sm">編輯</button>
                                <button type="button" class="btn btn-danger btn-sm">刪除</button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>

                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'Dashboard'
}
</script>
