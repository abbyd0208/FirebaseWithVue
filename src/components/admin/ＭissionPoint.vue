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

    </div>
</template>

<script>
export default {
    name:'MissionPoint'
}
</script>