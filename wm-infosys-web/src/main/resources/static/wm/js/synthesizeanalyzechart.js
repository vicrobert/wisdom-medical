 // 图表控制
function synthesizeanalyzeChart() {
    var d3Handler = d3Interface(),
        ajaxHandler = ajaxDataController(),

        //疾病关联分析
        //GET_RELEVANCE_CHART_URL = "../../test/data/synthesizeanalyze/getrelevancecharturl.json",
       // GET_RELEVANCE_CHART_URL = $.getWebRootPath('disease-web/analysis/relation').replace('medapp/',''),
        //GET_RELEVANCE_CHART_URL = "../jsonp/getrelevancecharturl.json",
        GET_RELEVANCE_CHART_URL = "../../medical/DiseaseRelevanceAnalysis",
        //疾病画像
        //GET_PORTRAYAL_CHART_URL = "../../test/data/synthesizeanalyze/getportrayalcharturl.json";
        //GET_PORTRAYAL_CHART_URL = $.getWebRootPath('disease-web/analysis/portrait').replace('medapp/','');
        //GET_PORTRAYAL_CHART_URL = "../jsonp/getportrayalcharturl.json";
        GET_PORTRAYAL_CHART_URL = "../../medical/DiseasePortrait";
    function showChart() {

        stackBar(GET_RELEVANCE_CHART_URL, getParams(), "relevance", "custom", "", false);
    }

    function stackBar(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {

            d3label(data.type[data.type.length - 1]);
            require.config({
               /* paths: {
                    echarts: '../../scripts/lib/echarts-2.2.2'
                }*/
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/bar'
                ],
                function(ec, theme) {
                    var option = {
                        title: {
                            text: title
                        },
                        grid: {
                            x: 70,
                            y: 10,
                            x2: 30,
                            y2: 30,
                            borderWidth: 1,
                            borderColor:'#0a224a'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params) {
                                return params[1] + "</br>" + params[5];
                            }
                        },
                        toolbox: {
                            show: toolbox,
                            feature: {
                                mark: {
                                    show: true
                                },
                                dataView: {
                                    show: true,
                                    readOnly: false
                                },
                                magicType: {
                                    show: true,
                                    type: ['line', 'bar']
                                },
                                restore: {
                                    show: true
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        calculable: true,
                        xAxis: [{
                            type: 'value',
                            boundaryGap: [0, 0.01],
                            axisLabel:{
                                margin:1,
                                textStyle:{
                                    color:"#165fa9",
                                    fontSize:15
                                }
                            },
                            splitLine:{
                                lineStyle:{
                                    color:'#0a224a'
                                }
                            },
                            splitArea:{
                                show:false
                            },
                            axisLine:{
                                lineStyle:{
                                    width:1
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'category',
                            data: data.type,
                            axisLabel:{
                                margin:8,
                                textStyle:{
                                    color:"#165fa9",
                                    fontSize:15
                                }
                            },
                            splitLine:{
                                lineStyle:{
                                    color:'#0a224a'
                                }
                            },
                            axisLine:{
                                lineStyle:{
                                    width:1
                                }
                            }
                        }],
                        series: [{
                            name: '',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: '#0481b2',
                                    label: {
                                        show: true,
                                        position: 'right',
                                        formatter: '{c}'
                                    }
                                }
                            },
                            data: data.date,
                            barWidth:30
                        }]
                    };
                    ec.init(document.getElementById(domID), theme)
                        .setOption(option)
                        .on(require('echarts/config').EVENT.CLICK, relevanceClick);
                }
            );
        });
    }

    function relevanceClick(param) {

        d3label(param.name);
    }

    function d3label(spanshow) {

        $("#spanshow").empty();
        $("#spanshow").append(spanshow);

        $("#portrayal").empty();
        var params = getParams();
        params.diseasechild = spanshow;
        ajaxHandler.select(GET_PORTRAYAL_CHART_URL, params, function(data) {
            d3Handler.label("#portrayal", data.date);
        });
    }

    function getParams() {

        var params = {
            'disease': $("#disease").val(),
            'season': $("#season").val(),
            'community': $("#community").val(),
            'selectType': $("#selectType").val(),
            'time': $("#time").val(),
            'sex': $("#sex").val(),
            'age': $("#age").val(),
            'job': $("#job").val()
        }
        return params;
    }

    return {
        'showChart': function(callback) {
            showChart()
        }
    }
}