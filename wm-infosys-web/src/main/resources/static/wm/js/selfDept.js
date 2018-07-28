$(document).ready(function() {
    $("body").showLoading();
    var selfSelectDep = null;
    var currentSelectDep;
    var selfSelectPos;
    $("#selectSelfHospital").autocomplete({
        source: function(request, response) {
/*
            $.getJSON("http://110.185.210.151:8012/medapp/deptController/getAutoCompleteFieldsByHospital?jsoncallback=?", { hospital_name: request.term }, function(json) {

                alert(json);
                //alert(json[0].items[0]._name);
            });*/

            $.ajax({
                url: "../jsonp/json_one.json",
                dataType: "json",
                data: {
                    hospital_name: request.term
                },
                success: function(data) {
                    response($.map(data.autoCompletedFields, function(item) {
                        return {
                            label: item.name,
                            value: item.name
                        }
                    }));
                }
            });
        },
        minLength: 0,
        autoFill: true,
        select: function(event, ui) {
            drawSelfDeptCircle(ui.item.value);
            drawOtherSelfCharts(ui.item.value);
            updateHospitalNews(ui.item.value);
            init(ui.item.label);
        }
    });

    var cur_position;
    var selfDeptStructureChart;
    var selfDeptPositionPercentChart;
    var selfDeptPositionPercentDetailChart;
    var selfHosScoreInfoChart;
    var selfDeptStructureChartDom = document.getElementById('selfDeptStructureChart');
    var selfDeptPositionPercentChartDom = document.getElementById('selfDeptPositionPercentChart');
    var selfDeptPositionPercentDetailChartDom = document.getElementById('selfDeptPositionPercentDetailChart');
    var selfHosScoreInfoChartDom = document.getElementById('hosScoreInfo');
    drawSelfDeptCircle($('#selectSelfHospital').val());
    init($('#selectSelfHospital').val());
    drawOtherSelfCharts($('#selectSelfHospital').val());
    $("body").hideLoading();

    function updateHospitalNews(hospital_name) {
        $.ajax({
            //url: "../jsonp/json_two.json",
        	url: "../../medical/hospitalSentiments",
            method: "GET",
            data: {
                'hospitalName': encodeURI(hospital_name),
                'rows': 8
            },
            dataType: "json",
            async: false,
            success: function(data) {
                $('#hosDetailInfo').empty();
                $.each(data.newsList, function(i, val) {

                    if (i > 7) {

                        return;
                    }

                    $('#hosDetailInfo').append("<li class='x-info'><span class='numb"+(i+1)+"'>"+(i+1)+"</span><a target='_blank' href='" + val.sourceUrl + "' title='"+val.title+"'>" + val.title + "</a></li>");
                });
            },
            error: function() {
                result = "暂无详细信息！";
            }
        });
    }

    function init(hospital_name) {

        var result,
            items = [],
            $li = $('<li>');
        
        $.ajax({
//            url: "../jsonp/json_three.json",
        	url: "../../medical/HospIntroduction",
            method: "GET",
            data: {
                'hospitalName': encodeURI(hospital_name)
            },
            dataType: "json",
            async: false,
            success: function(data) {
            	if (data != undefined) {
	                var score = '★★★★★'.substring(0, (data.score));
	                score += '☆☆☆☆☆'.substring(0, (5 - data.score));
	                var x = score.split('').map((val,i)=>{
	                    return val = val+" ";
	                });
	                score = x.join('')
	                $li.html((data.province || '地区未知') + ' ' + (data.hospitalClass || "等级未知") + ' <b>' + (score || '暂无评分') + '</b>')
	                items.push($li.clone().addClass('x-title'));
	
	                $li.html('<span><img src="../images/department_icon.png"/></span><i class="x-departs">' + (data.departmentNum || '未知') + '</i> 个科室共 <i class="x-person">' + (data.doctorNum || '未知') + '</i> 人')
	                items.push($li.clone().addClass('x-department'));
	
	                $li.html(data.address);
	                items.push($li.clone().addClass('x-content') || '');
	
	                result = items;
            	} else {
            		result = ""
            	}
            },
            error: function() {
                result = "";
            }
        });

        if (result != "") {
	        $('#detailInfo').html(result);
	        updateHospitalNews(hospital_name);
        }

    }

    function updateTable(d) {
        var result,
            items = [],
            $li = $('<li>');
        if (d.id != null && d.id.substring(0, 2) == "D_") {

            $.ajax({
                url: "deptController/getDoctorById",
                method: "GET",
                data: {
                    'doctor_id': d.id.substring(3)
                },
                dataType: "json",
                async: false,
                success: function(data) {

                    var score = '★★★★★'.substring(0, (data.score));
                    score += '☆☆☆☆☆'.substring(0, (5 - data.score));

                    $li.html(score || '暂无评分');
                    items.push($li.clone());

                    $li.html((data.position || '职称未知') + ' <b>' + (d.name || "姓名未知") + '</b> ' + (data.sex || '性别未知'));
                    items.push($li.clone());

                    $li.html('<i>' + (data.age || '未知') + '</i> 岁 从诊 <i>' + (data.diagnosis_time || '未知') + '</i> 年出诊 <i>' + (data.outpatient_num || '未知') + '</i> 次');
                    items.push($li.clone());

                    $li.html('擅长诊疗' + (data.good || '未知'));
                    items.push($li.clone());

                    result = items;
                },
                error: function() {

                    result = "暂无详细信息";
                }
            });
        } else if (d.parent) {

            $li.html('<b>' + (d.name || "科室未知") + '</b>');
            items.push($li.clone().addClass('x-departname'));

            $li.html('擅长诊疗' + (d.dept_gooddisease || '未知'));
            items.push($li.clone().addClass('x-diagnosis'));

            $li.html('投入资源' + (parseInt(d.resource) || '未知'));
            items.push($li.clone().addClass('x-resource'));

            result = items;
        } else {

            $.ajax({
                url: "../jsonp/json_byname.json",
                method: "GET",
                /*data: {
                    'hospital_name': d.name
                },*/
                dataType: "json",
                async: false,
                success: function(data) {
                    var score = '★★★★★'.substring(0, (data.score));
                    score += '☆☆☆☆☆'.substring(0, (5 - data.score));
                    var x = score.split('').map((val,i)=>{
                        return val = val+" ";
                    });
                    score = x.join('');

                    $li.html((data.area || '地区未知') + (data.level || "等级未知") + ' <b>' + (score || '暂无评分') + '</b>') 
                    items.push($li.clone().addClass('x-title'));
    
                    $li.html('<span><img src="../images/department_icon.png"/></span><i class="x-departs">' + (data.dept_num || '未知') + '</i> 个科室共 <i class="x-person">' + (data.doc_num || '未知') + '</i> 人')
                    items.push($li.clone().addClass('x-department'));
    
                    $li.html(data.address);
                    items.push($li.clone().addClass('x-content') || '');
    
                    result = items;
                },
                error: function() {
                    result = "暂无详细信息！";
                }
            });
        }
        $('#detailInfo').html(result);
    }

    function drawSelfDeptCircle(hospital_name) {
        $('#deptCircle').empty();
        var divwidth = $("#deptCircle").width() * 0.6;
        var margin = 0,
            diameter = divwidth != null ? divwidth : 500;

        var color = d3.scale.linear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);

        var pack = d3.layout.pack()
            .padding(2)
            .size([diameter - margin, diameter - margin])
            .value(function(d) {
                return d.doctorNum;
            })

        var svg = d3.select("#deptCircle").append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("style", 'margin-left:100px;margin-top:28px')
            .append("g")
            .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        d3.json("../../medical/DecisionSupportSection.action", function(error, root) {
            if (error) return console.error(error);

            var focus = root,
                nodes = pack.nodes(root),
                view;

            var circle = svg.selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("class", function(d) {
                    return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
                })
                .style("fill", function(d) {
                    return d.children ? color(d.depth) : null;
                })

                .on("click", function(d) {
                    updateTable(d);
                    if (d.parent) {
                        $('#current_department1').html(d.name);
                        $('#current_department2').html(d.name);
                        $('#current_department3').html(d.name);
                    }
                    else
                    {
                        $('#current_department1').html("医院");
                        $('#current_department2').html("医院");
                        $('#current_department3').html("医院");
                    }
                    if(d.children){
                        selfSelectDep = d.id;
                        currentSelectDep = null;
                    }
                    else
                    {
                        currentSelectDep = d.id;
                    }
                    refreshCharts(hospital_name, d.id);


                    if (focus !== d) zoom(d), d3.event.stopPropagation();
                });

            var text = svg.selectAll("text")
                .data(nodes)
                .enter().append("text")
                .attr("class", "label")
                .style("fill-opacity", function(d) {
                    //return d.parent === root ? 1 : 0;
                	return 1;
                })
                .style("display", function(d) {
                    //return d.parent === root ? null : "none";
                	return null;
                })
                .text(function(d) {
                	var labelTxt = "";
                	if (d != undefined) {
                		if (d.name != undefined) {
                			labelTxt = d.name;
                		}
                		if (d.doctorNum != undefined) {
                			labelTxt += "(" + d.doctorNum + ")";
                		}
                	}
                    return labelTxt;
                });

            var node = svg.selectAll("circle,text");

            d3.select("body")
                .on("click", function() {
                    zoom(root);
                });

            zoomTo([root.x, root.y, root.r * 2 + margin]);

            function zoom(d) {
                if(typeof(d.children)=="undefined"){
                    return;
                }
                var focus0 = focus;
                focus = d;

                var transition = d3.transition()
                    .duration(d3.event.altKey ? 7500 : 750)
                    .tween("zoom", function(d) {
                        var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                        return function(t) {
                            zoomTo(i(t));
                        };
                    });

                transition.selectAll("text")
                    .filter(function(d) {
                        return d.parent === focus || this.style.display === "inline";
                    })
                    .style("fill-opacity", function(d) {
                        //return d.parent === focus ? 1 : 0;
                    	return 1;
                    })
                    .each("start", function(d) {
                        if (d.parent === focus) this.style.display = "inline";
                    })
                    .each("end", function(d) {
                        //if (d.parent !== focus) this.style.display = "none";
                    	this.style.display = null;
                    });
            }

            function zoomTo(v) {
                var k = diameter / v[2];
                view = v;
                node.attr("transform", function(d) {
                    return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
                });
                circle.attr("r", function(d) {
                    return d.r * k;
                });
            }
        });

        d3.select(self.frameElement).style("height", diameter + "px");
    };

    function drawOtherSelfCharts(hospital_name) {
        require.config({
            paths: {
                echarts: '../echarts-2.2.7/src'
            }
        });
        require(
            [
                'echarts',
                //'echarts/theme/custom',
                'echarts/theme/infographic',
                'echarts/chart/bar',
                'echarts/chart/line',
                'echarts/chart/pie',
                'echarts/chart/radar'
            ],

            function(ec, theme) {
                var selfDeptStructureChartOption = getSelfDeptStructureChartOption(hospital_name);
                selfDeptStructureChart = ec.init(selfDeptStructureChartDom, theme);
                selfDeptStructureChart.setOption(selfDeptStructureChartOption);
                window.onresize = selfDeptStructureChart.resize;
                //
                var selfHosScoreInfoChartOption = getSelfHosScoreInfoChartOption(hospital_name);
                selfHosScoreInfoChart = ec.init(selfHosScoreInfoChartDom, theme);
                selfHosScoreInfoChart.setOption(selfHosScoreInfoChartOption);
                window.onresize = selfHosScoreInfoChart.resize;
                //
                var selfDeptPositionPercentChartOption = getSelfDeptPositionPercentChartOption(hospital_name);
                selfDeptPositionPercentChart = ec.init(selfDeptPositionPercentChartDom, theme);
                selfDeptPositionPercentChart.setOption(selfDeptPositionPercentChartOption);
                window.onresize = selfDeptPositionPercentChart.resize;
                var ecConfig = require('echarts/config');
                updatePercentDetailChart(hospital_name, cur_position);
                $('#current_position').html(cur_position);
                selfDeptPositionPercentChart.on(ecConfig.EVENT.PIE_SELECTED, function(param) {
                    var selected = param.selected;
                    for (var idx in selected) {
                        var serie = selfDeptPositionPercentChartOption.series[idx];
                        for (var i = 0, l = serie.data.length; i < l; i++) {
                            if (selected[idx][i]) {
                                $('#current_position').html(serie.data[i].name);
                                updatePercentDetailChart(hospital_name, serie.data[i].name);
                            }
                        }
                    }
                })
            }
        );
    }

    function updatePercentDetailChart(hospital_name, doc_posn) {
        if (selfDeptPositionPercentDetailChart && selfDeptPositionPercentDetailChart.dispose) {
            selfDeptPositionPercentDetailChart.dispose();
        }

        require(['echarts', 'echarts/theme/infographic', 'echarts/chart/bar', 'echarts/chart/line', 'echarts/chart/pie'], function(ec, theme) {
            selfDeptPositionPercentDetailChart = ec.init(selfDeptPositionPercentDetailChartDom, theme);
        });
        window.onresize = selfDeptPositionPercentDetailChart.resize;
        var selfDeptPositionPercentDetailChartOption = getSelfDeptPositionPercentDetailChartOption(hospital_name, selfSelectDep, doc_posn,currentSelectDep);
        selfDeptPositionPercentDetailChart.setOption(selfDeptPositionPercentDetailChartOption, true);
        window.onresize = selfDeptPositionPercentDetailChart.resize;
    }


    function refreshCharts(hospital_name, dept_id) {
        if (selfDeptStructureChart && selfDeptStructureChart.dispose) {
            selfDeptStructureChart.dispose();
        }

        if (selfDeptPositionPercentChart && selfDeptPositionPercentChart.dispose) {
            selfDeptPositionPercentChart.dispose();
        }

        require(['echarts', 'echarts/theme/infographic', 'echarts/chart/bar', 'echarts/chart/line', 'echarts/chart/pie'], function(ec, theme) {
            selfDeptStructureChart = ec.init(selfDeptStructureChartDom, theme);
            selfDeptPositionPercentChart = ec.init(selfDeptPositionPercentChartDom, theme);
        });
        window.onresize = selfDeptStructureChart.resize;
        var selfDeptStructureChartOption = getSelfDeptStructureChartOption(hospital_name, dept_id);
        selfDeptStructureChart.setOption(selfDeptStructureChartOption, true);

        window.onresize = selfDeptPositionPercentChart.resize;
        var selfDeptPositionPercentChartOption = getSelfDeptPositionPercentChartOption(hospital_name, dept_id);
        selfDeptPositionPercentChart.setOption(selfDeptPositionPercentChartOption, true);
        var ecConfig = require('echarts/config');
        selfDeptPositionPercentChart.on(ecConfig.EVENT.PIE_SELECTED, function(param) {
            var selected = param.selected;
            for (var idx in selected) {
                var serie = selfDeptPositionPercentChartOption.series[idx];
                for (var i = 0, l = serie.data.length; i < l; i++) {
                    if (selected[idx][i]) {
                        $('#current_position').html(serie.data[i].name);
                        updatePercentDetailChart(hospital_name, serie.data[i].name);
                    }
                }
            }
        })
    }
    //主任医师分布
    function getSelfDeptStructureChartOption(hospital_name, pdept_id) {
        var xAxisArray = [];
        var legendArray = [];
        var dataArray = [];
        $.ajax({
            //url: "deptController/getDimDeptPositionPercentListByDept",
            //url: "../jsonp/getDimDeptPositionPercentListByDepthospital.json",
        	  url: "../../medical/DecisionSupportDeptStructureChart.action",
        	  method: "GET",
           data: {
                'hospitalName': encodeURI(hospital_name)/*,
                'pdepartment_id': pdept_id != null ? pdept_id : "0" */
            },
            dataType: "json",
            async: false,
            success: function(data) {
                xAxisArray = data.deptSet;
                if (data.dimBarList != null) {
                    $.each(data.dimBarList, function(key, val) {
                        legendArray.push(key);
                        var temp = "{name:'" + key + "',type:'bar',barWidth: 30, stack:'总量',data:[" + val + "]}"
                        dataArray.push(temp);
                    });
                }
            }
        });

        var option = {
    		noDataLoadingOption: {
                text: '无数据',
                effect: 'bubble',
                effectOption: {
                    effect: {
                        n: 0
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            color:['#47b6ee' ,'#25527c','#db6cab','#95b550','#4de6e6','#d2902d','#2978a2','#f19853','#4c7bd8','#9b7fc9','#4194ca','#fec014','#355ba5','#f19853'] ,
            legend: {
                data: legendArray,
                textStyle:{
                    color:'#1b77cc'
                }
            },
            toolbox: {
                show: false,
                orient: 'vertical',
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
            grid: {
                borderWidth: 0,
                x: 0,
                y: 70,
                x2: 0,
                y2: 35
            },
            calculable: false,
            xAxis: [{
                type: 'category',
                axisLabel:{
                    textStyle:{
                        color:'#1b77cc',
                        fontSize:16
                    }
                },
                data: xAxisArray
            }],
            yAxis: [{
                type: 'value',
                splitLine: {lineStyle:{type:'solid',color:'#0d4472'}},
            }],
            series: eval("([" + dataArray + "])")
        };

        return option;
    }
    //职称比例
    function getSelfDeptPositionPercentChartOption(hospital_name, dept_id) {
        var catarr = [];
        var dataarr = [];
        $.ajax({
            //url: "deptController/getDimDeptsList",
            //url: "../jsonp/getDimDeptsListhospital.json",
        	  url: "../../medical/DecisionSupportDoctorLevel.action",
        	  method: "GET",
            data: {
                'hospitalName': encodeURI(hospital_name)/*,
                'department_id': dept_id*/
            },
            dataType: "json",
            async: false,
            success: function(data) {
                var m = 0;
                $.each(data.dimPosnList, function(i, val) {
                    catarr.push(val.doctor_position);
                    if (m < 1 && val.doctor_position != "其他") {
                        m = m + 1;
                        cur_position = val.doctor_position;
                        selfSelectPos = val.doctor_position;
                        dataarr.push({
                            name: val.doctor_position,
                            value: val.cnt_person,
                            selected: true
                        });
                    } else {
                        dataarr.push({
                            name: val.doctor_position,
                            value: val.cnt_person
                        });
                    }
                });
            }
        });

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color:['#91716a','#47b6ee', '#4194ca','#2978a2','#25527c','#f19853','#4de6e6','#d2902d','#db6cab','#4c7bd8','#9b7fc9','#fec014','#355ba5','#1fc141'] ,
            legend: {
                show: false,
                x: 'left',
                data: catarr
            },
            toolbox: {
                show: false,
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
                        type: ['pie']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            noDataLoadingOption: {
                text: '无数据',
                effect: 'bubble',
                effectOption: {
                    effect: {
                        n: 0
                    }
                }
            },
            calculable: false,
            series: [{
                name: '职称比例',
                selectedMode: 'single',
                type: 'pie',
                radius: [0, '50%'],
                center: ['50%', '50%'],
                itemStyle:{
                    normal:{
                        label: {
                            show: true,
                            formatter: "{b}",//{c}({d}%)
                            textStyle: {
                                fontSize: '15',
                            }
                        },
                        labelLine: {
                            show: true,
                            length:20
                        }
                    }
                },
                // roseType : 'area',
                data: dataarr
            }]
        };

        return option;
    }
    //人员结构
    function getSelfDeptPositionPercentDetailChartOption(hospital_name, pdept_id, doc_posn,currentSelectDept) {
        if(typeof(currentSelectDept) == "undefined"){
            currentSelectDept="";
        }

        var catarr = [];
        var dataarr = [];
        //alert(1);
        $.ajax({
            //url: "deptController/getDimDeptPositionCntListByPosition",
            //url: "../jsonp/getDimDeptPositionCntListByPositionhospital.json",
        	  url: "../../medical/DecisionSupportProfessionalDistribution.action",
            method: "GET",
            data: {
                    'hospitalName': encodeURI(hospital_name)
                    /*
                    'pdepartment_id': pdept_id != null ? pdept_id : "0",
                    'department_id': currentSelectDept,
                    'doctor_position': doc_posn */
                },
            dataType: "json",
            async: false,
            success: function(data) {
                $.each(data.dimPosnList, function(i, val) {
                    catarr.push(val.department_name);
                    dataarr.push({
                        name: val.department_name,
                        value: val.cnt_person
                    });
                });
            }
        });

        var option = {
    		noDataLoadingOption: {
                text: '无数据',
                effect: 'bubble',
                effectOption: {
                    effect: {
                        n: 0
                    }
                }
            },
    		color:['#1fc141','#26bdf9','#4194ca','#fc9e22'] ,
            legend: {
                show: false,
                orient: 'vertical',
                x: 'left',
                data: catarr
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} <br/> {c} ({d}%)"
            },
            toolbox: {
                show: false,
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
                        type: ['pie'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'center'
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
            calculable: false,
            series: [{
                name: '职位分布科室比例',
                type: 'pie',
                radius: ['30%', '50%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}",//{c}({d}%)
                            textStyle: {
                                fontSize: '15',
                            }
                        },
                        labelLine: {
                            show: true,
                            length:40
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    }
                },
                data: dataarr
            }]
        };
        return option;
    }

    function getSelfHosScoreInfoChartOption(hospital_name) {
        var xaxisArray = [];
        var dataArray = [];
        $.ajax({
            //url: "deptController/getSelfDimScoreList",
            //url: "../jsonp/getSelfDimScoreList.json",
        	url: "../../medical/SelfDimScore",
            method: "GET",
            data: {
                'hospitalName': encodeURI(hospital_name)
            },
            dataType: "json",
            async: false,
            success: function(data) {
                var dataresult = "";
                $.each(data.resultList, function(i, val) {
                    var temp = "{text:'" + val.evaluateIndicator + "',max: 5}"
                    xaxisArray.push(temp);
                    dataresult = dataresult + val.score + ",";
                });
                var temp = "{name:'医院综合评分',value:[" + dataresult.substring(0, dataresult.length - 1) + "]}"
                dataArray.push(temp);
            }
        });

        var option = {
    		noDataLoadingOption: {
                text: '无数据',
                effect: 'bubble',
                effectOption: {
                    effect: {
                        n: 0
                    }
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show: false,
                orient: 'vertical',
                x: 'right',
                y: 'top',
                data: ['医院综合评分']
            },
            toolbox: {
                show: false,
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
            polar: [{
                indicator: eval("([" + xaxisArray + "])"),
                name:{
                    show: true,
                    formatter: null,
                    textStyle: {
                      //设置字体颜色
                      color:'#1c7dd6'
                    }
                  },
                  splitArea : {
                    show : true,   
                    areaStyle : {
                        color: ["transparent",'transparent']  // 图表背景网格的颜色
                    }
                },
                splitLine : {
                    show : true,
                    lineStyle : {
                        width : 1,
                        color : '#286fbb' // 图表背景网格线的颜色
                    }
                },
                axisLine: {            // 坐标轴线
                    show: true,         // 默认显示，属性show控制显示与否
                    lineStyle:{
                        width:1,
                        color: '#286fbb'
                    }        
                },
            }],
            calculable: true,
            series: [{
                name: '医院综合评分',
                type: 'radar',
                itemStyle: {
                    normal: {
                        color:'rgba(125, 194, 225,.8)',
                        areaStyle: {
                            type: 'default',
                            color: 'rgba(125, 194, 225,.2)'
                        }
                    }
                },
                data: eval("([" + dataArray + "])")
            }]
        };
        return option;
    }
    
    /**
     * Change the hospital and refresh the content of the page
     * by YangJunbo
     */
    $("#selectSelfHospital").keydown(function(e) {
    	var keycode = e.which || e.keyCode;
    	if (keycode == 13) {
    		drawSelfDeptCircle($('#selectSelfHospital').val());
    	    init($('#selectSelfHospital').val());
    	    drawOtherSelfCharts($('#selectSelfHospital').val());
    	}
    });

    $(window).resizeEnd({
        delay: 100
    }, function() {
        //drawSelfDeptCircle($('#selectSelfHospital').val());
        //drawOtherSelfCharts($('#selectSelfHospital').val());
        /* Add callback function logic here */
    });
});