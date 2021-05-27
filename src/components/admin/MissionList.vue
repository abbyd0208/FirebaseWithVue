<template>
    <div>
        <h5>任務列表</h5>
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col" width="10%">id</th>
                    <th scope="col" width="10%">排序值</th>
                    <th scope="col">任務標題</th>
                    <th scope="col">公司名稱</th>
                    <th scope="col">推薦星星</th>
                    <th scope="col">刊登開始</th>
                    <th scope="col">刊登結束</th>
                    <th scope="col">上/下架</th>
                    <th scope="col" width="10%">操作</th>
                </tr>
            </thead>
            <tbody >
                    <tr v-for="(item) in missions" :key="item.id"> 
                    <td>{{item.id}}</td>
                    <td>{{item.priority}}</td>
                    <td>{{item.subject}}</td>
                    <td>{{item.company_name}}</td>
                    <td>{{item.recommend? "推薦":""}}</td>
                    <td>{{item.subject_start_date}}</td>
                    <td>{{item.subject_end_date}}</td>
                    <td>{{item.status == 1 ? "上架":"下架"}}</td>
                    <td> <button type="button" class="btn btn-primary btn-sm" @click="showEditModel(item)">編輯</button>
                        <button type="button" class="btn btn-danger btn-sm">刪除</button>
                    </td>
                </tr>
                
            </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade " id="editMinnion" tabindex="-1" role="dialog" aria-labelledby="editMinnionTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editMinnionTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form" >
                        <div class="form-group row">
                            <label for="mission_id" class="col-sm-4 col-form-label">id</label>
                            <div class="col-sm-8">
                                <p>{{editItem.id}}</p>
                                
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">任務標題</label>
                            <div class="col-sm-8">
                            <input type="text" class="form-control" id="subject"
                            v-model="editItem.subject">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">主圖檔名</label>
                            <div class="col-sm-8">
                            <input type="text" class="form-control" id="imgfilename" placeholder="主圖檔名 ex:example.jpg"
                             v-model="editItem.cover">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">推薦星星</label>
                            <div class="col-sm-8">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="recommend" id="recommend1" :value="1" 
                                    :checked="editItem.recommend == 1"
                                    v-model="editItem.recommend">
                                    <label class="form-check-label" for="recommend1">開啟</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="recommend" id="recommend2" :value="0" 
                                    :checked="editItem.recommend == 0"
                                     v-model="editItem.recommend">
                                    <label class="form-check-label" for="recommend2">關閉</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="subject_start_date" class="col-sm-4 col-form-label">需求開始日期</label>
                            <div class="col-sm-8">
                                <input type="date" class="form-control" id="subject_start_date" 
                                v-model="editItem.subject_start_date">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="subject_end_date" class="col-sm-4 col-form-label">需求結束日期</label>
                            <div class="col-sm-8">
                                <input type="date" class="form-control" id="subject_end_date"
                                 v-model="editItem.subject_end_date">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="locations" class="col-sm-4 col-form-label">需求地區標籤 (最多3個)</label>
                            <div class="col-sm-8">
                                <select class="form-control" 
                                v-model="editItem.locations">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                <label for="locations" class="col-sm-4 col-form-label">所選擇的標籤：</label>
                            <div class="col-sm-8">
                                <span class="label" v-for="(location,index) in editItem.locations" :key="index">{{location}}</span>
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
                                <input type="text" class="form-control" id="companyName" placeholder="輸入公司名稱"
                                v-model="editItem.company_name">
                            </div>
                            <div class="col-sm-4">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1"
                                :true-value="1"
                                :false-value="0">
                                <label class="form-check-label" for="exampleCheck1">顯示</label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="company_intro" class="col-sm-4 col-form-label">公司側寫</label>
                            <div class="col-sm-8">
                            <textarea  class="form-control" name="" id="company_intro" cols="30" rows="10" placeholder="請輸入公司側寫"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">刊登開始日期</label>
                            <div class="col-sm-8">
                                <input type="date" class="form-control" id="publish_start_date">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">刊登結束日期</label>
                            <div class="col-sm-8">
                            <input type="date" class="form-control" id="publish_start_end">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="priority" class="col-sm-4 col-form-label">排序</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="priority" placeholder="預設排序"  v-model="editItem.priority">
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateMission">儲存變更</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../../firebase/firebase.js';

export default {
    name:'MissionList',
    data(){
        return{
            missions:[],
            editId:0,
            editItem:{}
        }
    },
    methods:{
        showEditModel(item){
            console.log(item)
            this.editItem = item;
            $('#editMinnion').modal('show');
        },
        updateMission(){
            // 取得文件id並且編輯
            let vm = this;
            let docRef = db.collection("missions");

            docRef.doc( vm.editItem.docId).update(vm.editItem).then(function() {
                $('#editMinnion').modal('hide');
                vm.getCollection();
                console.log("更新成功");
            });
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
        this.getCollection()
    }
}
</script>