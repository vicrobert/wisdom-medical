$.ajax({
   // url:"hotIllnessFindController/selectYear",
    url:"../jsonp/selectYear.json",
    method: "GET",
    dataType:"json",
    async: false,
    success:function(data){
        $("#year").append("<option value=''>全部年</option>");
        $.each(data, function(key,val){
            $("#year").append("<option value='"+val.year+"'>"+val.year+"年</option>");
        });
    }
});
function changeMonth(){
    $("#month").empty();
    $.ajax({
        //url:"hotIllnessFindController/selectMonth",
        url:"../jsonp/selectMonth.json",
        method: "GET",
        //data: {'year': $("#year").val()},
        dataType:"json",
        async: false,
        success:function(data){
            $("#month").append("<option value='13'>全部月</option>");
            $.each(data, function(key,val){
                console.log(val)
                $("#month").append("<option value='"+val.month+"'>"+val.month+"月</option>");
            });
        }
    });
}
function selectChange(){
    var year = $("#year").val();
    if(year!=""){
        $("#month").show();
    }else{
        $("#month").hide();
    }
    require.config({
        paths: {
            echarts: '../echarts-2.2.7/src'
        }
    });
    require(
        [
            'echarts',
            'echarts/theme/custom',
            'echarts/chart/bar',
            'echarts/chart/line',
            'echarts/chart/pie'
        ],
        function (ec,theme) {
            var zrColor = require('zrender/tool/color');
            var colorList = [
                '#058FCD','#C00000','#F6881F','#4FC5FA','#A6CE39',
                '#FEC20E','#65D5B2','#97b552','#95706d','#dc69aa',
                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
                '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'
            ];
            var itemStyle = {
                normal: {
                    color: "#0a529c"
                }
            };
            function hdqsfx(){
                $("#a").showLoading();
                var showValue_line_cnt_ask=[];
                var showValue_line_cnt_answer=[];
                var showValue_time=[];
                var year = $("#year").val();
                var month = $("#month").val();
                var monthShowOrHide = $("#month").is(":hidden");
                var yearMonth="";
                if(month!=""){
//		            			if(month.length==1){
//		            				yearMonth =year+"-0"+month;
//		            			}else{
                    yearMonth =year+"-"+month;
//		            			}
                }
                $.ajax({
                    //url:"hotIllnessFindController/hotIllnessLine",
                    //url:"../jsonp/hotIllnessLine.json",
                	url: "../../medical/HotIllnessLine",
                    method: "GET",
                    data: {
                    	'year': year,
                    	'month': month,
                    	'monthShowOrHide': monthShowOrHide,
                    	"yearMonth":yearMonth
                    },
                    dataType:"json",
                    async: false,
                    success:function(data){
                        $.each(data, function(key,val){
                            showValue_line_cnt_ask.push(val.askNum);
                            showValue_line_cnt_answer.push(val.answerNum);
                            if(monthShowOrHide==true){
                                showValue_time.push(val.year);
                            }else if(monthShowOrHide==false){
                                if(month==""){
                                    showValue_time.push(val.month);
                                }else{
                                    showValue_time.push(val.askAt);
                                }
                            }
                        });
                        //默认最新一天的最热疾病top10
                        clickPutA_a(month,monthShowOrHide,showValue_time[showValue_time.length-1]);
                    }
                });

                var myCharta = ec.init(document.getElementById('a'),theme);
                var optiona = {
                    title : {
                        x: "center"
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter : function (params) {
                            var date = new Date(params.value[0]);
                            data = date.getFullYear()+"年";
                            return data + "<br/>"+params.seriesName+"："
                                + params.value[1];
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
                    dataZoom: {
                        show: true,
                        start : 0,//时间坐标开始位置,
                        y:195,
                        height:20,
                        // backgroundColor:'rgba(0,0,0,.05)',
                        fillerColor:'rgba(0, 166, 251,.15)',
                    },
                    legend : {
                        data : ['互动量（提问数+回答数）','提问数','回答数'],
                        textStyle:{
                            color:'#1b77cc'
                        }
                    },
                    grid: {
                        x: 65,
                        y: 35,
                        x2: 20,
                        y2: 70,
                        borderWidth: 0
                    },
                    xAxis : [
                        {
                            type : 'time',
                            splitNumber:10,
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
                            name: '互动量（提问数+回答数）',
                            type: 'line',
                            showAllSymbol: true,
                            symbol:'circle',
                            symbolSize: function (value){
                                return Math.round(value[2]/10) + 2;
                            },
                            data: (function () {
                                var d = [];
                                for (var i=0;i<showValue_time.length;i++){
                                    var date = new Date(showValue_time[i]);
                                    //y轴值  点面积
                                    d.push([date,showValue_line_cnt_ask[i]+showValue_line_cnt_answer[i],20]);
                                }
                                return d;
                            })()
                        },
                        {
                            name: '提问数',
                            type: 'line',
                            showAllSymbol: true,
                            symbol:'circle',
                            symbolSize: function (value){
                                return Math.round(value[2]/10) + 2;
                            },
                            data: (function () {
                                var d = [];
                                for (var i=0;i<showValue_time.length;i++){
                                    var date = new Date(showValue_time[i]);
                                    //y轴值  点面积
                                    d.push([date,showValue_line_cnt_ask[i],20]);
                                }
                                return d;
                            })()
                        },
                        {
                            name: '回答数',
                            type: 'line',
                            showAllSymbol: true,
                            symbol:'circle',
                            symbolSize: function (value){
                                return Math.round(value[2]/10) + 2;
                            },
                            data: (function () {
                                var d = [];
                                for (var i=0;i<showValue_time.length;i++){
                                    var date = new Date(showValue_time[i]);
                                    //y轴值  点面积
                                    d.push([date,showValue_line_cnt_answer[i],20]);
                                }
                                return d;
                            })()
                        }
                    ]
                };
                myCharta.setOption(optiona);
                var ecConfig = require('echarts/config');
                function click(param) {
                    //console.log(param);
                    var date = new Date(param.name);
                    var yearlog = date.getFullYear();
                    var monthlog = (date.getMonth()+1)+"";
                    var daylog = date.getDate()+"";
                    var ymd="";
                    if(monthlog.length==1){
                        monthlog ="0"+monthlog;
                    }
                    if(daylog.length==1){
                        daylog ="0"+daylog;
                    }
                    ymd=yearlog+"-"+monthlog+"-"+daylog;
                    if(month==""){
                        ymd=yearlog+"-"+monthlog;
                    }
                    if(monthShowOrHide){
                        ymd=yearlog;
                    }
                    clickPutA_a(month,monthShowOrHide,ymd);
                }
                myCharta.on(ecConfig.EVENT.CLICK, click);
                $("#a").hideLoading();
            }
            hdqsfx();
            function clickPutA_a(month,monthShowOrHide,date){
                $("#a_a").showLoading();
                var showName = [];
                var showValue = [];
                $.ajax({
                    //url:"hotIllnessFindController/hotDiseaseTopTenByDate",
                    //url:"../jsonp/hotDiseaseTopTenByDate.json",
                	url: "../../medical/HotDiseaseRankByDate",
                    method: "GET",
                    data: {
                    	"month":month,
                    	"monthShowOrHide":monthShowOrHide,
                    	"date":date
                    },
                    dataType:"json",
                    async: false,
                    success:function(data){
                        $.each(data, function(key,val){
                            showName.push(val.diseaseName);
                            showValue.push(val.askNum);
                        });
                    }
                });
                var myCharta_a = ec.init(document.getElementById('a_a'),theme);
                var optiona_a = {
                    title : {
                        text: date,
                        textStyle:{
                            fontSize:15,
                            color:'#47cdfe'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: function(params) {
                            var color = '#1b77cc';
                            var res = '<div style="color:' + color + '">';
                            res += '<strong>' + params[0].name + '</strong>';
                            for (var i = 0, l = params.length; i < l; i++) {
                                res += '<br/>关注量 : ' + params[i].value;
                            }
                            res += '</div>';
                            return res;
                        }
                    },
                    legend: {
                        show:false,
                        x: 'right',
                        data:['热门疾病TOP15']
                    },
                    /**toolbox: {
                                        show: true,
                                        orient: 'vertical',
                                        y: 'center',
                                        feature: {
                                            mark: {show: true},
                                            dataView: {show: true, readOnly: false},
                                            restore: {show: true},
                                            saveAsImage: {show: true}
                                        }
                                    },**/
                    calculable: true,
                    grid: {
                        x: 40,
                        y: 35,
                        x2: 20,
                        y2: 60,
                        borderWidth: 0
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: showName,
                            axisLine:{
                                lineStyle:{
                                    width:1,
                                }
                            },
                            axisLabel:{
                                interval:0,
                                formatter:function(value){  
                                    return value.split("").join("\n");  
                                },
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
                    yAxis: [
                        {
                            type: 'value',
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
                            splitArea:{show:true,
                                areaStyle:{
                                    color:['rgba(0,0,0,0.15)','transparent']
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: '热门疾病TOP15',
                            type: 'bar',
                            itemStyle: itemStyle,
                            data: showValue,
                            barWidth:20
                        }
                    ]
                };
                myCharta_a.setOption(optiona_a);
                $("#a_a").hideLoading();
            }
        }

    );
}
require.config({
    paths: {
        echarts: '../echarts-2.2.7/src'
    }
});
require(
    [
        'echarts',
        'echarts/theme/custom',
        'echarts/chart/bar',
        'echarts/chart/line',
        'echarts/chart/pie',
        'echarts/chart/chord',
        'echarts/chart/map',
        'echarts/chart/force',
        'echarts/chart/funnel',
        'echarts/chart/scatter'
    ],
    function (ec,theme) {
        var zrColor = require('zrender/tool/color');
        var colorList = [
            '#058FCD','#C00000','#F6881F','#4FC5FA','#A6CE39',
            '#FEC20E','#65D5B2','#97b552','#95706d','#dc69aa',
            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0',
            '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
            '#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed'
        ];
        var itemStyle = {
            normal: {
                color: '#0a529c'
            }
        };
        function hdqsfx(){
            $("#a").showLoading();
//	            		var showName=[];
//	            		showName.push("提问数");
//	            		showName.push("回答数");
            //showName.push("互动总数");
//	            		var showValue_hotIllnessFromMessage=[];
            var showValue_line_cnt_ask=[];
            var showValue_line_cnt_answer=[];
            var showValue_time=[];
//	            		$.ajax({
//	            			url:"hotIllnessFindController/hotIllnessFromMessage",
//	            			method: "GET",
//	            			dataType:"json",
//	            			async: false,
//	            			success:function(data){
//	            				$.each(data, function(key,val){
////	            					showName.push(val.src);
//	            					showValue_hotIllnessFromMessage.push("{name: \""+val.src+"\", value: "+val.hdhum+"}");
//	            				});
//	            			}
//	            		});
            var year = $("#year").val();
            var month = $("#month").val();
            var monthShowOrHide = $("#month").is(":hidden");
            $.ajax({
              //  url:"hotIllnessFindController/hotIllnessLine",
                //url:"../jsonp/hotIllnessLine.json",
            	url: "../../medical/HotIllnessLine",
                method: "GET",
                data: {
                	'year': year,
                	'month': month,
                	'monthShowOrHide': monthShowOrHide
                },
                dataType:"json",
                async: false,
                success:function(data){
                    $.each(data, function(key,val){
                        showValue_line_cnt_ask.push(val.askNum);
                        showValue_line_cnt_answer.push(val.answerNum);
                        showValue_time.push(val.year);
                    });
                    //默认最新一天的最热疾病top10
                    clickPutA_a(showValue_time[showValue_time.length-1],monthShowOrHide);
                }
            });
            var myCharta = ec.init(document.getElementById('a'),theme);
            var optiona = {
                title : {
                    x: "center"
                },
                tooltip : {
                    trigger: 'item',
                    formatter : function (params) {
                        var date = new Date(params.value[0]);
                        data = date.getFullYear()+"年";
                        return data + "<br/>"+params.seriesName+"："
                            + params.value[1];
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
                dataZoom: {
                    show: true,
                    start : 0,//时间坐标开始位置,
                    y:195,
                    height:20,
                    // backgroundColor:'rgba(0,0,0,.05)',
                    fillerColor:'rgba(0, 166, 251,.15)',
                },
                legend : {
                    data : ['互动量（提问数+回答数）','提问数','回答数'],
                    textStyle:{
                        color:'#1b77cc'
                    }
                },
                grid: {
                    x: 65,
                    y: 35,
                    x2: 20,
                    y2: 70,
                    borderWidth: 0
                },
                xAxis : [
                    {
                        type : 'time',
                        splitNumber:10,
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
                        name: '互动量（提问数+回答数）',
                        type: 'line',
                        showAllSymbol: true,
                        symbol:'circle',
                        symbolSize: function (value){
                            return Math.round(value[2]/10) + 2;
                        },
                        data: (function () {
                            var d = [];
                            for (var i=0;i<showValue_time.length;i++){
                                var date = new Date(showValue_time[i]);
                                //y轴值  点面积
                                d.push([date,showValue_line_cnt_ask[i]+showValue_line_cnt_answer[i],20]);
                            }
                            return d;
                        })()
                    },
                    {
                        name: '提问数',
                        type: 'line',
                        showAllSymbol: true,
                        symbol:'circle',
                        symbolSize: function (value){
                            return Math.round(value[2]/10) + 2;
                        },
                        data: (function () {
                            var d = [];
                            for (var i=0;i<showValue_time.length;i++){
                                var date = new Date(showValue_time[i]);
                                //y轴值  点面积
                                d.push([date,showValue_line_cnt_ask[i],20]);
                            }
                            return d;
                        })()
                    },
                    {
                        name: '回答数',
                        type: 'line',
                        showAllSymbol: true,
                        symbol:'circle',
                        symbolSize: function (value){
                            return Math.round(value[2]/10) + 2;
                        },
                        data: (function () {
                            var d = [];
                            for (var i=0;i<showValue_time.length;i++){
                                var date = new Date(showValue_time[i]);
                                //y轴值  点面积
                                d.push([date,showValue_line_cnt_answer[i],20]);
                            }
                            return d;
                        })()
                    }
                ]
            };
            myCharta.setOption(optiona);
            var ecConfig = require('echarts/config');
            function click(param) {
                //console.log(param);
                var d = param.name;
                clickPutA_a(d.getFullYear(),monthShowOrHide);
            }
            myCharta.on(ecConfig.EVENT.CLICK, click);

            /**var myChartd = ec.init(document.getElementById('d'));
             var optiond = {
	            				tooltip : {
	            					trigger: 'axis'
	            				},
	            				calculable : true,
	            				legend: {
	            					data:showName//['提问数','回答数','互动总数','流行感冒','病毒','感染','健康网','好大夫在线','医疗网','其他']
	            				},
	            				xAxis : [
	            				         {
	            				        	 type : 'category',
	            				        	 splitLine : {show : false},
	            				        	 data : showValue_time//['2014-9','2014-10','2014-11','2014-12','2015-1','2015-2','2015-3']
	            				         }
	            				         ],
	            				         yAxis : [
	            				                  {
	            				                	  type : 'value',
	            				                	  position: 'right'
	            				                  }
	            				                  ],
	            				                  series : [
	                            {
	                            	name:'提问数',
	                            	type:'line',
	                            	data:showValue_line_cnt_ask//[862, 1018, 964, 1026, 1679, 1600, 1570]
	                            },
	                            {
	                            	name:'回答数',
	                            	type:'line',
	                            	data:showValue_line_cnt_answer//[762, 918, 664, 426, 1279, 1700, 1670]
	                            },
	                            {
	                            	name:'数据来源占比',
	                            	type:'pie',
	                            	tooltip : {
	                            		trigger: 'item',
	                            		formatter: '{a} <br/>{b} : {c} ({d}%)'
	                            	},
	                            	center: [110,90],
	                            	radius : [0, 20],
	                            	data:eval("([" + showValue_hotIllnessFromMessage + "])")
	                            }
	                            ]
	            		};
             myChartd.setOption(optiond);**/
            $("#a").hideLoading();
        }
        hdqsfx();
        function clickPutA_a(date,monthShowOrHide){
            $("#a_a").showLoading();
            var showName = [];
            var showValue = [];
            $.ajax({
               // url:"hotIllnessFindController/hotDiseaseTopTenByDate",
                //url:"../jsonp/hotDiseaseTopTenByDate.json",
            	url: "../../medical/HotDiseaseRankByDate",
                method: "GET",
                data: {
                	'date': date,
                	"monthShowOrHide":monthShowOrHide
                },
                dataType:"json",
                async: false,
                success:function(data){
                    $.each(data, function(key,val){
                        showName.push(val.diseaseName);
                        showValue.push(val.askNum);
                    });
                }
            });
            var myCharta_a = ec.init(document.getElementById('a_a'),theme);
            var optiona_a = {
                title : {
                    text: date,
                    textStyle:{
                        fontSize:15,
                        color:'#47cdfe'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function(params) {
                        var color = '#1b77cc';
                        var res = '<div style="color:' + color + '">';
                        res += '<strong>' + params[0].name + '</strong>';
                        for (var i = 0, l = params.length; i < l; i++) {
                            res += '<br/>关注量 : ' + params[i].value;
                        }
                        res += '</div>';
                        return res;
                    }
                },
                legend: {
                    show:false,
                    x: 'right',
                    data:['热门疾病TOP15']
                },
                /**toolbox: {
	                				show: true,
	                				orient: 'vertical',
	                				y: 'center',
	                				feature: {
	                					mark: {show: true},
	                					dataView: {show: true, readOnly: false},
	                					restore: {show: true},
	                					saveAsImage: {show: true}
	                				}
	                			},**/
                calculable: true,
                grid: {
                    x: 40,
                    y: 35,
                    x2: 20,
                    y2: 60,
                    borderWidth: 0
                },
                xAxis: [
                    {
                        type: 'category',
                        data: showName,
                        axisLine:{
                            lineStyle:{
                                width:1,
                            }
                        },
                        axisLabel:{
                            interval:0,
                            formatter:function(value){  
                                return value.split("").join("\n");  
                            },
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
                yAxis: [
                    {
                        type: 'value',
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
                        splitArea:{show:true,
                            areaStyle:{
                                color:['rgba(0,0,0,0.15)','transparent']
                            }
                        },
                    }
                ],
                series: [
                    {
                        name: '热门疾病TOP15',
                        type: 'bar',
                        itemStyle: itemStyle,
                        data: showValue,
                        barWidth:20
                    }
                ]
            };
            myCharta_a.setOption(optiona_a);
            $("#a_a").hideLoading();
        }
        /***********************************************************************************************************************************/
        $("#b").showLoading();
        var showName = [];
        var showValue = [];
        $.ajax({
            //url:"hotIllnessFindController/hotPdepartment",
            //url:"../jsonp/hotPdepartment.json",
        	url: "../../medical/HotDepartments",
            method: "GET",
            //data: {'doctor_name': d.name,'section_name': d.section_name,'hospital_name': d.hospital},
            dataType:"json",
            async: false,
            success:function(data){//eval("(["+showValue+"])")
            	if (data != undefined && data.rows != null) {
	                $.each(data.rows, function(key,val){
	                	if (val.departmentName != undefined) {
	                		showName.push(val.departmentName);
	                	} else {
	                		showName.push('未知部门');
	                	}
	                    showValue.push(val.faqNum);
	                });
            	}
            }
        });
        //alert(showName);alert(showValue);
        var myChartb = ec.init(document.getElementById('b'),theme);
        var optionb = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255,255,255,0.7)',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function(params) {
                    // for text color
                    var color = '#1b77cc';
                    var res = '<div style="color:' + color + '">';
                    res += '<strong>' + params[0].name + '互动（次）</strong>';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '<br/>' + params[i].seriesName + ' : ' + params[i].value;
                    }
                    res += '</div>';
                    return res;
                }
            },
            legend: {
                show:false,
                x: 'right',
                data:['热门科室TOP10']
            },
            /**toolbox: {
                				show: true,
                				orient: 'vertical',
                				y: 'center',
                				feature: {
                					mark: {show: true},
                					dataView: {show: true, readOnly: false},
                					restore: {show: true},
                					saveAsImage: {show: true}
                				}
                			},**/
            calculable: true,
            grid: {
                x: 55,
                y: 10,
                x2: 0,
                y2: 25,
                borderWidth: 0
            },
            xAxis: [
                {
                    type: 'category',
                    data: showName,
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
            yAxis: [
                {
                    type: 'value',
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
                    splitArea:{show:true,
                        areaStyle:{
                            color:['rgba(0,0,0,0.15)','transparent']
                        }
                    },
                }
            ],
            series: [
                {
                    name: '热门科室TOP10',
                    type: 'bar',
                    itemStyle: itemStyle,
                    data: showValue,
                    barWidth:15
                }
            ]
        };
        myChartb.setOption(optionb);
        $("#b").hideLoading();
        /***********************************************************************************************************************************/
        $("#c").showLoading();
        var showDisease = [];
        var showAsk = [];
        $.ajax({
            //url:"hotIllnessFindController/hotDiseaseTopTen",
            //url:"../jsonp/hotDiseaseTopTen.json",
        	url: "../../medical/MapCityTop10Disease",
            // url:"../jsonp/hotPdepartment.json",
            method: "GET",
//            data: {
//            	'doctor_name': d.name,
//            	'section_name': d.section_name,
//            	'hospital_name': d.hospital
//            },
            dataType:"json",
            async: false,
            success:function(data){//eval("(["+showValue+"])")
                $.each(data, function(key,val){
                    showDisease.push(val.diseaseName);
                    showAsk.push(val.askNum);
                });
            }
        });
        var myChartc = ec.init(document.getElementById('c'),theme);
        var optionc = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255,255,255,0.7)',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function(params) {
                    // for text color
                    var color = '#1b77cc';
                    var res = '<div style="color:' + color + '">';
                    res += '<strong>' + params[0].name + '</strong>';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '<br/>关注量 : ' + params[i].value;
                    }
                    res += '</div>';
                    return res;
                }
            },
            legend: {
                show:false,
                x: 'right',
                data:['热门疾病TOP10']
            },
            /**toolbox: {
	                	        show: true,
	                	        orient: 'vertical',
	                	        y: 'center',
	                	        feature: {
	                	            mark: {show: true},
	                	            dataView: {show: true, readOnly: false},
	                	            restore: {show: true},
	                	            saveAsImage: {show: true}
	                	        }
	                	    },**/
            calculable: true,
            grid: {
                x: 55,
                y: 10,
                x2: 0,
                y2: 25,
                borderWidth: 0
            },
            xAxis: [
                {
                    type: 'category',
                    data: showDisease,
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
            yAxis: [
                {
                    type: 'value',
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
                    splitArea:{show:true,
                        areaStyle:{
                            color:['rgba(0,0,0,0.15)','transparent']
                        }
                    },
                }
            ],
            series: [
                {
                    name: '热门疾病TOP10',
                    type: 'bar',
                    itemStyle: itemStyle,
                    data: showAsk,
                    barWidth:15
                }
            ]
        };
        myChartc.setOption(optionc);
        $("#c").hideLoading();



        var nameE=[];
        var valueE=[];
        var timeE=[];
        $.ajax({
           // url:"hotIllnessFindController/selectAboutSrc",
            url:"../jsonp/selectAboutSrc.json",
            method: "GET",
            dataType:"json",
            async: false,
            success:function(data){
                $.each(data, function(key,val){
                    nameE.push(val.src);
                    valueE.push(val.hdl);
                    timeE.push(val.date);
                });
                //nameE.replace("hdf","好大夫在线");
                /**var n = {},r=[]; //n为hash表，r为临时数组
                 for(var i = 0; i < this.length; i++) //遍历当前数组
                 {
                     if (!n[this[i]]) //如果hash表中没有当前项
                     {
                         n[this[i]] = true; //存入hash表
                         r.push(this[i]); //把当前数组的当前项push到临时数组里面
                     }
                 }**/
            }
        });
        /**var myCharte = ec.init(document.getElementById('e'));
         var optione = {
            				tooltip : {
            					trigger: 'axis'
            				},
            				calculable : true,
            				legend: {
            					data:['好大夫在线']
            				},
            				xAxis : [
            				         {
            				        	 type : 'category',
            				        	 splitLine : {show : false},
            				        	 data : timeE//['2014-9','2014-10','2014-11','2014-12','2015-1','2015-2','2015-3']
            				         }
            				         ],
            				         yAxis : [
	    				                  {
	    				                	  type : 'value',
	    				                	  position: 'right'
	    				                  }
	    				                  ],
	    				                  series : [
				                          {
				                            	name:'好大夫在线',
				                            	type:'line',
				                            	data:valueE//[862, 1018, 964, 1026, 1679, 1600, 1570]
				                           }
					                  ]
            		};
         myCharte.setOption(optione);**/




        /** MAP MAP MAP **/
        //城市，互动量（提问数+回答数）    最小值，最大值（用于提示圈）
        $("#map").showLoading();
        var valData=[];//值
        var valgeoCoord={};//坐标
        var valcorona=[];//提示圈
        var big;

//	                var price=[];//值
//	                price.push("{name: \"上海\", value: 9}");
//	                price.push("{name: \"北京\", value: 20}");
//
//	                var coordinate={};//坐标
//	                var lnglat=[];
//	                lnglat.push(121.15);
//	                lnglat.push(31.89);
//	                coordinate['上海']=lnglat;
//	                var lnglat2=[];
//	                lnglat2.push(116.395645);
//	                lnglat2.push(39.929985);
//	                coordinate["北京"]=lnglat2;
//
//	                var corona=[];//提示圈   value 0-500
//	                corona.push("{name: \"北京\", value: 190}");

        /*
         * 增加时间区间
         * by YangJunbo
         */
        $.ajax({
            //url:"hotIllnessFindController/map",
            //url:"../jsonp/map.json",
        	url: "../../medical/HotDiseaseOnMap",
            method: "GET",
//            data: {
//            	'year': now.getYear(),
//            	'month': now.getMonth()
//            	//'monthShowOrHide': monthShowOrHide,
//            	//"yearMonth":yearMonth
//            },
            dataType:"json",
            async: false,
            success:function(data){
                $.each(data.list, function(key,val){
                    valData.push("{name: \""+val.city+"\", value: "+val.faqNum+"}");
                    var lnglat=[];
                    lnglat.push(val.lng);
                    lnglat.push(val.lat);
                    var name = val.city;
                    valgeoCoord[name]=lnglat;
                    if(key>data.size-11){
                        valcorona.push("{name: \""+val.city+"\", value: "+val.faqNum+"}");
                    }
                    if(key==data.size-1){
                        clickMap_a(val.city,"");
                    }
                });
                big=data.big;
            }
        });

        var mapChart = ec.init(document.getElementById('map'),theme);
        var mapOption = {
            tooltip : {
                trigger: 'item',
                formatter: function(params) {
                    var res = "<div>";
                    if(params[0]==""){
                        res += "<strong>"+params[1]+"</strong>";
                    }else{
                        res += "<strong>"+params[1];
                        res += "<br>";
                        res += "互动量：</strong>"+params[2];
                    }
                    res += "</div>";
                    return res;
                }
            },
            legend: {
                show:false,
                orient: 'vertical',
                x:'left',
                data:['互动量']
            },
            dataRange: {//这个与提示圈颜色相关
                x:20,
                y:220,
                min : 0,//最低评分
                max : big,//最高评分
                calculable : true,
                textStyle:{
                    color:'#1c7dd6'
                },
                color: ['maroon','purple','red','orange','yellow','lightgreen']
            },
            series : [
                {//提示圈
                    name: 'Top5',
                    type: 'map',
                    mapType: 'china',
                    data:[],
                    mapLocation:{
                        x: 80
                    },
                    markPoint : {
                        symbol:'emptyCircle',
                        symbolSize : function (v){
                            return 10 + v/100000;//根据值来设置相对大小
                        },
                        effect : {
                            show: true,
                            shadowBlur : 0
                        },
                        itemStyle:{
                            normal:{
                                label:{show:false}
                            }
                        },
                        data : eval("["+valcorona+"]")
                    },
                    itemStyle:{
                        normal:{
                            borderColor:'rgba(255,255,255,0.1)',//213
                            borderWidth:0.5,
                            areaStyle:{
                                color: '#083361'
                            }
                        }
                    }
                },
                {
                    name: '互动量',
                    type: 'map',
                    mapType: 'china',
                    hoverable: false,
                    roam:false,
                    data : [],
                    markPoint : {
                        symbolSize: 5,//标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                        itemStyle: {
                            normal: {
                                borderColor: '#87cefa',
                                borderWidth: 1,//标注边线线宽，单位px，默认为1
                                label: {
                                    show: false
                                }
                            },
                            emphasis: {
                                borderColor: '#1e90ff',
                                borderWidth: 5,
                                label: {
                                    show: false
                                }
                            }
                        },
                        data : eval("["+valData+"]")//值
                    },
                    geoCoord: valgeoCoord//坐标
                }
            ]
        };
        mapChart.setOption(mapOption);
        $("#map").hideLoading();
        var ecConfigMap = require('echarts/config');
        function clickMap(param) {
            if(param.seriesName=="互动量"){
                clickMap_a(param.name,"");
            }
            if(param.seriesName==""){
                //console.log(param);
                clickMap_a("",param.name);
            }
        }
        mapChart.on(ecConfigMap.EVENT.CLICK, clickMap);
        function clickMap_a(city,province){
            $("#map_a").showLoading();
            var textShow = city+""+province;
            var showName = [];
            var showValue = [];
            $.ajax({
                //url:"hotIllnessFindController/mapCityTopIllness",
                //url:"../jsonp/mapCityTopIllness.json",
            	url: "../../medical/MapCityTop25Disease",
                method: "GET",
                data: {
                	'city': city,
                	'province':province
                },
                dataType:"json",
                async: false,
                success:function(data){
                    $.each(data, function(key,val){
                        showName.push(val.diseaseName);
                        showValue.push(val.askNum);
                    });
                }
            });
            var myChartmap_a = ec.init(document.getElementById('map_a'),theme);
            var optionmap_a = {
                title : {
                    text: textShow
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function(params) {
                        var color = '#1b77cc';
                        var res = '<div style="color:' + color + '">';
                        res += '<strong>' + params[0].name + '</strong>';
                        for (var i = 0, l = params.length; i < l; i++) {
                            res += '<br/>关注量 : ' + params[i].value;
                        }
                        res += '</div>';
                        return res;
                    }
                },
                legend: {
                    show:false,
                    x: 'right',
                    data:['热门疾病TOP25']
                },
                /**toolbox: {
	                				show: true,
	                				orient: 'vertical',
	                				y: 'center',
	                				feature: {
	                					mark: {show: true},
	                					dataView: {show: true, readOnly: false},
	                					restore: {show: true},
	                					saveAsImage: {show: true}
	                				}
	                			},**/
                calculable: true,
                grid: {
                    x: 40,
                    y: 45,
                    x2: 20,
                    y2: 30,
                    borderWidth: 0
                },
                xAxis: [
                    {
                        type: 'category',
                        data: showName,
                        axisLabel:{
                            margin:1,
                            textStyle:{
                                color:"#165fa9"
                            }
                        },
                        splitLine:{
                            show:true,
                            onGap:true,
                            lineStyle:{
                                color:'#0a224a'
                            }
                        },
                        splitArea:{
                            show:false
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
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
                        splitArea:{show:true,
                            areaStyle:{
                                color:['rgba(0,0,0,0.15)','transparent']
                            }
                        },
                    }
                ],
                series: [
                    {
                        name: '热门疾病TOP25',
                        type: 'bar',
                        itemStyle: itemStyle,
                        data: showValue,
                        barWidth:12
                    }
                ]
            };
            myChartmap_a.setOption(optionmap_a);
            $("#map_a").hideLoading();
        }
    }
);
