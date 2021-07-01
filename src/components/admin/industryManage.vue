<template>
    <div>
        <div class="container">
            <h5>產業標籤管理</h5>
            
            <div class="d-flex justify-content-end mb-3 ">
                <button type="button" class="btn btn-success btn-sm" @click="showModel(true)">新增</button>
            </div>

                <vue-good-table
                    :columns="columns"
                    :rows="tags"
                    :search-options="{
                            enabled: true,
                            trigger: 'enter',
                            placeholder: '搜尋表格',
                            
                        }"
                    >
                    <div slot="emptystate">
                        <p>資料載入中....</p>
                    </div>
                     <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'operate'">
                        <button type="button" class="btn btn-primary btn-sm" @click="showModel(false,props.row)">編輯</button>
                        <button type="button" class="btn btn-danger btn-sm" @click="deleteIndustryTag(props.row)">刪除</button>
                    </span>
                    </template>
                </vue-good-table>

                <!-- 編輯 modal -->
                <div class="modal fade" tabindex="-1" id="editTag" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" v-if="isNew">新增產業標籤</h5>
                                <h5 class="modal-title" v-else>編輯產業標籤</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <!-- <div class="form-group row">
                                        <label for="industryId" class="col-sm-4 col-form-label">產業標籤</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="industryId"  placeholder="請填寫產業標籤"
                                            v-model="editItem.docId">
                                        </div>
                                    </div> -->
                                    <div class="form-group row">
                                        <label for="zhCn" class="col-sm-3 col-form-label">簡體</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="zhCn" placeholder="請填寫簡體"
                                            v-model="editItem.zh_cn">
                                            <small class="text-primary">請盡量避免使用重複的「簡體中文翻譯」</small>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="zhTw" class="col-sm-3 col-form-label">繁體</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="zhTw" placeholder="填寫繁體"
                                            v-model="editItem.zh_tw">
                                            <small class="text-primary">請盡量避免使用重複的「繁體中文翻譯」</small>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="en" class="col-sm-3 col-form-label">英文</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="en" placeholder="填寫英文"
                                            v-model="editItem.en" >
                                            <small class="text-primary">請輸入純英文，並盡量避免使用重複的「英文翻譯」</small>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click="saveChange">儲存變更</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>

import db from '../../firebase/firebase.js';
import { VueGoodTable } from 'vue-good-table';

export default {
    name:'IndustryManage',
    data(){
        return{
            edit:false,
            tags:[],
            editItem:{},
            isNew:false,
            words:[],
            columns:[
                {
                    label:'產業標籤',
                    field:'docId'
                },
               
                {   label:'簡體',
                    field:'zh_cn'
                },
                {
                    label:'繁中',
                    field:'zh_tw'
                },
                {
                    label:'英文',
                    field:'en'
                },
                {
                    label:'操作',
                    field:'operate'
                },
            ]
        }
    },
    components:{
       VueGoodTable,
    },
    computed:{
        transToId2(){
            if(editItem.en){
                // todo 我只要把輸入進去的value去做判斷就好，其他不用想
            }
        }
    },
    methods:{
        getCollection (){
            let vm = this;
            let docRef = db.collection("industryTag");
            let payload=[];
            docRef
            .get()
            .then((doc) => {
                doc.forEach(item =>{
                    if (item.exists) {
                        // 將集合的id與doc內的內容一起存進資料內
                        payload.push({docId:item.id, ...item.data()}) 
                        vm.tags = payload;
                    } else {
                        console.log("No such document!");
                    }
                })
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        },
        showModel(isNew,item){
            console.log(isNew)
            if(isNew){
                this.editItem = {};
                this.isNew = true;
            }else{
                this.editItem = Object.assign({},item);
                this.isNew = false;
            }
            $('#editTag').modal('show');
        },
        transToId(value){

            // if (value.charCode<97 || value.charCode>122) {
            //     value.preventDefault();
            //     alert('請輸入小寫英文')
            // };
            let word='';
            let vm = this;
            let trans = '';
            console.log(value);
            // console.log(value.key);

            // word = value.key
            // console.log(typeof(word))
            // vm.words.push(word)
            // trans =  vm.words.join('');
            // console.log(trans);

            // vm.words = vm.words.join().toLowerCase().replace(/\s+/g,"_");

            // word = value.toString();
            
            // value
            // console.log(value)
        },
        deleteIndustryTag(item){
            let vm = this;
            db.collection("industryTag")
            .doc(item.docId)
            .delete()
            .then(() => {
                vm.$bus.$emit('message:push','刪除成功','success');
                this.getCollection();
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        },
        saveChange(){
            let vm = this;
            if(this.isNew){
                db.collection("industryTag")
                .doc(vm.editItem.docId)
                .set(vm.editItem)
                .then((docRef) => {
                    $('#editTag').modal('hide');
                    vm.getCollection();
                    vm.$bus.$emit('message:push','新增成功','success');
                })
                .catch((error) => {
                    console.log(error);
                });
            }else{
                db.collection("industryTag")
                .doc(vm.editItem.docId)
                .update(vm.editItem)
                .then(function() {
                    $('#editTag').modal('hide');
                    vm.getCollection();
                    vm.$bus.$emit('message:push','更新成功','success');
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    },
    created(){
        this.getCollection();
    }
}
</script>