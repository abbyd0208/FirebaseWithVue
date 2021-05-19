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
                    <td>{{item.order}}</td>
                    <td>{{item.subject}}</td>
                    <td>{{item.company_name}}</td>
                    <td>{{item.recommend? "推薦":""}}</td>
                    <td>{{item.subject_start_date}}</td>
                    <td>{{item.subject_end_date}}</td>
                    <td>{{item.status == 1 ? "上架":"下架"}}</td>
                    <td> <button type="button" class="btn btn-primary btn-sm" @click="showEditModel">編輯</button>
                        <button type="button" class="btn btn-danger btn-sm">刪除</button>
                    </td>
                </tr>
                
            </tbody>
        </table>
         <!-- Modal -->
        <div class="modal fade" id="editMinnion" tabindex="-1" role="dialog" aria-labelledby="editMinnionTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editMinnionTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="form">
                        <div class="form-group row">
                            <label for="mission_id" class="col-sm-4 col-form-label">id</label>
                            <div class="col-sm-8">
                                <p>1(不可更改)</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="order" class="col-sm-4 col-form-label">排序</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="order" placeholder="預設排序">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">任務標題</label>
                            <div class="col-sm-8">
                            <input type="text" class="form-control" id="subject" placeholder="請輸入任務標題">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">主圖檔名</label>
                            <div class="col-sm-8">
                            <input type="text" class="form-control" id="imgfilename" placeholder="主圖檔名 ex:example.jpg">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">推薦星星</label>
                            <div class="col-sm-8">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="recommend" id="recommend1" value="option1">
                                    <label class="form-check-label" for="recommend1">開啟</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="recommend" id="recommend2" value="option2">
                                    <label class="form-check-label" for="recommend2">關閉</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="subject_start_date" class="col-sm-4 col-form-label">需求開始日期</label>
                            <div class="col-sm-8">
                                <input type="date" class="form-control" id="subject_start_date">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="subject_start_end" class="col-sm-4 col-form-label">需求結束日期</label>
                            <div class="col-sm-8">
                                <input type="date" class="form-control" id="subject_start_end">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="locations" class="col-sm-4 col-form-label">需求地區標籤 (最多3個)</label>
                            <div class="col-sm-8">
                                <select class="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                <label for="locations" class="col-sm-4 col-form-label">所選擇的標籤：</label>
                            <div  class="col-sm-8">
                                <span class="label ">台灣</span>
                                <span class="label ">馬來西亞</span>
                                <span class="label ">印度</span>
                            </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label">需求產業標籤 (僅限1個)</label>
                            <div class="col-sm-8">
                                <select class="form-control">
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
                                <input type="text" class="form-control" id="companyName" placeholder="輸入公司名稱">
                            </div>
                            <div class="col-sm-4">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
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
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary">儲存變更</button>
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
            missions:[]
        }
    },
    methods:{
        showEditModel(){
            $('#editMinnion').modal('show')
        }
    },
    created(){
        let vm = this;
         // 取得集合
        let docRef = db.collection("missions");
        // console.log(docRef)
        // 取得檔案
        docRef
        .get()
        .then((doc) => {
            console.log(doc)

            doc.forEach(item =>{
                console.log(item)
                if (item.exists) {
                    console.log(item.data())
                    vm.missions .push(item.data()) 
                } else {
                    console.log("No such document!");
                }
            })
            
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}
</script>