/**
 * 可视化控制-echarts接口
 */
function echartsInterface() {

    var dynamicLineArray = new Array([10]),
        ajaxHandler = ajaxDataController();


        function doctorLine(url, params, domID, style, title, toolbox) {
            ajaxHandler.select(url, params, function(data) {
                require.config({
                    paths: {
                        echarts: '../echarts-2.2.7/src'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/' + style,
                        'echarts/chart/line'
                    ],
                    function(ec, theme) {
                        var option = {
                            title : {
                                x: "center"
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter : function (params) {
                                    return params.name + "<br/>"+params.seriesName +"："
                                        + params.value;
                                }
                            },
                            /**toolbox: {
                                                show : true,
                                                feature : {
                                                    mark : {show: true},
                                                    dataView : {show: true, readOnly: false},
                                                    restore : {show: true},
                                                    saveAsImage : {show: true}
                                                }
                                            },**/
                            grid: {
                                x: 65,
                                y: 35,
                                x2: 20,
                                y2: 70,
                                borderWidth: 0
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    // splitNumber:10,
                                    boundaryGap : false,
                                    data : data.xaxis,
                                    axisLabel:{
                                        margin:8,
                                        textStyle:{
                                            color:"#165fa9",
                                            fontSize:16
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
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    axisLabel:{
                                        margin:8,
                                        textStyle:{
                                            baseline:'bottom',
                                            color:"#165fa9",
                                            fontSize:16
                                        }
                                    },
                                    splitLine:{
                                        lineStyle:{
                                            color:'#0a224a',
                                        }
                                    },
                                    splitArea:{show:true,
                                        areaStyle:{
                                            color:['rgba(0,0,0,0.15)','transparent']
                                        }
                                    },
                                }
                            ],
                            series : [
                                {
                                    name: '看病数',
                                    type: 'line',
                                    showAllSymbol: true,
                                    symbol:'circle',
                                    symbolSize:3,
                                    data: data.treatnum
                                },
                                {
                                    name: '评价数',
                                    type: 'line',
                                    showAllSymbol: true,
                                    symbol:'circle',
                                    symbolSize: 3,
                                    data: data.commentnum
                                }
                            ]
                        };
                        ec.init(document.getElementById(domID), theme).setOption(option);
                    }
                );
            });
        }    

        function timeLine(url, params, domID, style, title, toolbox) {
            ajaxHandler.select(url, params, function(data) {
                require.config({
                    paths: {
                        echarts: '../echarts-2.2.7/src'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/' + style,
                        'echarts/chart/line'
                    ],
                    function(ec, theme) {
                        var option = {
                            title : {
                                x: "center"
                            },
                            color:['#1fc141','#fc9e22','#26bdf9'],
                            tooltip : {
                                trigger: 'item',
                                formatter : function (params) {
                                    return params.name + "<br/>"+params.seriesName +"："
                                        + params.value;
                                }
                            },
                            legend:{
                                data:[
                                        {
                                            name:'医生采集数',
                                            textStyle:{
                                                color:'#1fc141'
                                            }
                                        },
                                        {
                                            name:'药品采集数',
                                            textStyle:{
                                                color:'#fc9e22'
                                            }
                                        },
                                        {
                                            name:'互动采集数',
                                            textStyle:{
                                                color:'#26bdf9'
                                            }
                                        },
                                    ]
                            },
                            /**toolbox: {
                                                show : true,
                                                feature : {
                                                    mark : {show: true},
                                                    dataView : {show: true, readOnly: false},
                                                    restore : {show: true},
                                                    saveAsImage : {show: true}
                                                }
                                            },**/
                            grid: {
                                x: 65,
                                y: 35,
                                x2: 20,
                                y2: 70,
                                borderWidth: 0
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    // splitNumber:10,
                                    boundaryGap : false,
                                    data : data.xaxis,
                                    axisLabel:{
                                        margin:8,
                                        textStyle:{
                                            color:"#165fa9",
                                            fontSize:16
                                        }
                                    },
                                    splitLine:{
                                        show: false
                                    },
                                    splitArea:{
                                        show:false
                                    },
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    axisLabel:{
                                        textStyle:{
                                            color:"#165fa9",
                                            fontSize:16
                                        }
                                    },
                                    splitLine:{
                                        lineStyle:{
                                            type: 'dashed',
                                            color:'#094583',
                                        }
                                    },
                                    splitArea:{
                                        show:false
                                    }
                                }
                            ],
                            series : [
                                {
                                    name: '医生采集数',
                                    type: 'line',
                                    showAllSymbol: true,
                                    symbolSize:3,
                                    symbol: 'circle',
                                    data: data.docnum
                                },
                                {
                                    name: '药品采集数',
                                    type: 'line',
                                    showAllSymbol: true,
                                    symbolSize: 3,
                                    symbol: 'circle',
                                    data: data.medicalnum
                                },
                                {
                                    name: '互动采集数',
                                    type: 'line',
                                    showAllSymbol: true,
                                    symbolSize: 3,
                                    symbol: 'circle',
                                    data: data.interactnum
                                }
                            ]
                        };
                        ec.init(document.getElementById(domID), theme).setOption(option);
                    }
                );
            });
        }    

        function dataAreaLine(url, params, domID, style, title, toolbox) {
            ajaxHandler.select(url, params, function(data) {
                require.config({
                    paths: {
                        echarts: '../echarts-2.2.7/src'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/' + style,
                        'echarts/chart/line'
                    ],
                    function(ec, theme) {
                        var option = {
                            title : {
                                x: "center"
                            },
                            color:['#1fc141','#fc9e22','#26bdf9'],
                            tooltip : {
                                trigger: 'item',
                                formatter : function (params) {
                                    return params.name + "<br/>"+params.seriesName +"："
                                        + params.value;
                                }
                            },
                            legend:{
                                data:[
                                        {
                                            name:'医生采集数',
                                            textStyle:{
                                                color:'#1fc141'
                                            }
                                        },
                                        {
                                            name:'药品采集数',
                                            textStyle:{
                                                color:'#fc9e22'
                                            }
                                        },
                                        {
                                            name:'互动采集数',
                                            textStyle:{
                                                color:'#26bdf9'
                                            }
                                        },
                                    ]
                            },
                            /**toolbox: {
                                                show : true,
                                                feature : {
                                                    mark : {show: true},
                                                    dataView : {show: true, readOnly: false},
                                                    restore : {show: true},
                                                    saveAsImage : {show: true}
                                                }
                                            },**/
                            grid: {
                                x: 65,
                                y: 35,
                                x2: 20,
                                y2: 70,
                                borderWidth: 0
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    // splitNumber:10,
                                    boundaryGap : false,
                                    data : data.xaxis,
                                    axisLabel:{
                                        margin:8,
                                        textStyle:{
                                            color:"#165fa9",
                                            fontSize:16
                                        }
                                    },
                                    splitLine:{
                                        show: false
                                    },
                                    splitArea:{
                                        show:false
                                    },
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    axisLabel:{
                                        textStyle:{
                                            color:"#165fa9",
                                            fontSize:16
                                        }
                                    },
                                    splitLine:{
                                        show: true,
                                        lineStyle:{
                                            type: 'dashed',
                                            color:'#094583',
                                        }
                                    },
                                    splitArea:{
                                        show:false
                                    }
                                }
                            ],
                            series : [
                                
                                {
                                    name: '互动采集数',
                                    type: 'line',
                                    showAllSymbol: true,
                                    symbolSize: 3,
                                    symbol: 'circle',
                                    itemStyle:{
                                        normal: {
                                            areaStyle: {
                                                type: 'default'
                                            }
                                        }
                                    },
                                    data: data.interactnum
                                },
                                {
                                    name: '医生采集数',
                                    type: 'line',
                                    showAllSymbol: true,
                                    symbolSize:3,
                                    symbol: 'circle',
                                    itemStyle:{
                                        normal: {
                                            areaStyle: {
                                                type: 'default'
                                            }
                                        }
                                    },
                                    data: data.docnum
                                },
                                {
                                    name: '药品采集数',
                                    type: 'line',
                                    showAllSymbol: true,
                                    symbolSize: 3,
                                    symbol: 'circle',
                                    itemStyle:{
                                        normal: {
                                            areaStyle: {
                                                type: 'default'
                                            }
                                        }
                                    },
                                    data: data.medicalnum
                                }
                            ]
                        };
                        ec.init(document.getElementById(domID), theme).setOption(option);
                    }
                );
            });
        }    
        function collectGuage(url, params, domID, style, title, toolbox) {
            ajaxHandler.select(url, params, function(data) {
                require.config({
                    paths: {
                        echarts: '../echarts-2.2.7/src'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/' + style,
                        'echarts/chart/gauge'
                    ],
                    function(ec, theme) {
                        var option = {
                            tooltip : {
                                formatter: "{a}: <br/>{b}  {c}%"
                            },
                            toolbox: {
                                show : toolbox,
                                feature : {
                                    mark : {show: true},
                                    restore : {show: true},
                                    saveAsImage : {show: true}
                                }
                            },
                            series : [
                                {
                                    name:'药物使用强度',
                                    type:'gauge',
                                    center : ['50%', '75%'],    // 默认全局居中
                                    radius : [100, '150%'],
                                    startAngle: 180,
                                    endAngle : 0,
                                    min: 0,                     // 最小值
                                    max: 100,                   // 最大值
                                    precision: 0,               // 小数精度，默认为0，无小数点
                                    splitNumber: 8,             // 分割段数，默认为5
                                    axisLine: {            // 坐标轴线
                                        show: true,        // 默认显示，属性show控制显示与否
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: [[0.25, '#fc9e22'],[0.75, '#4194ca'],[1, '#1fc141']],
                                            width: 100
                                        }
                                    },
                                    axisTick: {            // 坐标轴小标记
                                        show: true,        // 属性show控制显示与否，默认不显示
                                        splitNumber: 9,    // 每份split细分多少段
                                        length :12,         // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle控制线条样式
                                            color: '#eee',
                                            width: 1,
                                            type: 'solid'
                                        }
                                    },
                                    axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                                        show: true,
                                        formatter: function(v){
                                            switch (v+''){
                                                case '12.5': return '差';
                                                case '50': return '中';
                                                case '87.5': return '高';
                                              default: return '';
                                            }
                                        },
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            color: '#fff',
                                            fontSize:18
                                        }
                                    },
                                    splitLine: {           // 分隔线
                                        show: true,        // 默认显示，属性show控制显示与否
                                        length :16,         // 属性length控制线长
                                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                            color: '#eee',
                                            width: 1,
                                            type: 'solid'
                                        }
                                    },
                                    pointer : {
                                        length : '80%',
                                        width : 9        ,
                                        color : '#26bdf9'
                                    },
                                    title : {
                                        show : true,
                                        offsetCenter: ['0', 30],       // x, y，单位px
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            color: '#1660a9',
                                            fontSize : 18
                                        }
                                    },
                                    detail : {
                                        show : true,
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        borderWidth: 0,
                                        borderColor: '#ccc',
                                        width: 100,
                                        height: 40,
                                        offsetCenter: ['0', -100],       // x, y，单位px
                                        formatter: function(params){
                                            return '健康指数:\n'+params+"%"
                                        },
                                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                            color: '#fff',
                                            fontSize : 16
                                        }
                                    },
                                    data:[{value: data*100, name: title}]
                                }
                            ]
                        };
                        ec.init(document.getElementById(domID), theme).setOption(option);
                    }
                );
            });
        }
    function rankingLine(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/line'
                ],
                function(ec, theme) {
                    var option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        grid: {
                            x: 150,
                            y: 30,
                            x2: 40,
                            y2: 30,
                            borderWidth: 0
                        },
                        legend: {
                            data:data.ranking,
                            x : 'left',
                            orient : 'vertical'
                        },
                        calculable : true,
                        yAxis : function(){
                            if(params.changeshowchart == "ranking"){
                                return [{
                                    type : 'category',
                                    axisTick : {show: true},
                                    data : [11,10,9,8,7,6,5,4,3,2,1,'']
                                }];
                            }else if(params.changeshowchart == "outpatient"){
                                return {type : 'value'};
                            }
                        }(),
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : data.xaxis
                            }
                        ],
                        series : (function(){
                            if(data.date.length===0){
                                return [{data:[]}];
                            }
                            return data.date;
                        })()
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function basicAreaLine(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/line'
                ],
                function(ec, theme) {
                    var option = {
                        title: {
                            text: title
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        color:['#15427e','#1383a0'],
                        grid: {
                            x: 60,
                            y: 30,
                            x2: 30,
                            y2: 30,
                            borderWidth: 0
                        },
                        legend: {
                            data: [{name:data.type[0],textStyle:{color:"#15427e"}},{name:data.type[1],textStyle:{color:"#1383a0"}}]
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
                                    type: ['line', 'bar', 'stack', 'tiled']
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
                            type: 'category',
                            boundaryGap: false,
                            data: data.xaxis,
                            axisLabel:{
                                margin:1,
                                textStyle:{
                                    color:"#165fa9"
                                }
                            },
                            splitLine:{
                                lineStyle:{
                                    color:'#0a224a'
                                }
                            },
                        }],
                        yAxis: [{
                            type: 'value',
                            min : data.small,
                            max : data.big,
                            axisLabel:{
                                textStyle:{
                                    color:"#165fa9"
                                }
                            },
                            splitArea:{
                                show:false
                            },
                            splitLine:{
                                lineStyle:{
                                    color:'#0a224a'
                                }
                            },
                        }],
                        series: (function(){
                            var seriesData = [],
                                i = 0;

                            for (var prop in data.date) {
                                if (data.date.hasOwnProperty(prop)) {
                                    var seriesObject = {
                                        name: '',
                                        type: 'line',
                                        symbol:'circle',
                                        smooth: true,
                                        itemStyle: {
                                            normal: {
                                                areaStyle: {
                                                    type: 'default'
                                                }
                                            }
                                        },
                                        data: []
                                    };
                                    seriesObject.name = data.type[i];
                                    seriesObject.data = data.date[prop];
                                    seriesData.push(seriesObject);
                                    i++;
                                }
                            }
                            if(seriesData.length===0){
                                return [{data:[]}];
                            }
                            return seriesData;
                        })()
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function stackBar(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
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
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params) {
                                return params[1] + "</br>" + params[5];
                            }
                        },
                        grid: {
                            x: 60,
                            y: 30,
                            x2: 50,
                            y2: 30,
                            borderWidth: 1,
                            borderColor:'#0a224a'
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
                                    color:"#165fa9"
                                }
                            },
                            splitLine:{
                                lineStyle:{
                                    color:'#0a224a'
                                }
                            },
                            splitArea:{
                                show:false
                            }
                        }],
                        yAxis: [{
                            type: 'category',
                            data: data.type,
                            axisLabel:{
                                textStyle:{
                                    color:"#165fa9"
                                }
                            },
                            splitLine:{
                                lineStyle:{
                                    color:'#0a224a'
                                }
                            },
                            splitArea:{
                                show:false
                            }
                        }],
                        series: [{
                            name: '',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color:"#09549d",
                                    label: {
                                        show: true,
                                        position: 'right',
                                        formatter: '{c}'
                                    }
                                }
                            },
                            data: data.date,
                            barWidth:12
                        }]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function coloursStackBar(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
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
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            x: 100,
                            y: 30,
                            x2: 30,
                            y2: 30,
                            borderWidth: 1,
                            borderColor:'#0a224a'
                        },
                        color:['#1d66a8','#038ab6'],
                        legend: {
                            data: [{name:data.type[0],textStyle:{color:"#1d66a8"}},{name:data.type[1],textStyle:{color:"#038ab6"}}]
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
                                    type: ['line', 'bar', 'stack', 'tiled']
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
                            axisLine:{
                                lineStyle:{
                                    width:1,
                                }
                            },
                            axisLabel:{
                                textStyle:{
                                    color:"#165fa9"
                                }
                            },
                            splitArea:{
                                show:false
                            },
                            splitLine:{
                                lineStyle:{
                                    color:'#0a224a'
                                }
                            },
                        }],
                        yAxis: [{
                            type: 'category',
                            data: data.xaxis,
                            axisLine:{
                                lineStyle:{
                                    width:1
                                }
                            },
                            axisLabel:{
                                textStyle:{
                                    color:"#165fa9"
                                }
                            },
                            splitArea:{
                                show:false
                            },
                            splitLine:{
                                lineStyle:{
                                    color:'#0a224a'
                                }
                            },
                        }],
                        series: (function() {
                            var seriesData = [],
                                i = 0;
                            for (var prop in data.date) {
                                if (data.date.hasOwnProperty(prop)) {
                                    var seriesObject = {
                                        name: '',
                                        type: 'bar',
                                        stack: '总量',
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: true,
                                                    position: 'insideRight'
                                                }
                                            }
                                        },
                                        data: []
                                    };
                                    seriesObject.name = data.type[i];
                                    seriesObject.data = data.date[prop];
                                    seriesData.push(seriesObject);
                                    i++;
                                }
                            }
                            if(seriesData.length===0){
                                return [{data:[]}];
                            }
                            return seriesData;
                        })()
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function multipleSreiesRainbowBar(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
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
                    var zrColor = require('zrender/tool/color');
                    var colorList = [
                        '#058FCD','#C00000','#F6881F','#4FC5FA','#A6CE39',
                        '#FEC20E','#65D5B2','#97b552','#95706d','#dc69aa',
                    ];
                    var itemStyle = {
                        normal: {
                            
                        }
                    };
                    var option = {
                        title: {
                            text: title
                        },
                        grid: {
                            x: 50,
                            y: 30,
                            x2: 30,
                            y2: 30,
                            borderWidth: 1,
                            borderColor:'#0a224a'
                        },
                        color:['#0f5dad','#0d9ecd'],
                        tooltip: {
                            trigger: 'axis',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            axisPointer: {
                                type: 'shadow'
                            },
                            formatter: function(params) {
                                // for text color
                                var color = colorList[params[0].dataIndex];
                                var res = '<div style="color:' + color + '">';
                                res += '<strong>' + params[0].name + '</strong>'
                                for (var i = 0, l = params.length; i < l; i++) {
                                    res += '<br/>' + params[i].seriesName + ' : ' + params[i].value
                                }
                                res += '</div>';
                                return res;
                            }
                        },
                        legend: {
                            x: 'right',
                            data: [{name:data.type[0],textStyle:{color:"#0f5dad"}},{name:data.type[1],textStyle:{color:"#0d9ecd"}}]
                        },
                        toolbox: {
                            show: toolbox,
                            orient: 'vertical',
                            y: 'center',
                            feature: {
                                mark: {
                                    show: true
                                },
                                dataView: {
                                    show: true,
                                    readOnly: false
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
                            type: 'category',
                            data: data.xaxis,
                            axisLine:{
                                lineStyle:{
                                    width:1,
                                }
                            },
                            axisLabel:{
                                textStyle:{
                                    color:"#165fa9"
                                }
                            },
                            splitArea:{
                                show:false
                            },
                            splitLine:{
                                lineStyle:{
                                    color:'#0a224a'
                                }
                            },
                        }],
                        yAxis: [{
                            type: 'value',
                            axisLine:{
                                lineStyle:{
                                    width:1,
                                }
                            },
                            axisLabel:{
                                textStyle:{
                                    color:"#165fa9"
                                }
                            },
                            splitArea:{
                                show:false
                            },
                            splitLine:{
                                lineStyle:{
                                    color:'#0a224a'
                                }
                            },
                        }],
                        series: (function() {
                            var seriesData = [],
                                i = 0;
                            for (var prop in data.date) {
                                if (data.date.hasOwnProperty(prop)) {
                                    var seriesObject = {
                                        name: '',
                                        type: 'bar',
                                        itemStyle: itemStyle,
                                        data: []
                                    };
                                    seriesObject.name = data.type[i];
                                    seriesObject.data = data.date[prop];
                                    seriesData.push(seriesObject);
                                    i++;
                                }
                            }
                            if(seriesData.length===0){
                                return [{data:[]}];
                            }
                            return seriesData;
                        })()
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function coloursBar(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
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
                    var zrColor = require('zrender/tool/color');
                    var colorList = [
                        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
                        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
                        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
                        '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
                        '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed'
                    ];
                    var itemStyle = {
                        normal: {
                            color: function(params) {
                                if (params.dataIndex < 0) {
                                    return zrColor.lift(
                                        colorList[colorList.length - 1], params.seriesIndex * 0.1
                                    );
                                } else {
                                    return zrColor.lift(
                                        colorList[params.dataIndex], params.seriesIndex * 0.1
                                    );
                                }
                            },
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{c}' //{b}\n{c}
                            }
                        }
                    };
                    var option = {
                        title: {
                            text: title
                        },
                        tooltip: {
                            trigger: 'axis',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            axisPointer: {
                                type: 'shadow'
                            },
                            formatter: function(params) {
                                var color = colorList[params[0].dataIndex];
                                var res = '<div style="color:' + color + '">';
                                res += '<strong>' + params[0].name + '</strong>';
                                for (var i = 0, l = params.length; i < l; i++) {
                                    res += '<br/>' + params[i].value;
                                }
                                res += '</div>';
                                return res;
                            }
                        },
                        calculable: true,
                        grid: {
                            y: 80,
                            y2: 40,
                            x2: 40
                        },
                        xAxis: [{
                            type: 'category',
                            data: data.type
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: [{
                            name: '热门疾病TOP25',
                            type: 'bar',
                            itemStyle: itemStyle,
                            data: data.date
                        }]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function onecolorBar(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
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
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            formatter: function(params) {
                                return params.data.val + '<br/>' + params.name + '<br/>' + params.value;
                            }
                        },
                        grid: {
                            x: 50,
                            y: 10,
                            x2: 30,
                            y2: 30,
                            borderWidth: 0
                        },
                        legend: {
                            show: false,
                            data: []
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
                                    type: ['bar']
                                },
                                restore: {
                                    show: true
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        calculable: false,
                        xAxis: [{
                            type: 'category',
                            data: data.xaxis
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: [{
                            type: 'bar',
                            itemStyle: { // 系列级个性化样式，纵向渐变填充
                                normal: {
                                    //barBorderColor: '#4682B4',
                                    //barBorderWidth: 5,
                                    color: (function() {
                                        var zrColor = require('zrender/tool/color');
                                        return zrColor.getLinearGradient(
                                            0, 400, 0, 300, [
                                                [0, 'green'],
                                                [1, '#058FCD']
                                            ]
                                        )
                                    })(),
                                    label: {
                                        show: true,
                                        position: 'top',
                                        formatter: function(param) {
                                            return param.value;
                                        },
                                        textStyle: {
                                            color: '#058FCD'
                                        }
                                    }
                                },
                                emphasis: {
                                    //barBorderColor: 'green',
                                    //barBorderWidth: 5,
                                    color: (function() {
                                        var zrColor = require('zrender/tool/color');
                                        return zrColor.getLinearGradient(
                                            0, 400, 0, 300, [
                                                [0, 'red'],
                                                [1, '#4FC5FA']
                                            ]
                                        )
                                    })()
                                }
                            },
                            data: data.date
                        }]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function topdownBar(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
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
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            formatter: function(params) {
                                return params.value + ' ' + params.data.val;
                            }
                        },
                        legend: {
                            show: false,
                            data: []
                        },
                        grid: {
                            x: 0,
                            y: 0,
                            x2: 100,
                            y2: 0,
                            borderWidth: 0
                        },
                        xAxis: [{
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },

                        }],
                        yAxis: [{
                            type: 'category',
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            data: ['', '', '', '', '', '', '', '', '', '']
                        }],
                        series: [{
                            type: 'bar',
                            data: data.date,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        if (params.dataIndex < 5) {
                                            return '#A6CE39';
                                        } else {
                                            return '#C00000';
                                        }
                                    },
                                    label: {
                                        show: true,
                                        position: 'right',
                                        formatter: function(param) {
                                            return param.value + ' ' + param.data.val;
                                        }
                                    }

                                }
                            }
                        }]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function dynamicLine(url, params, domID, style, title, toolbox, onOff, coord, addDataUrl, frequency) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/line'
                ],
                function(ec, theme) {
                    var dynamicLineChartAdd = ec.init(document.getElementById(domID), theme);

                    var option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: data.type
                        },
                        dataZoom: {
                            show: true,
                            height: 20,
                            start : 0
                        },
                        grid: {
                            x: 50,
                            y: 30,
                            x2: 30,
                            y2: 55,
                            borderWidth: 0
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
                                    type: ['line', 'bar', 'stack', 'tiled']
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
                            type: 'category',
                            boundaryGap: false,
                            data: data.xaxis
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: (function() {
                            var seriesData = [],
                                i = 0;
                            for (var prop in data.date) {
                                if (data.date.hasOwnProperty(prop)) {
                                    var seriesObject = {
                                        name: '',
                                        type: 'line',
                                        data: []
                                    };
                                    seriesObject.name = data.type[i];
                                    seriesObject.data = data.date[prop];
                                    seriesData.push(seriesObject);
                                    i++;
                                }
                            }
                            if(seriesData.length===0){
                                return [{data:[]}];
                            }
                            return seriesData;
                        })()
                    };

                    dynamicLineChartAdd.setOption(option);

                    // 动态数据
                    clearInterval(dynamicLineArray[coord]);
                    if (onOff === "on") {
                        dynamicLineArray[coord] = setInterval(function() {
                            ajaxHandler.select(addDataUrl, params, function(data) {
                                var addDate = [],
                                    i = data.date.length,
                                    ii = 0;
                                for (var prop in data.date) {
                                    if (data.date.hasOwnProperty(prop)) {

                                        // 系列索引  [0,12,false,false,new Date().Format("hh:mm:ss")]
                                        // 新增数据
                                        // 新增数据是否从队列头部插入
                                        // 是否增长数据队列长度，默认，不指定或false时移出目标数组对位数据
                                        // 坐标轴标签
                                        if (i == ii + 1) {
                                            addDate.push([ii, data.date[prop], false, false, data.xaxis]);
                                        } else {
                                            addDate.push([ii, data.date[prop], false, false]);
                                        }
                                        ii++;
                                    }
                                }
                                dynamicLineChartAdd.addData(addDate);
                            })
                        }, frequency);
                    }
                }
            );
        });
    }

    function meanLine(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/line'
                ],
                function(ec, theme) {
                    var option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: data.type
                        },
                        grid: {
                            x: 50,
                            y: 30,
                            x2: 50,
                            y2: 30,
                            borderWidth: 0
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
                                    type: ['line', 'bar', 'stack', 'tiled']
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
                            type: 'category',
                            boundaryGap: false,
                            data: data.xaxis
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: (function() {
                            var seriesData = [],
                                i = 0;
                            for (var prop in data.date) {
                                if (data.date.hasOwnProperty(prop)) {
                                    var seriesObject = {
                                        name: '',
                                        type: 'line',
                                        data: [],
                                        markLine : {
                                            data : [
                                                {type : 'average', name : '平均值'},
                                            ]
                                        }
                                    };
                                    seriesObject.name = data.type[i];
                                    seriesObject.data = data.date[prop];
                                    seriesData.push(seriesObject);
                                    i++;
                                }
                            }
                            if(seriesData.length===0){
                                return [{data:[]}];
                            }
                            return seriesData;
                        })()
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function nightingale_simple(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ],
                function(ec, theme) {
                    var colorList = ['#13a6be','#1794e0','#f6881f','#1e7fc6'];
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            //y : 'top',
                            show: false,
                            data: data.xaxis
                        },
                        color:colorList,
                        toolbox: {
                            show: toolbox,
                            feature: {
                                //mark : {show: true},
                                //dataView : {show: true, readOnly: false},
                                magicType: {
                                    show: true,
                                    type: ['pie', 'funnel']
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
                        series: [{
                            name: title,
                            type: 'pie',
                            radius: [20, 100],
                            center: ['50%', '50%'],
                            roseType: 'radius',
                            itemStyle:{
                                normal:{
                                    labelLine:{
                                        lineStyle:{
                                            type:'dashed'
                                        }
                                    }
                                }
                            },
                            //width: '40%',       // for funnel
                            //max: 40,            // for funnel
                            data: data.date
                        }]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function pie_basic(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ],
                function(ec, theme) {
                    var colorList = ['#13a6be','#f6881f','#1794e0','#1e7fc6'];
                    var legendArr = data.xaxis.map((val,i)=>{
                        return {name:val,textStyle:{color:colorList[i]}}
                    })
                    var option = {
                        // title : {
                        //     text: title,
                        //     subtext: title,
                        //     x:'center'
                        // },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        color:colorList,
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: legendArr
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
                                    type: ['pie', 'funnel'],
                                    option: {
                                        funnel: {
                                            x: '25%',
                                            width: '50%',
                                            funnelAlign: 'left',
                                            max: 1548
                                        }
                                    }
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
                        series: [{
                            name: title,
                            type: 'pie',
                            radius: '70%',
                            itemStyle:{
                                normal: {
                                    label: {
                                        show: true
                                    },
                                    labelLine:{
                                        lineStyle:{
                                            type:'dashed'
                                        }
                                    }
                                },
                            },
                            center: ['50%', '50%'],
                            data: data.date
                        }]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function pie_doughnut(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/pie'
                ],
                function(ec, theme) {
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            show: false,
                            orient: 'vertical',
                            x: 'left',
                            data: data.xaxis
                        },
                        color:['#084482','#73d9ea','#4dc9ef','#23bbf7','#00aaff','#1794e0','#1e7fc6','#1d66a8'],
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
                                restore: {
                                    show: true
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        calculable: true,
                        series: [{
                            name: title,
                            type: 'pie',
                            radius: ['50%', '70%'],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    },
                                    labelLine:{
                                        lineStyle:{
                                            type:'dashed'
                                        }
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        position: 'center',
                                        textStyle: {
                                            fontSize: '30',
                                            fontWeight: 'bold'
                                        }
                                    }
                                }
                            },
                            data: data.date
                        }]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }
    function pie_pillType(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/pie'
                ],
                function(ec, theme) {
                    var colorList = ['#13a6be','#f6881f','#1794e0','#1e7fc6'];
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            show: false,
                            orient: 'vertical',
                            x: 'left',
                            data: data.xaxis
                        },
                        color:colorList,
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
                                restore: {
                                    show: true
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        calculable: true,
                        series: [{
                            name: title,
                            type: 'pie',
                            radius: ['50%', '70%'],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    },
                                    labelLine:{
                                        lineStyle:{
                                            type:'dashed'
                                        }
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        position: 'center',
                                        textStyle: {
                                            fontSize: '30',
                                            fontWeight: 'bold'
                                        }
                                    }
                                }
                            },
                            data: data.date
                        }]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }
    function radar_basic_filled(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/radar'
                ],
                function(ec, theme) {
                    var option = {
                        title: {
                            //text: '罗纳尔多 vs 舍普琴科',
                            //subtext: '完全实况球员数据'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            show: false,
                            x: 'center',
                            data: [title]
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
                                restore: {
                                    show: true
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        calculable: true,
                        polar: [{
                            indicator: data.xaxis,
                            radius: 90
                        }],
                        series: [{
                            type: 'radar',
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default'
                                    }
                                }
                            },
                            data: [{
                                value: data.date,
                                name: title
                            }]
                        }]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function columnLine(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            var barStsrt = [],
                upDown = [],
                allArrayMin = Math.min.apply(Math,data.date[0].concat(data.date[1])),
                allArrayMax = Math.max.apply(Math,data.date[0].concat(data.date[1]));
            for (var i = 0; i < data.date[0].length; i++) {
                if(data.date[0][i] > data.date[1][i]){
                    barStsrt.push(data.date[1][i]);
                    upDown.push({"up":data.date[0][i] - data.date[1][i]});
                }else{
                    barStsrt.push(data.date[0][i]);
                    upDown.push({"down":data.date[1][i] - data.date[0][i]});
                }
            };
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/line',
                    'echarts/chart/bar'
                ],
                function(ec, theme) {
                    var colorList = ['#1c7dd6','#06939f']
                    var option = {
                        tooltip : {
                            trigger: 'axis',
                            formatter: function (params){
                                return params[0].name + ' : '
                                    + (params[2].value - params[1].value > 0 ? '+' : '-')
                                    + params[0].value + '<br/>'
                                    + "同比"+(params[2].value - params[1].value > 0 ? '增长 : '+((params[2].value/params[3].value-1).toFixed(4)*100).toFixed(2)+'%'  : '下降 : '+((params[2].value/params[3].value-1).toFixed(4)*-100).toFixed(2)+'%') + '<br/>'
                                    + params[2].seriesName + ' : ' + params[2].value + '<br/>'
                                    + params[3].seriesName + ' : ' + params[3].value + '<br/>'
                            }
                        },
                        color:colorList,
                        legend: {
                            data:[{name:data.type[0],textStyle:{color:colorList[0]}},{name:data.type[1],textStyle:{color:colorList[1]}}],
                            selectedMode:false,
                            x:'41%',
                            itemGap:50,
                            textStyle:{
                                fontSize:16,
                            }
                        },
                        grid:{
                            borderWidth:1,
                            borderColor:'#0a224a'
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : data.xaxis,
                                axisLabel:{
                                    margin:1,
                                    textStyle:{
                                        color:"#165fa9"
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
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                min : allArrayMin,
                                max : allArrayMax,
                                axisLabel:{
                                    textStyle:{
                                        baseline:'bottom',
                                        color:"#165fa9"
                                    }
                                },
                                splitLine:{
                                    lineStyle:{
                                        color:'#0a224a'
                                    }
                                },
                                splitArea:{show:true,
                                    areaStyle:{
                                        color:['rgba(0,0,0,0.15)','transparent']
                                    }
                                },
                            }
                        ],
                        series : [
                            {
                                name:data.type[0],
                                type:'line',
                                data:data.date[0],
                                symbolSize:4
                            },
                            {
                                name:data.type[1],
                                type:'line',
                                symbol:'none',
                                itemStyle:{
                                    normal:{
                                        lineStyle: {
                                            width:1,
                                            type:'dashed'
                                        }
                                    }
                                },
                                data:data.date[1]
                            },
                            {
                                name:data.type[1]+'2',
                                type:'bar',
                                stack: '1',
                                barWidth: 6,
                                itemStyle:{
                                    normal:{
                                        color:'rgba(0,0,0,0)'
                                    },
                                    emphasis:{
                                        color:'rgba(0,0,0,0)'
                                    }
                                },
                                data:barStsrt
                            },
                            {
                                name:'变化',
                                type:'bar',
                                stack: '1',
                                data:(function () {
                                    var arrays = [];
                                    for (var i = 0; i < upDown.length; i++) {
                                        if(upDown[i].up){
                                            arrays.push(upDown[i].up);
                                        }else if(upDown[i].down){
                                            var use = {value : 0, itemStyle:{ normal:{color:'#06939f'}}};
                                            use.value = upDown[i].down;
                                            arrays.push(use);
                                        }
                                    };
                                    return arrays;
                                })()
                            }
                        ]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    function basicAngularGauge(url, params, domID, style, title, toolbox) {
        ajaxHandler.select(url, params, function(data) {
            require.config({
                paths: {
                    echarts: '../echarts-2.2.7/src'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/theme/' + style,
                    'echarts/chart/gauge'
                ],
                function(ec, theme) {
                    var option = {
                        tooltip : {
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        toolbox: {
                            show : toolbox,
                            feature : {
                                mark : {show: true},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        series : [
                            {
                                name:'药物使用强度',
                                type:'gauge',
                                center : ['50%', '75%'],    // 默认全局居中
                                radius : [50, '110%'],
                                startAngle: 180,
                                endAngle : 0,
                                min: 0,                     // 最小值
                                max: 8,                   // 最大值
                                precision: 0,               // 小数精度，默认为0，无小数点
                                splitNumber: 16,             // 分割段数，默认为5
                                axisLine: {            // 坐标轴线
                                    show: true,        // 默认显示，属性show控制显示与否
                                    lineStyle: {       // 属性lineStyle控制线条样式
                                        color: [[0.12, '#23b123'],[0.5, '#F6881F'],[0.88, '#1b70b1'],[1, '#ff1600']],
                                        width: 30
                                    }
                                },
                                axisTick: {            // 坐标轴小标记
                                    show: true,        // 属性show控制显示与否，默认不显示
                                    splitNumber: 5,    // 每份split细分多少段
                                    length :16,         // 属性length控制线长
                                    lineStyle: {       // 属性lineStyle控制线条样式
                                        color: '#eee',
                                        width: 1,
                                        type: 'solid'
                                    }
                                },
                                axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                                    show: true,
                                    formatter: function(v){
                                        switch (v+''){
                                            case '0': return '0';
                                            case '1': return '1';
                                            case '2': return '2';
                                            case '3': return '3';
                                            case '4': return '4';
                                            case '5': return '5';
                                            case '6': return '6';
                                            case '7': return '7';
                                            case '8':return '8';
                                          default: return '';
                                        }
                                    },
                                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                        color: '#fff',
                                        fontSize:16
                                    }
                                },
                                splitLine: {           // 分隔线
                                    show: true,        // 默认显示，属性show控制显示与否
                                    length :30,         // 属性length控制线长
                                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                        color: '#eee',
                                        width: 4,
                                        type: 'solid'
                                    }
                                },
                                pointer : {
                                    length : '80%',
                                    width : 8,
                                    color : 'auto'
                                },
                                title : {
                                    show : true,
                                    offsetCenter: ['0', 30],       // x, y，单位px
                                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                        color: '#1660a9',
                                        fontSize : 18
                                    }
                                },
                                detail : {
                                    show : true,
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    borderWidth: 0,
                                    borderColor: '#ccc',
                                    width: 100,
                                    height: 40,
                                    offsetCenter: ['0', -70],       // x, y，单位px
                                    formatter:'{value}',
                                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                        color: 'auto',
                                        fontSize : 30
                                    }
                                },
                                data:[{value: data, name: title}]
                            }
                        ]
                    };
                    ec.init(document.getElementById(domID), theme).setOption(option);
                }
            );
        });
    }

    return {
        "timeLine": function(url, params, domID, style, title, toolbox) {
            timeLine(url, params, domID, style, title, toolbox);
        },
        'dataAreaLine': function(url, params, domID, style, title, toolbox) {
            dataAreaLine(url, params, domID, style, title, toolbox);
        },
        'collectGuage': function(url, params, domID, style, title, toolbox) {
            collectGuage(url, params, domID, style, title, toolbox);
        },
        "doctorLine": function(url, params, domID, style, title, toolbox) {
            doctorLine(url, params, domID, style, title, toolbox);
        },
        //排名折线图（json地址，参数，页面domID，样式，标题，工具栏）
        "rankingLine": function(url, params, domID, style, title, toolbox) {
            rankingLine(url, params, domID, style, title, toolbox);
        },

        //标准面积图（json地址，参数，页面domID，样式，标题，工具栏）
        "basicAreaLine": function(url, params, domID, style, title, toolbox) {
            basicAreaLine(url, params, domID, style, title, toolbox);
        },

        //多层条形图（json地址，参数，页面domID，样式，标题，工具栏）
        "stackBar": function(url, params, domID, style, title, toolbox) {
            stackBar(url, params, domID, style, title, toolbox);
        },

        //多层多条条形图（json地址，参数，页面domID，样式，标题，工具栏）
        "coloursStackBar": function(url, params, domID, style, title, toolbox) {
            coloursStackBar(url, params, domID, style, title, toolbox);
        },

        //多系列彩虹柱形图（json地址，参数，页面domID，样式，标题，工具栏）
        "multipleSreiesRainbowBar": function(url, params, domID, style, title, toolbox) {
            multipleSreiesRainbowBar(url, params, domID, style, title, toolbox);
        },

        //彩色柱形图（json地址，参数，页面domID，样式，标题，工具栏）
        "coloursBar": function(url, params, domID, style, title, toolbox) {
            coloursBar(url, params, domID, style, title, toolbox);
        },

        //单一颜色柱形图（json地址，参数，页面domID，样式，标题，工具栏）
        "onecolorBar": function(url, params, domID, style, title, toolbox) {
            onecolorBar(url, params, domID, style, title, toolbox);
        },

        //前5后5柱形图（json地址，参数，页面domID，样式，标题，工具栏）
        "topdownBar": function(url, params, domID, style, title, toolbox) {
            topdownBar(url, params, domID, style, title, toolbox);
        },

        //动态数据折线图（json地址，参数，页面domID，样式，标题，工具栏，动态数据_onOff，动态数据_coord，动态数据_json地址，动态数据_请求频率）
        "dynamicLine": function(url, params, domID, style, title, toolbox, onOff, coord, addDataUrl, frequency) {
            dynamicLine(url, params, domID, style, title, toolbox, onOff, coord, addDataUrl, frequency);
        },

        //平均折线图（json地址，参数，页面domID，样式，标题，工具栏）
        "meanLine": function(url, params, domID, style, title, toolbox) {
            meanLine(url, params, domID, style, title, toolbox);
        },

        //南丁格尔玫瑰图（json地址，参数，页面domID，样式，标题，工具栏）
        "nightingale_simple": function(url, params, domID, style, title, toolbox) {
            nightingale_simple(url, params, domID, style, title, toolbox);
        },

        //标准饼图（json地址，参数，页面domID，样式，标题，工具栏）
        "pie_basic": function(url, params, domID, style, title, toolbox) {
            pie_basic(url, params, domID, style, title, toolbox);
        },
        "pie_pillType": function(url, params, domID, style, title, toolbox) {
            pie_pillType(url, params, domID, style, title, toolbox);
        },
        //标准环形图（json地址，参数，页面domID，样式，标题，工具栏）
        "pie_doughnut": function(url, params, domID, style, title, toolbox) {
            pie_doughnut(url, params, domID, style, title, toolbox);
        },

        //标准填充雷达图（json地址，参数，页面domID，样式，标题，工具栏）
        "radar_basic_filled": function(url, params, domID, style, title, toolbox) {
            radar_basic_filled(url, params, domID, style, title, toolbox);
        },

        //同比比较折线图（json地址，参数，页面domID，样式，标题，工具栏）
        "columnLine": function(url, params, domID, style, title, toolbox) {
            columnLine(url, params, domID, style, title, toolbox);
        },

        //标准仪表盘（json地址，参数，页面domID，样式，标题，工具栏）
        "basicAngularGauge": function(url, params, domID, style, title, toolbox) {
            basicAngularGauge(url, params, domID, style, title, toolbox);
        }
    }
}
