<template>
    <div>
        <h5>焦點管理</h5>
         <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" width="10%">排序</th>
                            <th scope="col" width="10%">任務id</th>
                            <th scope="col">任務標題</th>
                            <th scope="col" width="10%">類別</th>
                            <th scope="col">上/下架</th>
                        </tr>
                    </thead>
                    <tbody>
                         <tr>
                            <td>1</td>
                            <td>
                                <p>1</p>
                                <input type="text" value="" placeholder="請搜尋id">
                            </td>
                            <td>
                                <p>花東宏軒找合作廠商</p> 
                            </td>
                            <td>
                                <select name="mission_point" id="mission_point">
                                    <option value="即將結束">即將結束</option>
                                    <option value="最新上線">最新上線</option>
                                    <option value="重點任務">重點任務</option>
                                </select>
                            </td>
                            <td>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                                <label class="form-check-label" for="inlineRadio1">上架</label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                                <label class="form-check-label" for="inlineRadio2">下架</label>
                            </div>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>

                 <vue-good-table
                    :columns="columns"
                    :rows="missions"
                    max-height="600px"
                    :fixed-header="true"
                    theme="polar-bear"
                    :search-options="{
                        enabled: true,
                        trigger: 'enter',
                        placeholder: '搜尋表格',
                        
                    }">
                    <div slot="emptystate">
                        <p>資料載入中....</p>
                    </div>
                </vue-good-table>

    </div>
</template>

<script>
export default {
    name:'MissionPoint',
    data(){
        return{
            columns:[
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
                    label: '類別',
                    field: 'type',
                },
                {
                    label: '類別',
                    field: 'type',
                },
                {
                    label: '上/下架',
                    field: 'enable',
                    type: 'number',
                },
            ]
        }
    },
    methods:{
        getCollection(){
            let vm = this;
            let docRef = db.collection("missions").orderBy("priority","desc");
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
    created:{

    }
}
</script>