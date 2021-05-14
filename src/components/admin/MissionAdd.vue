<template>
    <div>
        <h3>新增任務</h3>
        <div class="container">
            <form class="form">
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
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="showcompanyname" id="showcompanyname1" value="option1">
                            <label class="form-check-label" for="showcompanyname1">開啟</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="showcompanyname" id="showcompanyname2" value="option2">
                            <label class="form-check-label" for="showcompanyname2">關閉</label>
                        </div>
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
            <div class="text-center">
                <button type="button" id="addMission" class="btn btn-primary">Primary</button>
            </div>
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
export default {
    name:'MissionAdd'
}
</script>