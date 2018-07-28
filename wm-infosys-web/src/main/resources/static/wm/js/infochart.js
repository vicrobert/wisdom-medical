// 图表控制
function infoChart() {

    var echartshandler = echartsInterface(),

        //采集实时统计(每分钟刷新)

        //GET_TIME_CHART_URL = "../jsonp/gettimecharturl.json",
    GET_TIME_CHART_URL = "../../WebSpider/GetSampleTendencyGroupByMin",

        //采集数据统计(每天刷新)

        //GET_DATA_CHART_URL = "../jsonp/getdatacharturl.json",
    GET_DATA_CHART_URL = "../../WebSpider/GetSampleTendencyGroupByDay",

        //采集

        //GET_COLLECT_CHART_URL = "../jsonp/getcollectcharturl.json";
    GET_COLLECT_CHART_URL = "../../WebSpider/GetSampleStrength";
    
        function showChart() {

            // 组装表单数据
            var filterData = {
                selectType: [],
                community: [],
                year: [],
                month: [],
                disease: []
            }

            $('.medical-filter li').each(function (index, el) {

                var $this = $(this),
                    itemID = $this.attr('id')

                $this.find('.label-danger').each(function (index, el) {

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

            echartshandler.timeLine(GET_TIME_CHART_URL, params, "realtimestatistics", "custom", "", false);
            echartshandler.dataAreaLine(GET_DATA_CHART_URL, params, "datastatistics", "custom", "", false);
            echartshandler.collectGuage(GET_COLLECT_CHART_URL, params, "serverstate", "custom", "", false);

        }

    return {
        'showChart': function (callback) {
            showChart()
        }
    }
}