$(document).ready(function() {
    var wholeHospitalChart;
    var wholeHospitalChartDom = document.getElementById('wholeHospitalChart');
    var wholeHospitalBarChart;
    var wholeHospitalBarChartDom = document.getElementById('province_list');
    var wholeHospitalYNChart;
    var wholeHospitalYNChartDom = document.getElementById('wholeHospitalYNChart');

    
    var initial_province = "上海";
    
    drawChinaChart(initial_province);
    function drawChinaChart(initial_province){
        require.config({
            paths: {
                echarts: '../echarts-2.2.7/src'
            }
        });

        require(
            [
                'echarts',
                //'echarts/theme/custom',
                'echarts/chart/bar',
                'echarts/chart/map'
            ],

            function (ec,theme) {
                var wholeHospitalChartOption = getWholeHospitalChartOption();
                wholeHospitalChart = ec.init(wholeHospitalChartDom,theme);

                var legendData=[];
                var fullData=[];
                $.ajax(
                    {
                       // url:"provStatsController/getHospitalMark",
                       // url:"../jsonp/getHospitalMark.json",
                    	url: "/medical/DomesticHospDistribution",
                        method: "GET",
                        data: {
                        	'province': encodeURI(initial_province)
                        },
                        dataType:"json",
                        async: false,
                        success:function(data)
                        {
                            $.each(data.legendList, function(i,level){
                                legendData.push(level);
                                var valData=[];
                                var valgeoCoord={};
                                var star="";
                                $.each(data.hospitalList, function(i,val){
                                    if(level == val.level){
                                        valData.push("{name: \""+val.name+"\", value: "+val.score+"}");
                                        var lnglat=[];
                                        lnglat.push(val.lng);
                                        lnglat.push(val.lat);
                                        valgeoCoord[val.name]="["+val.lng+","+val.lat+"]";
                                        star=star+"'"+val.name+"':"+"["+val.lng+","+val.lat+"],";
                                    }
                                });
                                star = star.substring(0,star.length-1);
                                var temp = "{name:'"+level+"',type: 'map',mapType:'" + initial_province + "', mapLocation: {x:'35%'},itemStyle:{normal:{borderColor:'lightgreen',borderWidth:0,areaStyle:{color: '#007aa1'}}},hoverable: false,roam:true,data : [],markPoint : {symbol:'droplet',symbolSize: 5,itemStyle: {normal: {borderColor: colorList["+i+"],borderWidth: 1,label: {show: false}},emphasis: {borderColor: colorList["+i+"],borderWidth: 3,label: {show: false}}},data :["+valData+"]},geoCoord:{"+star+"}}";
                                fullData.push(temp);
                            });
                        }
                    });

                var colorList = [
                    '#058FCD','#C00000','#F6881F','#4FC5FA','#A6CE39',
                    '#FEC20E','#65D5B2','#97b552','#95706d','#dc69aa',
                    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                ];

                $.each(fullData,function(n,value) {
                    wholeHospitalChartOption.series[n+1] = eval("("+value+")");
                });
                wholeHospitalChartOption.color = ['#0a8ecc','#bf0101','#f38824','#4fc4f9','#a4cd40']
                wholeHospitalChartOption.legend = {
                    orient: 'vertical',
                    x:'50',
                    y:'bottom',
                    data:legendData,
                    textStyle: {
                        color: '#00a6fb'          // 图例文字颜色
                    },
                };
                wholeHospitalChartOption.dataRange = {
                    min : 0,
                    max : 5,
                    calculable : true,
                    text:['高','低'],
                    textStyle: {
                        fontSize: 16,
                        color: '#0a8ecc',
                                  // 主标题文字颜色
                    },
                    x:'90%',
                    y:'bottom',
                    color: ['maroon','red','orange','yellow','lightgreen']
                };
                wholeHospitalChart.setOption(wholeHospitalChartOption, true);

                wholeHospitalChart.setOption(wholeHospitalChartOption);

                var ecConfig = require('echarts/config');
                wholeHospitalChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
                    wholeHospitalChartOption.series.splice(1);
                    wholeHospitalChartOption.legend = null;
                    wholeHospitalChartOption.dataRange = null;
                    wholeHospitalChart.setOption(wholeHospitalChartOption, false);

                    var selected = param.selected;
                    var selectedProvince = initial_province;
                    var name;
                    for (var i = 0, l = wholeHospitalChartOption.series[0].data.length; i < l; i++) {
                        name = wholeHospitalChartOption.series[0].data[i].name;
                        wholeHospitalChartOption.series[0].data[i].selected = selected[name];
                        if (selected[name]) {
                            selectedProvince = name;
                        }
                    }
                    if (typeof selectedProvince == 'undefined') {
                        wholeHospitalChartOption.series.splice(1);
                        wholeHospitalChartOption.legend = null;
                        wholeHospitalChartOption.dataRange = null;
                        wholeHospitalChart.setOption(wholeHospitalChartOption, true);
                        return;
                    }

                    var legendData=[];
                    var fullData=[];
                    $.ajax(
                        {
                            //url:"../jsonp/getHospitalMark.json",
                        	url: "/medical/DomesticHospDistribution",
                            method: "GET",
                            data: {'province': selectedProvince},
                            dataType:"json",
                            async: false,
                            success:function(data)
                            {
                                $.each(data.legendList, function(i,level){
                                    legendData.push(level);
                                    var valData=[];
                                    var valgeoCoord={};
                                    var star="";
                                    $.each(data.hospitalList, function(i,val){
                                        if(level == val.level){
                                            valData.push("{name: \""+val.name+"\", value: "+val.score+"}");
                                            var lnglat=[];
                                            lnglat.push(val.lng);
                                            lnglat.push(val.lat);
                                            valgeoCoord[val.name]="["+val.lng+","+val.lat+"]";
                                            star=star+"'"+val.name+"':"+"["+val.lng+","+val.lat+"],";
                                        }
                                    });
                                    star = star.substring(0,star.length-1);
                                    // var temp = "{name:'"+level+"',type: 'map',mapType: selectedProvince, mapLocation: {x:'35%'},itemStyle:{normal:{borderColor:'lightgreen',borderWidth:0,areaStyle:{color: '#007aa1'}}},hoverable: false,roam:true,data : [],markPoint : {symbol:'droplet',symbolSize: 5,itemStyle: {normal: {borderColor: colorList["+i+"],borderWidth: 1,label: {show: false}},emphasis: {borderColor: 'red',borderWidth: 5,label: {show: false}}},data :["+valData+"]},geoCoord:{"+star+"}}";
                                    var temp = "{name:'"+level+"',type: 'map',mapType: selectedProvince, mapLocation: {x:'35%'},itemStyle:{normal:{borderColor:'lightgreen',borderWidth:0,areaStyle:{color: '#007aa1'}}},hoverable: false,roam:true,data : [],markPoint : {symbol:'droplet',symbolSize: 5,itemStyle: {normal: {borderColor: colorList["+i+"],borderWidth: 1,label: {show: false}},emphasis: {borderColor: 'red',borderWidth: 5,label: {show: false}}},data :["+valData+"]}}";
                                    
                                    fullData.push(temp);
                                });
                            }
                        });

                    var colorList = [
                        '#058FCD','#C00000','#F6881F','#4FC5FA','#A6CE39',
                        '#FEC20E','#65D5B2','#97b552','#95706d','#dc69aa',
                        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                    ];

                    $.each(fullData,function(n,value) {
                        wholeHospitalChartOption.series[n+1] = eval("("+value+")");
                    });
                    wholeHospitalChartOption.color = ['#0a8ecc','#bf0101','#f38824','#4fc4f9','#a4cd40']
                    wholeHospitalChartOption.legend = {
                        orient: 'vertical',
                        x:'50',
                        y:'bottom',
                        data:legendData
                    };
                    wholeHospitalChartOption.dataRange = {
                        min : 0,
                        max : 5,
                        calculable : true,
                        text:['高','低'],
                        textStyle: {
                            fontSize: 16,
                            width:100,
                            color: '#0a8ecc'          // 主标题文字颜色
                        },
                        x:'900',
                        y:'bottom',
                        color: ['maroon','orange','yellow','lightgreen']
                    };
                    wholeHospitalChart.setOption(wholeHospitalChartOption, true);


                    if (wholeHospitalYNChart && wholeHospitalYNChart.dispose) {
                        wholeHospitalYNChart.dispose();
                    }

                    require(['echarts','echarts/theme/custom','echarts/chart/bar','echarts/chart/line','echarts/chart/pie'],function(ec,theme){
                        wholeHospitalYNChart = ec.init(wholeHospitalYNChartDom,theme);
                    });
                    var wholeHospitalYNChartOption = getWholeHospitalYNChartOption(selectedProvince,ec);
                    wholeHospitalYNChart.setOption(wholeHospitalYNChartOption, true);
                    window.onresize = wholeHospitalYNChart.resize;
                })


                wholeHospitalChart.setOption(wholeHospitalChartOption);
                window.onresize = wholeHospitalChart.resize;


                //bar
                var wholeHospitalBarChartOption = getWholeHospitalBarChartOption();
                wholeHospitalBarChart = ec.init(wholeHospitalBarChartDom,theme);
                wholeHospitalBarChart.setOption(wholeHospitalBarChartOption);
                window.onresize = wholeHospitalBarChart.resize;

                //
                var wholeHospitalYNChartOption = getWholeHospitalYNChartOption();
                wholeHospitalYNChart = ec.init(wholeHospitalYNChartDom,theme);
                wholeHospitalYNChart.setOption(wholeHospitalYNChartOption);
                window.onresize = wholeHospitalYNChart.resize;
            });
    }

    function getWholeHospitalYNChartOption(selectedProvince){
        selectedProvince = selectedProvince != null ? selectedProvince : initial_province;
        $('#current_title').text(selectedProvince);
        var legendData=[];
        var fullData=[];
        $.ajax(
            {
               // url:"provStatsController/getDeptByProvince",
                //url:"../jsonp/getDeptByProvince.json",
            	url: "../../medical/DeptByProvince",
                method: "GET",
                data: {
                	'province': selectedProvince
                },
                dataType:"json",
                async: false,
                success:function(data)
                {
                    $.each(data.deptTop5List, function(i,val){
                        legendData.push(val.department_shortname);
                        fullData.push("{value: -"+val.diff+", itemStyle: labelRight}");
                    });

                    $.each(data.deptLast5List, function(i,val){
                        legendData.push(val.department_shortname);
                        fullData.push(val.diff);
                    });
                }
            });





        var labelRight = {normal: {label : {position: 'right'}}};
        var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },

            grid: {
                y: 50,
                y2: 50,
                x:40,
                x2:40,
                borderColor:"transparent"
            },
            xAxis : [
                {
                    type : 'value',
                    position: 'top',
                    splitLine: {lineStyle:{type:'dashed',color:'#0d4472'}},
                    axisLabel : {
                        textStyle: {
                            color: '#6594c3',
                            fontSize:16
                        }
                    }
                   
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    // data : ['口腔科', '肿瘤科', '小儿内科', '神经外科', '呼吸内科', '麻醉科', '眼科', '产科', '脑外科', '烧伤科']
                    data:legendData,
                   
                }
            ],
            series : [
                {
                    name:'资源倾斜量',
                    type:'bar',
                    stack: '总量',
                   
                    itemStyle : { normal: {
                        color:  '#0a529c',
                        borderRadius: 5,
                        label : {
                            show: true,
                            position: 'left',
                            formatter: '{b}'
                        }
                    }},
                    barWidth:20,
                    data:eval("([" + fullData + "])"),
//			            data:[
//			                {value:-0.07, itemStyle:labelRight},
//			                {value:-0.09, itemStyle:labelRight},
//			                0.2, 0.44,
//			                {value:-0.23, itemStyle:labelRight},
//			                0.08,
//			                {value:-0.17, itemStyle:labelRight},
//			                0.47,
//			                {value:-0.36, itemStyle:labelRight},
//			                0.18
//			            ]
                }
            ]
        };

        return option;
    }

    function getWholeHospitalBarChartOption(){
        var cateArray=[];
        var resultArray=[];
        var level3Array=[];
        var level3plusArray=[];
        $.ajax({
            //http110.185.210.1518012medappprovStatsControllergetProvinceDetailList
            //url: "provStatsController/getProvinceDetailList",
            //url: "../jsonp/getProvinceDetailList.json",
        	url: '../../medical/ProvinceDetailList',
            dataType: "json",
            async: false,
            success: function(data) {
                $.each(data.rows, function(index,value){
                    if(index%2==0){
                        cateArray.push(value.province_name);
                    }else
                    {
                        cateArray.push("\n"+value.province_name);
                    }
                    resultArray.push(value.hosp_num);
                    level3Array.push(value.hos_lev3_num);
                    level3plusArray.push(value.hos_lev3plus_num);
                });
            }
        });
/* XXX */ 
        var option = {
            color:['#0177a1','#0acdde','#ff9e00'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['医院总数','三级医院','三甲医院'],
                textStyle:{
                    color:'#1b77cc'
                }
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: false},
                    dataView : {show: false, readOnly: false},
                    magicType : {show: false, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            grid: {
                borderColor:"#0d4472"
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    axisLabel:{
                        'interval':0,
                        textStyle:{
                            color:'#165fa9',
                            fontSize:16
                        }
                    },
                    splitLine: {lineStyle:{color:'#0d4472'}},
                    data:cateArray,

                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel:{
                        textStyle:{
                            color:'#165fa9',
                            fontSize:16
                        }
                    },
                    axisLine:{show:true},
                    splitLine: {lineStyle:{color:'#0d4472'}},
                    splitArea:{show:true,
                        areaStyle:{
                            color:['transparent','rgba(0,0,0,0.15)']
                        }
                    }
                }
            ],
            series : [
                {
                    name:'医院总数',
                    type:'bar',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{c}'
                            },
                            barBorderRadius:[30,30,0,0]
                        },
                        emphasis:{
                            barBorderRadius:[30,30,0,0]
                        }
                    },
                    data:resultArray
                },
                {
                    name:'三级医院',
                    type:'bar',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{c}'
                            },
                            barBorderRadius:[30,30,0,0]
                        },
                        emphasis:{
                            barBorderRadius:[30,30,0,0]
                        }
                    },
                    data:level3Array
                },
                {
                    name:'三甲医院',
                    type:'bar',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{c}'
                            },
                            barBorderRadius:[30,30,0,0]
                        },
                        emphasis:{
                            barBorderRadius:[30,30,0,0]
                        }
                    },
                    data:level3plusArray
                }
            ]
        };

        return option;
    }

    function getWholeHospitalChartOption(){
        var option = {
            tooltip : {
                trigger: 'item'
            },
            toolbox: {
                show : false,
                orient: 'vertical',
                x:'right',
                y:'center',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false}
                }
            },
            series : [
                {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}'
                    },
                    name: '选择器',
                    type: 'map',
                    mapType: 'china',
                    mapLocation: {
                        x: 'left',
                        y: 'top',
                        width: '30%'
                    },
                    roam: false,
                    selectedMode : 'single',

                    itemStyle:{
                        normal:{label:{show:false,textStyle: {
                            color: "#1bedff"
                          }},color:'#083361'},
                        emphasis:{label:{show:true,textStyle: {
                          color: "#1bedff"
                        }},color:'#13829e'}
                    },
                    data:[
                        {name: '北京', selected:true},
                        {name: '天津', selected:false},
                        {name: '上海', selected:false},
                        {name: '重庆', selected:false},
                        {name: '河北', selected:false},
                        {name: '河南', selected:false},
                        {name: '云南', selected:false},
                        {name: '辽宁', selected:false},
                        {name: '黑龙江', selected:false},
                        {name: '湖南', selected:false},
                        {name: '安徽', selected:false},
                        {name: '山东', selected:false},
                        {name: '新疆', selected:false},
                        {name: '江苏', selected:false},
                        {name: '浙江', selected:false},
                        {name: '江西', selected:false},
                        {name: '湖北', selected:false},
                        {name: '广西', selected:false},
                        {name: '甘肃', selected:false},
                        {name: '山西', selected:false},
                        {name: '内蒙古', selected:false},
                        {name: '陕西', selected:false},
                        {name: '吉林', selected:false},
                        {name: '福建', selected:false},
                        {name: '贵州', selected:false},
                        {name: '广东', selected:false},
                        {name: '青海', selected:false},
                        {name: '西藏', selected:false},
                        {name: '四川', selected:false}, //Marked by Yang
                        {name: '宁夏', selected:false},
                        {name: '海南', selected:false},
                        {name: '台湾', selected:false},
                        {name: '香港', selected:false},
                        {name: '澳门', selected:false}
                    ]
                }
            ],
            animation: false
        };

        return option;
    }
    //tablelist();
    function tablelist(){
        var cols = [[
            { title:'省份', field:'province_name' ,align:'left', sortable: true },
            { title:'医院数', field:'hosp_num' ,align:'left', sortable: true },
            { title:'科室数', field:'dept_num' ,align:'left', sortable: true },
            { title:'医生数', field:'doc_num' ,align:'left', sortable: true},
            { title:'一级医院数', field:'hos_lev1_num' ,align:'left', sortable: true},
            { title:'一甲医院属', field:'hos_lev1plus_num' ,align:'left', sortable: true},
            { title:'二级医院数', field:'hos_lev2_num' ,align:'left', sortable: true},
            { title:'二甲医院数', field:'hos_lev2plus_num' ,align:'left', sortable: true},
            { title:'三级医院数', field:'hos_lev3_num' ,align:'center', sortable: false},
            { title:'三甲医院数', field:'hos_lev3plus_num' ,align:'center', sortable: false},
            { title:'主任医师数', field:'dep_zr_num' ,align:'center', sortable: false},
            { title:'副主任医师数', field:'dep_fzr_num' ,align:'center', sortable: false},
            { title:'主治医师数数', field:'dep_zz_num' ,align:'center', sortable: false},
            { title:'住院医师数', field:'dep_zy_num' ,align:'center', sortable: false},
            { title:'教授数', field:'dep_js_num' ,align:'center', sortable: false},
            { title:'副教授数', field:'dep_fjs_num' ,align:'center', sortable: false},
            { title:'有反馈患者数', field:'feedback_pat_num' ,align:'center', sortable: false},
            { title:'参与反馈医生数', field:'feedback_doc_num' ,align:'center', sortable: false},
            { title:'咨询患者数', field:'consult_pat_num' ,align:'center', sortable: false},
            { title:'参与咨询医生数', field:'consult_doc_num' ,align:'center', sortable: false}
        ]];

        var myview = $.extend({},$.fn.datagrid.defaults.view,{
            onAfterRender:function(target){
                $.fn.datagrid.defaults.view.onAfterRender.call(this,target);
                var opts = $(target).datagrid('options');
                var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
                vc.children('div.datagrid-empty').remove();
                if (!$(target).datagrid('getRows').length){
                    var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
                    d.css({
                        position:'absolute',
                        left:0,
                        top:50,
                        width:'95%',
                        textAlign:'center'
                    });
                }
            }
        });

        $('#province_list').datagrid({
            title:'全国医院信息统计列表',
            fit:true,
            //fitColumn:true,
            //width:850,
            height:350,
            singleSelect:true,
            loadMsg : '数据加载中，请稍后......',
            method: 'get',
            //url: '../jsonp/getProvinceDetailList.json',
            url: '../../medical/ProvinceDetailList',
            columns:cols,
            rownumbers:true,
            animate:true,
            view: myview,
            emptyMsg: '没有相关记录！',
            pagination:true,
            pageSize:10,
            onLoadSuccess: function (data) {
                if (data.rows.length != 0) {
                    //$('#hospital_table_list').datagrid("selectRow", 0);
                    //drawpie();
                }
            }
        })
            .datagrid('getPager').pagination({
            beforePageText: '第 ',//页数文本框前显示的汉字
            afterPageText: ' 页，共 {pages} 页',
            displayMsg: ''
        });

    }
});
