// 图表控制

function illnessdiagnosesmessageChart() {



    var echartshandler = echartsInterface(),

        ajaxHandler = ajaxDataController(),

        d3Handler = d3Interface(),



        //擅长诊疗疾病医生

        //GET_DOCTOR_CHART_URL = "../../test/data/illnessdiagnosesmessage/doctor.json",

       // GET_DOCTOR_CHART_URL = $.getWebRootPath('disease-web/efficacy/doctor').replace('medapp/',''),
        //GET_DOCTOR_CHART_URL = "../jsonp/doctor.json",
        GET_DOCTOR_CHART_URL = "../../medical/DoctorRecommend",

        //疾病用药率 最高TOP5 最低TOP5 *********************废弃 保留备份

        GET_FASHIONMEDICINE_CHART_URL = "../../test/data/illnessdiagnosesmessage/fashionmedicine.json",

        // GET_FASHIONMEDICINE_CHART_URL = $.getWebRootPath('efficacy/drug'),

        //病人就诊轨迹 *********************废弃 保留备份

        GET_PATIENTLOCUS_CHART_URL = "../../test/data/illnessdiagnosesmessage/patientlocus.json",

        // GET_PATIENTLOCUS_CHART_URL = $.getWebRootPath('efficacy/tracking'),

        // 使用强度

        //GET_USESTRENGTH_CHART_URL = "../../test/data/illnessdiagnosesmessage/useStrength.json",

        //GET_USESTRENGTH_CHART_URL = $.getWebRootPath('disease-web/efficacy/drugDDDInd').replace('medapp/',''),
        //GET_USESTRENGTH_CHART_URL = "../jsonp/useStrength.json",
        GET_USESTRENGTH_CHART_URL = "../../medical/DrugUseStrength",

        // 来源

        //GET_FROM_CHART_URL = "../../test/data/illnessdiagnosesmessage/from.json",

       // GET_FROM_CHART_URL = $.getWebRootPath('disease-web/efficacy/drugResource').replace('medapp/',''),
        //GET_FROM_CHART_URL = "../jsonp/from.json",
        GET_FROM_CHART_URL = "../../medical/DrugSourceDistribute",

        // 类别

        //GET_TYPE_CHART_URL = "../../test/data/illnessdiagnosesmessage/type.json",

       // GET_TYPE_CHART_URL = $.getWebRootPath('disease-web/efficacy/drugType').replace('medapp/',''),
        //GET_TYPE_CHART_URL = "../jsonp/type.json",
        GET_TYPE_CHART_URL = "../../medical/DrugTypeDistribute",
        // 使用比例

        //GET_USE_CHART_URL = "../../test/data/illnessdiagnosesmessage/use.json";

        //GET_USE_CHART_URL = $.getWebRootPath('disease-web/efficacy/drugAnalysis').replace('medapp/','');
        //GET_USE_CHART_URL = "../jsonp/use.json";
    	GET_USE_CHART_URL = "../../medical/DrugPercentDistribute"


    function showChart() {

        var params = {

            'year': $("#year").val(),

            'month': $("#month").val(),

            'community': $("#community").val()

        }

        echartshandler.doctorLine(GET_DOCTOR_CHART_URL, params, "doctor", "custom", "", false);

        // echartshandler.topdownBar(GET_FASHIONMEDICINE_CHART_URL, params, "fashionmedicine", "custom", "", false);



        echartshandler.basicAngularGauge(GET_USESTRENGTH_CHART_URL, params, "useStrength", "custom", "使用强度", false);



        echartshandler.pie_basic(GET_FROM_CHART_URL, params, "from", "custom", "来源", false);

        echartshandler.pie_pillType(GET_TYPE_CHART_URL, params, "type", "custom", "类别", false);

        echartshandler.nightingale_simple(GET_USE_CHART_URL, params, "use", "custom", "使用比例 ", false);

    }



    function d3locus(){

        var params = {

            'patientname': $("#patientname").val(),

            'community': $("#community").val()

        }

        ajaxHandler.select(GET_PATIENTLOCUS_CHART_URL, params, function(data) {

            $("#patientlocus").empty();

            var n = 0;

            for(var i in data){

                n++;

            }

            if(n !== 0){

                d3Handler.locus("#patientlocus", data);

            }



        });

    }



    return {

        'showChart': function() {

            showChart()

        },

        'd3locus': function() {

            d3locus()

        }

    }

}