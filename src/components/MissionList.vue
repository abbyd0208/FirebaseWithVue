<template>
    <div>
       <div class="wrapper">
        <Header></Header>
        <div class="container">
            <div class="subject_title">
                <img src="../assets/images/subject_title_img.png" alt="">
                <h2>任務旋轉門</h2>
                <p>發掘解決方案和潛在夥伴</p>
            </div>
            
            <div class="subject_content missions" v-if="list">
                <h4 class="unit_title">任務</h4>
                <p class="note">此標記為CiRCLELiNKS會員所發布的任務。歡迎踴躍回應！</p>
                <div id="app">
                    <ul class="card_list_2">
                        <li class="card mission" v-for="(item,index) in list" 
                            :key="item.id"  
                            :data-id="item.id" 
                            :class="{'recommend':item.recommend == 1,'expired': date > new Date(item.publish_end_date) }" >
                            
                            <div>
                                <div class="cover">
                                    <img :src="'../assets/images/cover/'+item.cover" alt="">
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
                                    <!-- <a :href="'/mission.htm'+'#'+item.id" target="_blank" class="btn_1">看更多</a> -->
                                </span>
                                <span>
                                    <small>刊登截止日 {{item.publish_end_date}}</small>
                                    <a class="btn_2" href="https://forms.gle/CQGu1ahdt4jgZMDr5" target="_blank">我有興趣</a>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
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
            date:new Date()
        }
    },
    components:{
        Header
    },
   computed:{
       
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
                } else {
                    console.log("No such document!");
                }
            })
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },
    },
    created(){
        this.getCollection();
    }
}
</script>
