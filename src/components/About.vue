<template>
    <div class="wrapper">
       <Header></Header>
        <div class="visual">
            <div class="doors">
                <div class="door1">
                    <div class="line"></div>
                </div>
                <div class="door2">
                    <div class="line"></div>
                </div>
            </div>
            <div class="decobox">
                <div class="title">
                    <h3>任務旋轉門</h3>
                    <p>發掘解決方案和潛在夥伴</p>
                </div>
               
                <div class="deco">
                    <div class="spark1"></div>
                    <div class="spark2"></div>
                    <p>O</p>
                    <p>P</p>
                    <p>P</p>
                    <p>O</p>
                    <p>R</p>
                    <p>T</p>
                    <p>U</p>
                    <p>N</p>
                    <p>I</p>
                    <p>T</p>
                    <p>I</p>
                    <p>E</p>
                    <p>S</p>
                </div>
            </div>
        </div>

        <!-- 旋轉門介紹 -->
        <div class="secction intro">
            <div class="door_shadow">
                <div class="shadow_1"></div>
                <div class="shadow_2"></div>
            </div>

            <div class="content">
                <p>在商場上，與優質合作夥伴以及高品質客戶連結，是企業成長和規模化的關鍵。<br>在CiRCLELiNKS尋找能和您一起前進的理想企業，並在平台的協助下，與他們連結！
                </p>
                <p>旋轉門初現於摩天大樓中，除了解決氣流的安全性問題和人流問題，<br class="d-md-none">也能提升企業形象。<br>在CiRCLELiNKS任務旋轉門，我們為您精選各產業需求，每扇門後面蘊藏著一個商業合作機會！</p>

                <p>CiRCLELiNKS任務旋轉門 提供企業或個人針對跨境或同一國家內各種任務的張貼，<br>例如尋找跨境加盟主、合作夥伴、通路商等，以及各種人事物的特定需求，<br class="d-md-none">徵求解決方案。</p>
                <div class="btn_center">
                    <a href="missions.htm" class="btn_3">前往任務列表<i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
        </div>

        <!-- 刊登步驟 -->
        <div class="secction step">
            <div class="inner">
                <div class="section_title white">
                    <h3>刊登步驟</h3>
                </div>
                <div class="card_list_3">
                    <div class="card">
                        <div class="title">01</div>
                        <div class="content">
                            <img src="../assets/images/step_1.svg" alt="">
                            <p>在下列的表單中詳細説明您的需求，並提供表單中所需的所有資訊。</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="title">02</div>
                        <div class="content">
                            <img src="../assets/images/step_2.svg" alt="">
                            <p>CiRCLELiNKS工作人員在收到您的需求資訊後，3個工作日內與您取得聯絡。</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="title">03</div>
                        <div class="content">
                            <img src="../assets/images/step_3.svg" alt="">
                            <p>確認資訊後，客戶將會收到一份正式的報價單，客戶則需以銀行轉帳或Payoneer進行付款。</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="title">04</div>
                        <div class="content">
                            <img src="../assets/images/step_4.svg" alt="">
                            <p>確認收到款項後， CiRCLELiNKS工作人員將會在24小時內開啓任務貼文。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 方案說明 -->
        <div class="secction plans">
            <div class="inner">
                <div class="section_title">
                    <h3>方案說明</h3>
                </div>
    
                <div class="content">
                    <div class="intro">
                        <p class="info">刊登您的需求，尋找潛在合作夥伴<br>專屬客服服務：任務得到回覆後，協助雙方取得聯繫</p>
                        <div class="price_block"> 
                            <span class="text">每則每月只要</span> 
                            <span class="currency">USD</span><span class="price">37</span><small>up</small></div>
                    </div>
    
                    <h3 class="title">單則任務/單一語系</h3>
                    <img class="price_info" src="../assets/images/price.svg" alt="">
                    <div class="btn_center">
                        <a href="https://forms.gle/vNLRHH1pHpdv9iS77" class="btn_3" target="_blank">馬上申請 <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 拓展方案 -->
        <div class="secction bluehalf explore">
            <div class="inner">
                <img src="../assets/images/contact.svg" alt="">
                <div>
                    <p>您想尋找其他拓展的方式嗎？<br>
                    您還有其他跨境任務需要委托處理嗎？</p>
    
                    <div class="btn_center">
                        <a href="https://www.circles.tw/feedback" target="_blabk" class="btn_4">與業務聯絡，詢問客制服務 <i class="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>© 2021 CiRCLELiNKS 智合圈</p>
        </div>

       
    </div>
</template>

<script>
import Header from './Header.vue';

export default {
    name:'Dashboard',
    data(){
        return{
            data:''
        }
    },
    components:{
        Header
    },
    metaInfo: {
        // title will be injected into parent titleTemplate
        title: '任務旋轉門-關於',
    },
}
</script>
