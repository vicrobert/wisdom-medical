/**
 * 舆情中心-疾病关联与画像数据综合处理
 */
function contrastDataController() {

    // AJAX 数据请求处理
    var ajaxHandler = ajaxDataController(),
        chartHandler = contrastChart(),

        // 疾病搜索引擎
        //GET_DISEASE_URL = '../../test/data/synthesizeanalyze/disease.json',
        //GET_DISEASE_URL = $.getWebRootPath('disease-web/analysis/allsickness').replace('medapp/',''),
        GET_DISEASE_URL = '../jsonp/disease.json',
        // 社区select数据
        //GET_COMMUNITYSELECT_URL = '../../test/data/synthesizeanalyze/communitydata.json',
        //GET_COMMUNITYSELECT_URL = $.getWebRootPath('disease-web/analysis/community').replace('medapp/',''),
        GET_COMMUNITYSELECT_URL = '../jsonp/communitydata.json',
        // 年
        //GET_YEAR_URL = '../../test/data/disease/forecast/yeardata.json';
        //GET_YEAR_URL = $.getWebRootPath('disease-web/analysis/yeardata').replace('medapp/','');
        GET_YEAR_URL = '../jsonp/yeardata.json';

    function getDisease(params, callback) {
        ajaxHandler.select(GET_DISEASE_URL, params, callback);
    }

    function getCommunitySelect() {
        ajaxHandler.select(GET_COMMUNITYSELECT_URL, null, function(data) {
            $("#community").empty();
            $("#community").append("<option value='0'>全部</option>");
            $.each(data, function(key,val){
                $("#community").append("<option value='"+val.id+"'>"+val.name+"</option>");
            });
            getYearSelect();
        });
    }

    function getYearSelect() {
        ajaxHandler.select(GET_YEAR_URL, null, function(data) {
            $("#year").empty();
            $.each(data, function(key,val){
                $("#year").append("<option value='"+val.id+"'>"+val.name+"</option>");
            });
            chartHandler.showChart();
        });
    }

    return {

        //获取疾病搜索引擎数据
        "getDisease": function(params, callback){
            getDisease(params, callback);
        },

        //社区select
        "getCommunitySelect": function(){
            getCommunitySelect();
        }
    }

}