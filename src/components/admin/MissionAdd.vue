<template>
    <div>
        <h3>新增任務</h3>
        <div class="container">
            <form class="form" @submit.prevent="validateBeforeSubmit">
                <div class="form-group row">
                    <label for="priority" class="col-sm-4 col-form-label">排序</label>
                    <div class="col-sm-8">
                        <input type="number" name="priority" class="form-control" id="priority" placeholder="請輸入排序" 
                        :class="{'is-invalid': errors.has('priority') }"
                        v-model.number="mission.priority"
                        v-validate="'required'">
                         <span v-show="errors.has('priority')" class="help invalid-feedback">{{ errors.first('priority') }}</span>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-4 col-form-label">任務標題</label>
                    <div class="col-sm-8">
                        <input type="text" name="subject" class="form-control" id="subject" placeholder="請輸入任務標題"
                        :class="{'is-invalid': errors.has('subject') }"
                        v-model.trim="mission.subject"
                        v-validate="'required'">
                         <span v-show="errors.has('subject')" class="help invalid-feedback">{{ errors.first('subject') }}</span>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-4 col-form-label">主圖檔名</label>
                    <div class="col-sm-8">
                    <input type="text" name="cover" class="form-control" id="cover" placeholder="主圖檔名 ex:example.jpg"
                    :class="{'is-invalid': errors.has('cover') }" 
                    v-model.trim="mission.cover"
                    v-validate="'required'">
                     <span v-show="errors.has('cover')" class="help invalid-feedback">{{ errors.first('cover') }}</span>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-4 col-form-label">推薦星星</label>
                    <div class="col-sm-8">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="recommend" id="recommend1" value="1"
                            v-model="mission.recommend">
                            <label class="form-check-label" for="recommend1">開啟</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="recommend" id="recommend2" value="0"
                             v-model="mission.recommend">
                            <label class="form-check-label" for="recommend2">關閉</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="subject_start_date" class="col-sm-4 col-form-label">需求開始日期</label>
                    <div class="col-sm-8">
                        <input type="date" name="subject_start_date" class="form-control" id="subject_start_date"
                         :class="{'is-invalid': errors.has('subject_start_date')}"
                         v-model="mission.subject_start_date"
                         v-validate="'required'">
                         <span v-show="errors.has('subject_start_date')" class="help invalid-feedback">{{ errors.first('subject_start_date') }}</span>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="subject_start_end" class="col-sm-4 col-form-label">需求結束日期</label>
                    <div class="col-sm-8">
                        <input type="date" name="subject_start_end" class="form-control" id="subject_start_end"
                        :class="{'is-invalid': errors.has('subject_start_end')}"
                        v-model="mission.subject_end_date"
                        v-validate="'required'">
                         <span v-show="errors.has('subject_start_end')" class="help invalid-feedback">{{ errors.first('subject_start_end') }}</span>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="locations" class="col-sm-4 col-form-label">需求地區標籤 (最多3個)</label>
                    <div class="col-sm-8">
                        <select class="form-control" @change="addLocations($event)" >
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
                            <span class="label" v-for="(item,index) in mission.locations" :key="index">{{item}} <em @click="removeLocations(index)">X</em></span>
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
                        <input type="text" name="companyName" class="form-control" id="companyName" placeholder="輸入公司名稱"
                        :class="{'is-invalid': errors.has('companyName') }"
                        v-model="mission.company_name"
                        v-validate="'required'">
                         <span v-show="errors.has('companyName')" class="help invalid-feedback">{{ errors.first('companyName') }}</span>
                    </div>
                    <div class="col-sm-4">
                       <input type="checkbox" name="show_company_name" class="form-check-input" id="show_company_name" 
                        :class="{'is-invalid': errors.has('companyName') }"
                        v-model="mission.show_company_name"
                        v-validate="'required'">
                        <label class="form-check-label" for="exampleCheck1">顯示</label>
                        <span v-show="errors.has('show_company_name')" class="help invalid-feedback">{{ errors.first('show_company_name') }}</span>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="company_intro" class="col-sm-4 col-form-label">公司側寫</label>
                    <div class="col-sm-8">
                    <textarea  class="form-control" name="" id="company_intro" cols="30" rows="10" placeholder="請輸入公司側寫" v-model="mission.company_intro"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-4 col-form-label">刊登開始日期</label>
                    <div class="col-sm-8">
                        <input type="date" name="publish_start_date" class="form-control" id="publish_start_date"
                        :class="{'is-invalid': errors.has('publish_start_date') }"
                        v-model="mission.publish_start_date"
                        v-validate="'required'">
                        <span v-show="errors.has('publish_start_date')" class="help invalid-feedback">{{ errors.first('publish_start_date') }}</span>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-4 col-form-label">刊登結束日期</label>
                    <div class="col-sm-8">
                    <input type="date" name="publish_end_date" class="form-control" id="publish_end_date"
                    :class="{'is-invalid': errors.has('publish_end_date') }"
                    v-model="mission.publish_end_date"
                    v-validate="'required'">
                    <span v-show="errors.has('publish_end_date')" class="help invalid-feedback">{{ errors.first('publish_end_date') }}</span>
                    </div>
                </div>
                 <div class="form-group row">
                    <label class="col-sm-4 col-form-label">上/下架</label>
                    <div class="col-sm-8">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="enable" id="enable1" :value="1"
                            v-model="mission.enable">
                            <label class="form-check-label" for="enable1">上架</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="enable" id="enable2" :value="0"
                             v-model="mission.enable" >
                            <label class="form-check-label" for="enable2">下架</label>
                        </div>
                    </div>
                </div>
                 <div class="text-center">
                    <button type="submit" class="btn btn-primary">新增</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .form{
        width: 80%;
    }
    .form-group{ margin-bottom: 1rem;}
</style>

<script>
import db from '../../firebase/firebase.js';
export default {
    name:'MissionAdd',
    data(){
        return{
            mission:{
                locations:[],
                enable:0,
                recommend:0
            },
        }
    },
    methods:{
        addLocations(event){
            console.log('onChange')
            let vm = this;
            if(vm.mission.locations.length == 3){
                console.log('stop');
                alert('地區選項只能有3個');
                return;
            }else{
                console.log('contiune')
                vm.mission.locations.push(event.target.value);
            }
        },
        removeLocations(index){
            let vm = this;
            vm.locations.splice(index,1)
        },
        validateBeforeSubmit(){
            let vm = this;


            
            this.$validator.validateAll().then((result) => {
                if (result) {
                     db.collection("articles").add(vm.mission)
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                            console(docRef);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                }
                alert('請修正錯誤');
            });
        }
    },
    created(){
        let vm = this;
         // 取得集合
        let docRef = db.collection("missions");
      
        // 取得檔案
        docRef
        .get()
        .then((doc) => {
            doc.forEach(item =>{
                console.log(item)
                if (item.exists) {
                    vm.mission.priority = item.data().id +1;
                    vm.mission.id = item.data().id +1;
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