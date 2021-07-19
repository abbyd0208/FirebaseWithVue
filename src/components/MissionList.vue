<template>
    <div>
       <div class="wrapper">
        <Header></Header>
        <div class="subject_title">
            <img src="../assets/images/subject_title_img.png" alt="">
            <h2>任務旋轉門</h2>
            <p>發掘解決方案和潛在夥伴</p>
        </div>
        <section class="_full">
            <h4 class="unit_title">焦點</h4>
            <!-- new最新上線 point重點任務 soon即將結束-->
            <ul class="card_list_1">
                <li class="card " 
                :class="{'new':item.type == 1, 'point': item.type == 2, 'soon':item.type == 3}"
                v-for="item in filterPointEnable" :key="item.id">
                    <h5 v-if="item.type == 1">最新上線</h5>
                    <h5 v-else-if="item.type = 2">重點任務</h5>
                    <h5 v-else>即將結束</h5>
                    <p class="date">{{item.date}}</p>
                    <p class="content">{{item.mission_subject}}</p>
                    <router-link :to="`/mission/${item.mission_id}`" >看更多</router-link>
                </li>
            </ul>
        </section>

        <div class="container">
   
            <div class="subject_content missions" v-if="list">
                <h4 class="unit_title">任務</h4>
                <p class="note">此標記為CiRCLELiNKS會員所發布的任務。歡迎踴躍回應！</p>

                <div class="filter_box">
                    <div class="item">
                        <h6>產業標籤</h6>
                        <ul>
                            <li>
                                <a href="#" class="active" @click.prevent=" currentTag = true">全部</a>
                            </li>
                            <li v-for="item in industryTag" :key="item.docId">
                                <a href="#" @click.prevent="filterMission(item)">{{item.zh_tw}}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <ul class="card_list_2">
                    <li class="card mission" v-for="item in filterMissionEnable" 
                        v-show="currentTag == true ?  true : currentTag == item.industryTag"
                        :key="item.id"  
                        :data-id="item.id" 
                        :class="{'recommend':item.recommend == 1,'expired': date > new Date(item.publish_end_date) }" 
                        >
                        <div>
                            <div class="cover">
                                <!-- <img :src=" require(`@/assets/images/cover/${item.cover}`)" alt=""> -->
                            </div>
                            <div class="item">
                                <i class="fas fa-clock"></i>
                                <span>{{item.subject_start_date}}~{{item.subject_end_date}}</span>
                            </div>
                            <h5 class="subject">{{item.subject}}</h5>
                            <div class="item bg">
                                <i class="fas fa-comment-dots"></i>
                                <p>{{item.subject_intro}}</p>
                            </div>
                            <div class="item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div class="label">
                                    <span v-for="(item, index) in item.locations" :key="index">{{item}}</span>
                                </div>
                            </div>
                            <div class="item">
                                <i class="fas fa-cog"></i>
                                <div class="label">
                                    <span>{{item.industryTag}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="operate">
                            <span>
                                <router-link :to="`/mission/${item.docId}`" class="btn_1">看更多</router-link>
                            </span>
                            <span>
                                <small>刊登截止日<br> {{item.publish_end_date}}</small>
                                <a class="btn_2" href="https://forms.gle/CQGu1ahdt4jgZMDr5" target="_blank">我有興趣</a>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <p>© 2021 CiRCLELiNKS 智合圈</p>
        </div>
    </div>

    </div>
</template>

<script>

import {db} from '../firebase/firebase.js';
import Header from './Header.vue';
export default {
    name:'ProductList',
    data () {
        return {
            list:[],
            date:new Date(),
            missionPoint:[],
            industryTag:[],
            currentTag:true
        }
    },
    components:{
        Header
    },
    metaInfo: {
        // title will be injected into parent titleTemplate
        title: 'CiRCLELiNKS 任務旋轉門-任務列表',
    },
    computed:{
       filterMissionEnable(){
           return this.list && this.list.filter((item)=>{
               return item.enable == 1;
           });
       },
       filterPointEnable(){
           return this.missionPoint && this.missionPoint.filter((item)=>{
               return item.enable == 1;
           })
       },
       filterDate(){
            // 透過filterPointEnable上面的missinId，比對 MissionList找到符合的項目
           for(let i=0; i<this.filterPointEnable.length; i++){
               let id = this.filterPointEnable[i].mission_id;
               let missionDate = [...this.list.filter(function(item){
                    return item.docId==id && item.enable == 1;
                    })]

                this.filterPointEnable[i].date = `${missionDate[0].publish_start_date } ~ ${missionDate[0].publish_end_date }`
            }

           return this.filterPointEnable;
       }
    },
    methods:{
        getCollection(collection = 'missions'){
            let vm = this;
            let docRef = db.collection(collection).orderBy("priority","desc");
            let payload=[];

            docRef
            .get()
            .then((doc) => {
                doc.forEach(item =>{
                    if (item.exists) {
                        // 將集合的id與doc內的內容一起存進資料內
                        payload.push({docId:item.id, ...item.data()}) 
                        vm.list = payload;
                        // console.log(payload)
                    } else {
                        console.log("No such document!");
                    }
                })
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        },
        getCollectionPoint(collection ='missionPoint'){
            let vm = this;
            let docRef = db.collection(collection);
            let payload=[];

            docRef
            .get()
            .then((doc)=>{
                doc.forEach(item =>{
                    payload.push({docId:item.id, ...item.data()});
                    vm.missionPoint = payload
                })
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

        },
        getCollectionIndusty(){
            let vm = this;
            let docRef = db.collection('industryTag');
            let payload=[];

            docRef
            .get()
            .then((doc)=>{
                doc.forEach(item =>{
                    payload.push({docId:item.id, ...item.data()});
                    vm.industryTag = payload
                })
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        },
        filterMission(item){
        //  this.list.filter()
        // todo 把對應到的資料寫回 this.list內   
        //  console.log(item)
        //  this.filterMissionEnable.filter(data => { item.zh_tw == data.industryTag});
            let vm = this;
            vm.currentTag = item.docId
        }
    },
    created(){
        this.getCollection();
        this.getCollectionPoint();
        this.getCollectionIndusty();
    }
}
</script>
