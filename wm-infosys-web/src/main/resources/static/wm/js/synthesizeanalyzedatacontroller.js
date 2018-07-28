/**
 * 舆情中心-疾病关联与画像数据综合处理
 */
function synthesizeanalyzeDataController() {

    // AJAX 数据请求处理
    var ajaxHandler = ajaxDataController(),
        chartHandler = synthesizeanalyzeChart(),

        // 疾病搜索引擎
        //GET_DISEASE_URL = '../../test/data/synthesizeanalyze/disease.json',
        //GET_DISEASE_URL = $.getWebRootPath('disease-web/analysis/allsickness').replace('medapp/',''),
        GET_DISEASE_URL = '../jsonp/disease.json',
        // 时间select数据
        //GET_TIME_URL = '../../test/data/synthesizeanalyze/timedata.json',
       // GET_TIME_URL = $.getWebRootPath('disease-web/analysis/yeardata').replace('medapp/',''),
        GET_TIME_URL = '../jsonp/timedata.json',
        // 社区select数据
        //GET_COMMUNITYSELECT_URL = '../../test/data/synthesizeanalyze/communitydata.json',
        //GET_COMMUNITYSELECT_URL = $.getWebRootPath('disease-web/analysis/community').replace('medapp/',''),
        GET_COMMUNITYSELECT_URL = '../jsonp/communitydata.json',
        // 职业select数据
        GET_JOB_URL = '../jsonp/jobdata.json';

    function getDisease(params, callback) {
        ajaxHandler.select(GET_DISEASE_URL, params, callback);
    }

    function getTimeSelect() {
        ajaxHandler.select(GET_TIME_URL, null, function(data) {
            $("#time").empty();
            $("#time").append("<option value='0'>全部</option>");
            $.each(data, function(key,val){
                $("#time").append("<option value='"+val.id+"'>"+val.name+"</option>");
            });
            getCommunitySelect();
        });
    }

    function getCommunitySelect() {
        ajaxHandler.select(GET_COMMUNITYSELECT_URL, null, function(data) {
            $("#community").empty();
            $("#community").append("<option value='0'>全部</option>");
            $.each(data, function(key,val){
                $("#community").append("<option value='"+val.id+"'>"+val.name+"</option>");
            });
            getJobSelect();
        });
    }

    function getJobSelect() {
        ajaxHandler.select(GET_JOB_URL, null, function(data) {
            $("#job").empty();
            $("#job").append("<option value='0'>全部</option>");
            $.each(data, function(key,val){
                $("#job").append("<option value='"+val.id+"'>"+val.name+"</option>");
            });
            chartHandler.showChart();
        });
    }

    return {

        //获取疾病搜索引擎数据
        "getDisease": function(params, callback){
            getDisease(params, callback);
        },

        //时间select
        "getTimeSelect": function(){
            getTimeSelect();
        },

        //社区select
        "getCommunitySelect": function(){
            getCommunitySelect();
        },

        //职业select
        "getJobSelect": function(){
            getJobSelect();
        }
    }

}