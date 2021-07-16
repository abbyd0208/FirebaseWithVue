<template>
    <div>
        <Header></Header>
        <div class="wrapper">
            <div class="subject_title">
                <img src="../assets/images/subject_title_img.png" alt="">
                <h2>任務旋轉門</h2>
                <p>發掘解決方案和潛在夥伴</p>
            </div>
            
            <div class="container"  v-if="page" >
                <div  class="subject_content mission" 
                :class="{'recommend':page.recommend == 1, 'expired':  date > new Date(page.publish_end_date)}"
                v-if="page">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadcrumb"><a href="missions.htm">任務列表</a><span>{{page.subject}}</span></div>
                        </div>
                        <div class="col-12 col-md-4 mr-lg-5">
                            <div class="cover">
                                <!-- <img :src="imgSrc" alt=""> -->
                            </div>
                        </div>
                        <div class="col-12 col-md-7">
                            <h2 class="title">{{page.subject}}</h2>
                            <div class="mission_content">
                                <div class="item">
                                    <i class="fas fa-clock"></i>
                                    <span>{{page.subject_start_date}}~{{page.subject_end_date}}</span>
                                </div>
                                <div class="item bg">
                                    <i class="fas fa-comment-dots"></i>
                                    <p>{{page.subject_intro}}</p>
                                </div>
                                <div class="item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <div class="label" v-if="page.locations">
                                        <span  v-for="(item,index) in page.locations" :key="index">{{item}}</span>
                                    </div>
                                </div>
                                <div class="item">
                                    <i class="fas fa-cog"></i>
                                    <div class="label">
                                        <span>{{page.industryTag}}</span>
                                    </div>
                                </div>
                                <div class="item company">
                                    <i class="fas fa-briefcase"></i>
                                    <div>
                                        <h5 v-if="page.company_name">{{page.company_name}}</h5>
                                        <p>{{page.company_intro}}</p>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="operate">
                                <span>
                                    <small class="isCopied" v-if="copy == true">連結已複製!</small>
                                    <a href="#" class="btn_1" @click.prevent="copyLink">複製連結&分享</a>
                                </span>
                                <span>
                                    <small>刊登截止日 {{page.publish_end_date}}</small>
                                    <a href="https://forms.gle/CQGu1ahdt4jgZMDr5" target="_blank" class="btn_2">我有興趣</a>
                                </span>
                            </div>
        
                            <div class="expired_block">
                                <div class="content">
                                    <div>
                                        <img src="../assets/images/mission_close.png" alt="任務已關閉">
                                    </div>
                                    <div>
                                        <h2>此任務已結案！</h2>
                                        <p>是否前往查看其它任務？</p>
                                        <a href="missions.htm" class="btn_3">前往任務列表 <i class="fas fa-arrow-circle-right"></i></a>
                                    </div>
                                </div>
                                <div class="ad_block">
                                    <a href="https://forms.gle/vNLRHH1pHpdv9iS77" target="_blank"><img src="../assets/images/contact_banner.svg" alt=""></a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="btn_back_block">
                            <a class="btn_back" href="missions.htm"><i class="fas fa-arrow-alt-circle-left"></i>返回任務列表 </a>
                        </div>
                    </div>

                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
import {db} from '../firebase/firebase.js';
import Header from './Header.vue';

export default {
    name:'Mission',
    data(){
        return{
            page:{},
            date:new Date(),
            url:window.location.href,
            copy:false,
            userId:''
        }
    },
    components:{
        Header
    },
    computed:{
     
        imgSrc(){
            return require(`@/assets/images/cover/${this.page.cover}`)
        }
    },
    watch:{

    },
    methods:{
        copyLink(){
            let vm = this;
            var temp = $('<input>'); // 建立input物件
            $('body').append(temp); // 將input物件增加到body
            temp.val( vm.url).select(); // 將連結加到input物件value
            document.execCommand('copy'); // 複製
            vm.copy = true;
            temp.remove(); // 移除input物件
            setTimeout(()=>{
                vm.copy = false;
            },1000)
        },
        getCollction(){
            let docRef = db.collection('missions').doc(this.userId);
            docRef
            .get()
            .then((doc) => {
                console.log(doc.data())
               if (doc.exists) {
                    // 將集合的id與doc內的內容一起存進資料內
                    this.page = {docId:doc.id, ...doc.data()};
                } else {
                    console.log("No such document!");
                }
                // this.page = doc.data();
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    },
    created(){
        console.log(this.$route.params.missionId);
        this.userId = this.$route.params.missionId;
        this.getCollction();
    }
}
</script>