<template>
    <div>
        <h5>焦點管理</h5>
        <table class="table table-hover table-bordered text-center table-sm ">
            <thead>
                <tr>
                    <th scope="col" width="10%">版位</th>
                    <th scope="col" width="10%">任務id</th>
                    <th scope="col">任務標題</th>
                    <th scope="col" width="10%">類別</th>
                    <th scope="col">上/下架</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in points" :key="item.docId">
                    <td>{{index+1}}</td>
                    <td>{{item.id}}</td>
                    <td>
                        {{item.mission_subject}}
                    </td>
                    <td v-if="item.type === 0">{{'即將結束'}}</td>
                    <td v-else-if="item.type === 1">{{'最新上線'}}</td>
                    <td v-else-if="item.type === 2">{{'重點任務'}}</td>
                    <td v-else></td>
                    <td>
                        {{item.enable === 1 ? '上架':'下架'}}
                    </td>
                    <td>
                        <button class="btn btn-primary" @click="openModal(item)">編輯</button>
                        <button class="btn btn-secondary" @click="clear(item.docId)">清除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" tabindex="-1" role="dialog" id="missionPoint">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row">
                            <label for="subject" class="col-sm-4 col-form-label">選擇任務</label>
                            <div class="col-sm-8"> 
                                <select class="form-control form-control-sm" name="subject" id="subject" 
                                    v-model="editItem.mission_id"
                                    @change="findSubject(editItem.mission_id)"
                                    >
                                    <option value="">請選擇任務</option>
                                    <!-- 這邊跑的是任務的陣列 -->
                                    <option 
                                    v-for="item in missions" 
                                    :value="item.docId"
                                    :key="item.docId">
                                    {{item.subject }}
                                    </option>
                                </select>
                            </div>
                        </div>
                       <div class="form-group row"> 
                           <label for="subject" class="col-sm-4 col-form-label">選擇狀態</label>
                            <div class="col-sm-8">
                                <select class="form-control form-control-sm" name="mission_point" id="mission_point"
                                 v-model.number="editItem.type">
                                    <option value="">請選擇狀態</option>
                                    <option :value="0">即將結束</option>
                                    <option :value="1">最新上線</option>
                                    <option :value="2">重點任務</option>
                                </select> 
                            </div>
                       </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="recommend1" id="recommend1" :value="1"
                            v-model.number="editItem.enable" :checked="editItem.enable == 1">
                            <label class="form-check-label" for="recommend1">上架</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="recommend2" id="recommend2" :value="0"
                             v-model.number="editItem.enable" :checked="editItem.enable == 0">
                            <label class="form-check-label" for="recommend2">下架</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"  data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="saveChange">儲存變更</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {db} from '../../firebase/firebase.js';
export default {
    name:'MissionPoint',
    data(){
        return{
            points:[],
            missions:[],
            editItem:{
                enable:0
            }
        }
    },
    metaInfo: {
        // title will be injected into parent titleTemplate
        title: '焦點管理',
    },
    filters: {
        filterSubject: function(value,id) {
            if (!value) return '';
            console.log(id)
            console.log(value)
            return value;
        }
    },
    methods:{
        findSubject(missionId){
            console.log(missionId)
            // 從任務列表裡面找出相符合的id
            let findSubject = this.missions.filter(mission =>{
                return mission.docId == missionId
            })

            this.editItem.mission_subject = findSubject[0].subject;
            this.editItem.id = findSubject[0].id;
        },
        getCollection(collection = 'missionPoint'){
            let vm = this;
            let docRef = db.collection(collection);
            let payload=[];
            docRef
            .get()
            .then((doc) => {
                doc.forEach(item =>{
                    if (item.exists) {
                        // 將集合的id與doc內的內容一起存進資料內
                      
                        payload.push({docId:item.id, ...item.data()}) 
                        if(collection == 'missionPoint'){
                            vm.points = payload;
                            // console.log(payload)
                        }else{
                            vm.missions = payload;
                        }
                    } else {
                        console.log("No such document!");
                    }
                })
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        },
        openModal(item){
            console.log(item)
            this.editItem = Object.assign({},item);
            $('#missionPoint').modal('show');
        },
        saveChange(){
            let vm = this;
            db.collection("missionPoint")
            .doc(vm.editItem.docId)
            .update(vm.editItem)
            .then((docRef) => {
                vm.getCollection();
                $('#missionPoint').modal('hide');
               
                vm.$bus.$emit('message:push','新增成功','success');
            })
            .catch((error) => {
                console.log(error);
            });
        },
        clear(item){
            let vm = this;

            // 送一個空的物件給要更新的doc
            let emptyObj={
                enable:"",
                id:"",
                mission_id:"",
                mission_subject:"",
                type:""
            }

            db.collection("missionPoint")
            .doc(item)
            .update(emptyObj)
            .then(() => {
                vm.$bus.$emit('message:push','清除成功','success');
                this.getCollection();
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
        
    },
    created(){
        this.getCollection();
        this.getCollection('missions');
    }
}
</script>