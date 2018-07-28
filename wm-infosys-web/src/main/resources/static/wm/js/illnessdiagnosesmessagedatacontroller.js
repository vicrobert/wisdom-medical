/**

 * 舆情中心-疾病分析与预测数据综合处理

 */

function illnessdiagnosesmessageDataController() {



    // AJAX 数据请求处理

    var ajaxHandler = ajaxDataController(),

        chartHandler = illnessdiagnosesmessageChart(),



        // 年select数据

        //GET_YEARSELECT_URL = '../../test/data/disease/forecast/yeardata.json',

       // GET_YEARSELECT_URL = $.getWebRootPath('disease-web/analysis/yeardata').replace('medapp/',''),
        GET_YEARSELECT_URL = '../jsonp/yeardata.json',

        // 疾病select数据

        //GET_DISEASESELECT_URL = '../../test/data/disease/forecast/diseasedata.json',

       // GET_DISEASESELECT_URL = $.getWebRootPath('disease-web/efficacy/sicknessByDate').replace('medapp/',''),
        GET_DISEASESELECT_URL = '../jsonp/diseasedata.json',

        // 社区select数据 *********************废弃 保留备份

        //GET_COMMUNITYSELECT_URL = '../../test/data/disease/forecast/communitydata.json',

        //GET_COMMUNITYSELECT_URL = $.getWebRootPath('disease-web/analysis/community').replace('medapp/',''),
        GET_COMMUNITYSELECT_URL = '../jsonp/communitydata.json',

        // 病人姓名搜索引擎 *********************废弃 保留备份

       // GET_PATIENTNAME_URL = '../../test/data/illnessdiagnosesmessage/patientname.json';

        //这个保留没用
        GET_PATIENTNAME_URL = '../jsonp/patientname.json';

    // GET_PATIENTNAME_URL = $.getWebRootPath('efficacy/patientList');



    function getYearSelect() {

        ajaxHandler.select(GET_YEARSELECT_URL, null, function(data) {

            $("#year").empty();

            $.each(data, function(key,val){

                $("#year").append("<option value='"+val.id+"'>"+val.name+"</option>");

                if(key===0){

                    getMonthSelect(val.id);

                }

            });

        });

    }



    function getMonthSelect(year, type) {

        var datetime = new Date();

        $("#month").empty();

        if(datetime.getFullYear() == year){

            var options,i;

            options += "<option value='0'>全部月</option>";

            for (i = 1; i < datetime.getMonth()+2; i++) {

                options += "<option value='"+i+"'>"+i+"月</option>";

            };

            $("#month").append(options);

        }else{

            $("#month").append(

                "<option value='0'>全部月</option>"+

                "<option value='1'>1月</option>"+

                "<option value='2'>2月</option>"+

                "<option value='3'>3月</option>"+

                "<option value='4'>4月</option>"+

                "<option value='5'>5月</option>"+

                "<option value='6'>6月</option>"+

                "<option value='7'>7月</option>"+

                "<option value='8'>8月</option>"+

                "<option value='9'>9月</option>"+

                "<option value='10'>10月</option>"+

                "<option value='11'>11月</option>"+

                "<option value='12'>12月</option>"

            );

        }

        if(type != 0){

            getCommunitySelect();

        }else{

            chartHandler.showChart();

        }

    }



//    function getDiseaseSelect() {

//

//        var params = {

//            'year': $("#year").val(),

//            'month': $("#month").val()

//        }

//        ajaxHandler.select(GET_DISEASESELECT_URL, params, function(data) {

//            $("#disease").empty();

//            $.each(data, function(key,val){

//                $("#disease").append("<option value='"+val.id+"'>"+val.name+"</option>");

//            });

//            chartHandler.showChart();

//        });

//    }



    function getCommunitySelect() {

        ajaxHandler.select(GET_COMMUNITYSELECT_URL, null, function(data) {

            $("#community").empty();

            $("#community").append("<option value='0'>全部社区</option>");

            $.each(data, function(key,val){

                $("#community").append("<option value='"+val.id+"'>"+val.name+"</option>");

            });

            chartHandler.showChart();

        });

    }



    function getPatientName(params, callback) {

        ajaxHandler.select(GET_PATIENTNAME_URL, params, callback);

    }



    return {

        'getYearSelect': function() {

            getYearSelect()

        },

        'getMonthSelect': function(year, type) {

            getMonthSelect(year, type)

        },

//        'getDiseaseSelect': function() {

//            getDiseaseSelect()

//        },

        'getCommunitySelect': function() {

            getCommunitySelect()

        }

//        ,

//        'getPatientName': function(params, callback) {

//            getPatientName(params, callback)

//        }

    }

}