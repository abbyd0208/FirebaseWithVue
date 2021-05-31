<template>
    <div>
        <h5>任務列表</h5>
       
    <vue-good-table
      :columns="columns"
      :rows="missions">
    
     <template slot="table-row" slot-scope="props">
      <span v-if="props.column.field == 'operate'">
          <button type="button" class="btn btn-primary btn-sm" @click="showEditModel(props.row)">編輯</button>
          <button type="button" class="btn btn-danger btn-sm">刪除</button>
      </span>
    </template>

    </vue-good-table>

        <!-- Modal -->
        <div class="modal fade " id="editMinnion" tabindex="-1" role="dialog" aria-labelledby="editMinnionTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editMinnionTitle">編輯任務</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form" @submit.prevent="validateBeforeSubmit">
                        <div class="form-group row">
                            <label for="mission_id" class="col-sm-4 col-form-label">id</label>
                            <div class="col-sm-8">
                                <p>{{editItem.id}}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">任務標題</label>
                            <div class="col-sm-8">
                            <input type="text" name="subject" class="form-control" id="subject"
                            :class="{'is-invalid': errors.has('subject') }"
                            v-model="editItem.subject"
                            v-validate="'required'">
                             <span v-show="errors.has('subject')" class="help invalid-feedback">{{ errors.first('subject') }}</span>
                            </div>
                        </div>
                         <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">任務說明</label>
                            <div class="col-sm-8">
                                <textarea  class="form-control" name="subject_intro" id="subject_intro" cols="30" rows="10" placeholder="任務說明" 
                                :class="{'is-invalid': errors.has('subject_intro') }"
                                v-model="editItem.subject_intro"
                                v-validate="'required'"></textarea>
                                <span v-show="errors.has('subject_intro')" class="help invalid-feedback">{{ errors.first('subject_intro') }}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" name="cover" class="col-sm-4 col-form-label">主圖檔名</label>
                            <div class="col-sm-8">
                            <input type="text" class="form-control" name="cover" id="imgfilename" placeholder="主圖檔名 ex:example.jpg"
                            :class="{'is-invalid': errors.has('cover') }" 
                            v-model="editItem.cover"
                            v-validate="'required'">
                             <small  class="text-primary">請輸入圖片所在位置的網址 尺寸：至少 800 x 600 圖片格式：JPG、PNG 檔案大小：1MB 內</small>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">推薦星星</label>
                            <div class="col-sm-8">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="recommend" id="recommend1" 
                                    :value="1" 
                                    :checked="editItem.recommend == 1"
                                    v-model="editItem.recommend">
                                    <label class="form-check-label" for="recommend1">開啟</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="recommend" id="recommend2" 
                                    :value="0" 
                                    v-model="editItem.recommend">
                                    <label class="form-check-label" for="recommend2">關閉</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="subject_start_date" class="col-sm-4 col-form-label">需求開始日期</label>
                            <div class="col-sm-8">
                                <input type="date" name="subject_start_date" class="form-control" id="subject_start_date"
                                :class="{'is-invalid': errors.has('subject_start_date')}" 
                                v-model="editItem.subject_start_date"
                                v-validate="'required'">
                                <span v-show="errors.has('subject_start_date')" class="help invalid-feedback">{{ errors.first('subject_start_date') }}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="subject_end_date"  class="col-sm-4 col-form-label">需求結束日期</label>
                            <div class="col-sm-8">
                                <input type="date" name="subject_end_date" class="form-control" id="subject_end_date"
                                :class="{'is-invalid': errors.has('subject_end_date')}"
                                v-model="editItem.subject_end_date"
                                v-validate="'required'">
                                <span v-show="errors.has('subject_end_date')" class="help invalid-feedback">{{ errors.first('subject_end_date') }}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="locations" class="col-sm-4 col-form-label">需求地區標籤 (最多3個)</label>
                            <div class="col-sm-8">
                                <select class="form-control" @change="addLocations($event)" 
                                v-model="editItem.locations">
                                    <option value="台灣">台灣</option>
                                    <option value="中國">中國</option>
                                    <option value="香港">香港</option>
                                    <option value="日本">日本</option>
                                    <option value="泰國">泰國</option>
                                    <option value="馬來西亞">馬來西亞</option>
                                    <option value="柬埔寨">柬埔寨</option>
                                    <option value="越南">越南</option>
                                    <option value="新加玻">新加玻</option>
                                    <option value="印尼">印尼</option>
                                </select>
                                <label for="locations" class="col-sm-4 col-form-label">所選擇的標籤：</label>
                            <div class="col-sm-8">
                                <span class="label" v-for="(location,index) in editItem.locations" :key="index">{{location}}<em @click="removeLocations(index)">X</em> </span>
                            </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">需求產業標籤 (僅限1個)</label>
                            <div class="col-sm-8">
                                <select class="form-control" 
                                v-model="editItem.industryTag">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="companyName" class="col-sm-4 col-form-label">公司名稱</label>
                            <div class="col-sm-4">
                                <input type="text" name="companyName" class="form-control" id="companyName" placeholder="輸入公司名稱"
                                :class="{'is-invalid': errors.has('companyName') }"
                                v-model="editItem.company_name"
                                v-validate="'required'">
                                <span v-show="errors.has('companyName')" class="help invalid-feedback">{{ errors.first('companyName') }}</span>
                            </div>
                            <div class="col-sm-4">
                            <input type="checkbox" name="show_company_name" class="form-check-input" id="exampleCheck1"
                                :true-value="1"
                                :false-value="0"
                                :checked="editItem.show_company_name == 1">
                                <label class="form-check-label" for="exampleCheck1">顯示</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="company_intro" class="col-sm-4 col-form-label">公司側寫</label>
                            <div class="col-sm-8">
                            <textarea  class="form-control" name="company_intro" id="company_intro" cols="30" rows="10" placeholder="請輸入公司側寫"
                            :class="{'is-invalid': errors.has('company_intro') }"
                            v-model="editItem.company_intro"
                            v-validate="'required'"></textarea>
                             <span v-show="errors.has('company_intro')" class="help invalid-feedback">{{ errors.first('company_intro') }}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">刊登開始日期</label>
                            <div class="col-sm-8">
                                <input type="date" name="publish_start_date" class="form-control" id="publish_start_date"
                                :class="{'is-invalid': errors.has('publish_start_date') }"
                                v-model="editItem.publish_start_date"
                                v-validate="'required'">
                                <span v-show="errors.has('publish_start_date')" class="help invalid-feedback">{{ errors.first('publish_start_date') }}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">刊登結束日期</label>
                            <div class="col-sm-8">
                            <input type="date" name="publish_end_date" class="form-control" id="publish_end_date"
                            :class="{'is-invalid': errors.has('publish_end_date') }"
                            v-model="editItem.publish_end_date"
                            v-validate="'required'">
                            <span v-show="errors.has('publish_end_date')" class="help invalid-feedback">{{ errors.first('publish_end_date') }}</span>
                            <small class="text-primary">系統將依據「刊登結束日期」判斷該任務是否過期</small>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="priority"  class="col-sm-4 col-form-label">排序</label>
                            <div class="col-sm-8">
                                <input type="text" name="priority" class="form-control" id="priority" placeholder="預設排序" 
                                :class="{'is-invalid': errors.has('priority') }"
                                v-model="editItem.priority"
                                v-validate="'required'">
                                <span v-show="errors.has('priority')" class="help invalid-feedback">{{ errors.first('priority') }}</span>
                                 <small class="text-primary">排序權重值數字越大的，會排在越上面</small>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                            <button type="submit" class="btn btn-primary">儲存變更</button>
                        </div>
                    </form>
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
    name:'MissionList',
    data(){
        return{
            missions:[],
            editId:0,
            editItem:{
                locations:[],
            },
            columns: [
                {
                    label: 'id',
                    field: 'id',
                },
                {
                    label: '排序值',
                    field: 'priority',
                    type: 'number',
                },
                {
                    label: '任務標題',
                    field: 'subject',
                },
                {
                    label: '公司名稱',
                    field: 'company_name',
                },
                {
                    label: '公司名稱',
                    field: 'company_name',
                },
                {
                    label: '推薦星星',
                    field: 'recommend',
                },
                {
                    label: '刊登開始',
                    field: 'publish_start_date',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd',
                    dateOutputFormat: 'MMM do yy',
                },
                {
                    label: '刊登結束',
                    field: 'publish_end_date',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd',
                    dateOutputFormat: 'MMM do yy',
                },
                {
                    label: '上/下架',
                    field: 'enable',
                    type: 'number',
                },
                {
                    label: '操作',
                    field: 'operate',
                },
            ],
            rows: [
                { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
                { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
                { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
                { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
                { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
                { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
            ],
        }
    },
   components:{
       VueGoodTable,
   },
    methods:{
        showEditModel(item){
            console.log(item)
            this.editItem =Object.assign({},item);

            $('#editMinnion').modal('show');
        },
        validateBeforeSubmit(){
            let vm = this;
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let docRef = db.collection("missions");
                    docRef.doc(vm.editItem.docId).update(vm.editItem)
                    .then(function() {
                        $('#editMinnion').modal('hide');
                        vm.getCollection();
                        vm.$bus.$emit('message:push','更新成功','success');
                    })
                    .catch((error) => {
                        console.log("Error adding document: ", error);
                        $('#editMinnion').modal('hide');
                        vm.getCollection();
                        vm.$bus.$emit('message:push',error);
                    });
                }else{
                    vm.$bus.$emit('message:push','請修正錯誤');
                }
            });
        },
        addLocations(event){
            let vm = this;
            if(vm.mission.locations.length == 3){
                vm.$bus.$emit('message:push','地區選項只能有3個');
                return;
            }else{
                vm.mission.locations.push(event.target.value);
            }
        },
        removeLocations(index){
            let vm = this;
            vm.editItem.locations.splice(index,1)
        },
        getCollection(){
            let vm = this;
            let docRef = db.collection("missions").orderBy("priority","asc");
            let payload=[];
            docRef
            .get()
            .then((doc) => {
                doc.forEach(item =>{
                    if (item.exists) {
                        // 將集合的id與doc內的內容一起存進資料內
                        payload.push({docId:item.id, ...item.data()}) 
                        vm.missions = payload;
                    } else {
                        console.log("No such document!");
                    }
                })
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    },
    created(){
        this.getCollection();
        
    }
}
</script>