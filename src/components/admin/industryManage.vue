<template>
    <div>
        <div class="container">
            <h5>產業標籤管理</h5>
                <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" width="20%">產業標籤id</th>
                            <th scope="col" width="50%">標籤語系</th>
                            
                            <th scope="col" width="12%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                         <tr>
                            <td>
                                <div class="form-group">
                                    <label for="industry_en">產業標籤</label>
                                    <input type="text" class="form-control" id="industry_id" placeholder="請輸入產業標籤">
                                    </div>
                                    
                            <td>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                    <label for="industry_en">en</label>
                                        <input type="text" class="form-control" id="industry_en" placeholder="en">
                                    </div>
                                    <div class="form-group col-md-4">
                                    <label for="industry_zh_cn">zh_cn</label>
                                        <input type="text" class="form-control" id="industry_zh_cn" placeholder="zh_cn">
                                    </div>
                                    <div class="form-group col-md-4">
                                    <label for="industry_zh_tw">zh_tw</label>
                                        <input type="text" class="form-control" id="industry_zh_tw" placeholder="zh_tw">
                                    </div>
                                </div>
                            </td>
                        
                            <td> <button type="button" class="btn btn-success btn-sm" @click="addIndustryLabel">新增</button>
                            </td>
                        </tr>
                        <tr>
                            <td>food</td>
                            <td>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                    <label for="industry_en">en</label>
                                        <p v-if="edit == false">food</p>
                                        <input  type="text" class="form-control" id="industry_en" placeholder="en"
                                            v-if="edit"  
                                        >
                                    </div>
                                    <div class="form-group col-md-4">
                                    <label for="industry_zh_cn">zh_cn</label>
                                        <p v-if="edit == false">食品業</p>
                                        <input type="text" class="form-control" id="industry_zh_cn" placeholder="zh_cn"
                                            v-if="edit"
                                        >
                                    </div>
                                    <div class="form-group col-md-4">
                                    <label for="industry_zh_tw">zh_tw</label>
                                        <p v-if="edit == false">食品業</p>
                                         <input type="text" class="form-control" id="industry_zh_tw" placeholder="zh_tw"
                                             v-if="edit"
                                         >
                                    </div>
                                </div>
                            </td>
                        
                            <td> <button type="button" class="btn btn-primary btn-sm" @click="editIndustryLabel(true)" v-if="edit==false">編輯</button>
                                <button type="button" class="btn btn-success btn-sm" @click="saveIndustryLabel" v-if="edit">儲存</button>
                                <button type="button" class="btn btn-danger btn-sm" @click="deleteIndustryLabel">刪除</button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            edit:false
        }
    },
    methods:{
        addIndustryLabel(){
            alert('add')
        },

        editIndustryLabel(status){
            let vm = this;
            if(status){
                vm.edit = true;
            }
        },
        deleteIndustryLabel(){
            alert('delete')
        },
        saveIndustryLabel(){
            alert('save')
        }
    }
}
</script>