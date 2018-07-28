// 图表控制
function forecastChart() {

    var echartshandler = echartsInterface(),

        //疾病就诊量
        //GET_NUM_CHART_URL = "../../test/data/disease/forecast/getnumcharturl.json",
        //GET_NUM_CHART_URL = $.getWebRootPath('disease-web/analysis/search').replace('medapp/',''),
        //GET_NUM_CHART_URL = "../jsonp/getnumcharturl.json",
        GET_NUM_CHART_URL = "../../medical/DiseaseTendency",
        //季节流行疾病预测
        // GET_SEASON_CHART_URL = "../../test/data/disease/forecast/getseasoncharturl.json",
        //GET_SEASON_CHART_URL = "../jsonp/getseasoncharturl.json",
        GET_SEASON_CHART_URL = "../../medical/DiseaseSeasonDistribute",
        //区域疾病排行
        //GET_AREA_CHART_URL = "../../test/data/disease/forecast/getareacharturl.json",
        //GET_AREA_CHART_URL = $.getWebRootPath('disease-web/analysis/area').replace('medapp/',''),
        //GET_AREA_CHART_URL = "../jsonp/getareacharturl.json",
        GET_AREA_CHART_URL = "../../medical/DiseaseAreaDistribute",
        //疾病分布年龄
        //GET_AGE_CHART_URL = "../../test/data/disease/forecast/getagecharturl.json",
        //GET_AGE_CHART_URL = $.getWebRootPath('disease-web/analysis/age').replace('medapp/',''),
        //GET_AGE_CHART_URL = "../jsonp/getagecharturl.json",
        GET_AGE_CHART_URL = "../../medical/DiseaseAgeDistribute",
        //性别占比
        //GET_SEXTRAIT_CHART_URL = "../../test/data/monitor/getsextraitcharturl.json",
        //GET_SEXTRAIT_CHART_URL = $.getWebRootPath('disease-web/analysis/sex').replace('medapp/',''),
        //GET_SEXTRAIT_CHART_URL = "../jsonp/getsextraitcharturl.json",
        GET_SEXTRAIT_CHART_URL = "../../medical/DiseaseSexDistribute",
        //职业占比
        //GET_PROFESSIONTRAIT_CHART_URL = "../jsonp/getprofessiontraitcharturl.json";
        GET_PROFESSIONTRAIT_CHART_URL = "../../medical/DiseaseOccupationAgeDistribute";

    function showChart() {

        // 组装表单数据
        var filterData = {
            selectType: [],
            community: [],
            year: [],
            month: [],
            disease: []
        }

        $('.medical-filter li').each(function(index, el) {

            var $this = $(this),
                itemID = $this.attr('id')

            $this.find('.label-danger').each(function(index, el) {

                filterData[itemID].push($(el).attr('data-id'))
            })
        })

        var params = {
            'community': filterData.community.join(',') || 0,
            'year': filterData.year.join(',') || 0,
            'month': filterData.month.join(',') || 0,
            'disease': filterData.disease.join(',') || 0,
            'selectType': filterData.selectType.join(',') || 0
        }

        echartshandler.basicAreaLine(GET_NUM_CHART_URL, params, "echartbynum", "custom", "", false);
        echartshandler.stackBar(GET_SEASON_CHART_URL, params, "echartbyseason", "custom", "", false);
        echartshandler.multipleSreiesRainbowBar(GET_AREA_CHART_URL, params, "echartbyarea", "custom", "", false);
        echartshandler.coloursStackBar(GET_AGE_CHART_URL, params, "echartbyage", "custom", "", false);

        echartshandler.nightingale_simple(GET_SEXTRAIT_CHART_URL, params, "sextrait", "custom", "性别", false);
        echartshandler.pie_doughnut(GET_PROFESSIONTRAIT_CHART_URL, params, "professiontrait", "custom", "职业", false);
    }

    return {
        'showChart': function(callback) {
            showChart()
        }
    }
}