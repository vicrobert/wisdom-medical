$(document).ready(function() {
    $('#hostHospital').html($('#hospitalA').val());
    drawHostHospital("#host_hospital_chart", $('#hospitalA').val());

    var hyAvenageCharts;
    var hyMatchanlysisCharts;
    var hyAvenageChartsDom = document.getElementById('hy_avenage_charts');
    var hyMatchanlysisChartsDom = document.getElementById('hy_matchanlysis_charts');

    drawCharts();

    function drawCharts() {
        require.config({
            paths: {
                echarts: '../echarts-2.2.7/src'
            }
        });

        require(
            [
                'echarts',
               // 'echarts/theme/infographic',
                'echarts/chart/bar',
                'echarts/chart/scatter',
                'echarts/chart/pie',
                'echarts/chart/gauge'
            ],

            function(ec, theme) {
                $("#hy_matchanlysis_charts").showLoading();
                var hyMatchanlysisChartsOption = getHyMatchanlysisChartsOption();
                hyMatchanlysisCharts = ec.init(hyMatchanlysisChartsDom, theme);
                hyMatchanlysisCharts.setOption(hyMatchanlysisChartsOption);
                window.onresize = hyMatchanlysisCharts.resize;
                $("#hy_matchanlysis_charts").hideLoading();
                $("#hy_avenage_charts").showLoading();
                var hyAvenageChartsOption = getHyAvenageChartsOption();
                hyAvenageCharts = ec.init(hyAvenageChartsDom, theme);
                hyAvenageCharts.setOption(hyAvenageChartsOption);
                window.onresize = hyAvenageCharts.resize;
                $("#hy_avenage_charts").hideLoading();
            }
        );
    }

    function getHyAvenageChartsOption(dept_name) {
        var legendArray = [];
        var resultArray = [];
        var legendSelect = "{"
        var hideLegendSelect = "No";
        var percent;
        $.ajax({
           // url: "hyTargetController/getHYmatchedResult",
            url: "../jsonp/getHYmatchedResult.json",
            dataType: "json",
         /*   data: {
                "hospitalA": $('#hospitalA').val(),
                'hospitalB': $('#hospitalB').val(),
                'department_name': dept_name != null ? dept_name : ""
            },*/
            async: false,
            success: function(data) {
                percent = data.percent;
                colorList =['#47b6ee' ,'#498910','#e77406','#4c7bd8','#9b7fc9','#fec014','#25527c','#f19853'];
                $.each(data.categorySet, function(index, value) {
                    var t = "{name:'" + value + "',textStyle:{color:'"+colorList[index]+"'}}"
                    legendArray.push(t);
                    if (index > 2) {
                        hideLegendSelect = "Yes";
                        legendSelect += "'" + value + "':false,"
                    }
                    var dataArr = [];
                    var markDataArr = [];
                    $.each(data.resultList, function(i, val) {
                        if (value == val.doctor_position) {
                            dataArr.push("[" + val.cnt_person + "," + val.per_position + "]");
                        }
                    });
                    $.each(data.hostPosnList, function(i, val) {
                        if (value == val.doctor_position) {
                            markDataArr.push("{name:'" + value + "',xAxis:" + val.cnt_person + ",yAxis:" + val.per_position + "}");
                        }
                    });
                    var temp = "{name:'" + value + "',type:'scatter',symbol:'circle',data:[" + dataArr + "],markPoint:{symbol:'star',symbolSize:15,data:[" + markDataArr + "]}}"
                    resultArray.push(temp);
                });
            }
        });
        legendSelect = hideLegendSelect == "Yes" ? legendSelect.substring(0, legendSelect.lastIndexOf(',')) + "}" : "{}";     
        var option = {
            tooltip: {
                trigger: 'axis',
                showDelay: 0,
                formatter: function(params) {
                    if (params.value.length > 1) {
                        return params.seriesName + ' :<br/>' + params.value[0] + '人 ' + params.value[1] + '% ';
                    } else {
                        return params.seriesName + ' :<br/>' + params.name + ' : ' + params.value + '% ';
                    }
                },
                axisPointer: {
                    show: false,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    }
                }
            },
            grid:{
                x:100,
                borderWidth:0
            },
            color:['#47b6ee' ,'#498910','#e77406','#4c7bd8','#9b7fc9','#fec014','#25527c','#f19853'],
            legend: {
                selected: eval("(" + legendSelect + ")"),
                data:  eval("([" + legendArray + "])")
                //data:['主任医师','主治医师']
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataZoom: {
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
            xAxis: [{
                type: 'value',
                scale: true,
                axisLine:{
                    lineStyle:{
                        width:1,
                        color:'#0d416f'
                    }
                },
                axisLabel: {
                    formatter: '规模：{value}',
                    textStyle:{
                        color:'#1765b1',
                        fontSize:15
                    }
                },
                splitLine:{
                    lineStyle:{
                        type:'dashed',
                        color:'#0b2b54'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                scale: true,
                axisLine:{
                    lineStyle:{
                        width:1,
                        color:'#0d416f'
                    }
                },
                axisLabel: {
                    formatter: '占比：{value}%',
                    textStyle:{
                        color:'#1765b1',
                        fontSize:15
                    }
                },
                splitLine:{
                    lineStyle:{
                        type:'dashed',
                        color:'#0b2b54'
                    }
                }
            }],
            series: eval("([" + resultArray + "])")
        };

        var updateoptions = hyMatchanlysisCharts.getOption();
        updateoptions.series[0].data[0].value = 28;
        hyMatchanlysisCharts.setOption(updateoptions, true);

        return option;
    }

    function getHyMatchanlysisChartsOption() {
        var option = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            series: [{
                name: '业务指标',
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '80%'], // 默认全局居中
                radius: 220,
                axisLine: { // 坐标轴线
                    lineStyle: { // 属性lineStyle控制线条样式
                        width:100,
                        color:[[0.25,'#498910'],[0.75,'#0f97a8'],[1,'#e77406']]
                    }
                },
                splitNumber:10,
                splitLine:{
                    lineStyle:{
                        width:0
                    }
                },
                axisTick: { // 坐标轴小标记
                    splitNumber: 20, // 每份split细分多少段
                    length: 0, // 属性length控制线长
                },
                axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                    formatter: function(v) {
                        switch (v + '') {
                            case '10':
                                return '低';
                            case '50':
                                return '中';
                            case '90':
                                return '高';
                            default:
                                return '';
                        }
                    },
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 'bolder'
                    }
                },
                pointer: {
                    width: 20,
                    length: '75%',
                    color: 'rgba(255, 255, 255,1)'
                },
                title: {
                    show: true,
                    offsetCenter: [0, '-60%'], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#fff',
                        fontSize: 20
                    }
                },
                detail: {
                    show: true,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 0,
                    borderColor: '#ccc',
                    width: 100,
                    height: 40,
                    offsetCenter: [0, -40], // x, y，单位px
                    formatter: '{value}%',
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize: 30
                    }
                },
                data: [{
                    value: 80,
                    name: '合理化区间'
                }]
            }]
        };
        return option;
    }

    function updateChart(dept_name) {
        $("#hy_avenage_charts").showLoading();
        if (hyAvenageCharts && hyAvenageCharts.dispose) {
            hyAvenageCharts.dispose();
        }

        require(['echarts', 'echarts/theme/infographic', 'echarts/chart/bar', 'echarts/chart/scatter', 'echarts/chart/gauge'], function(ec, theme) {
            hyAvenageCharts = ec.init(hyAvenageChartsDom, theme);
        });
        var hyAvenageChartsOption = getHyAvenageChartsOption(dept_name);
        hyAvenageCharts.setOption(hyAvenageChartsOption, true);
        window.onresize = hyAvenageCharts.resize;
        $("#hy_avenage_charts").hideLoading();
    }

    function drawHostHospital(divDom, hospital_name) {
        $(divDom).empty();
        var divwidth = $(divDom).width();

        if (typeof(hospital_name) == "undefined") {
            hospital_name = "";
        }

        var margin = {
                top: 20,
                right: 120,
                bottom: 20,
                left: 120
            },
            width = divwidth - margin.right - margin.left,
            height = 300 - margin.top - margin.bottom;

        var i = 0,
            duration = 300,
            root;

//		var tip = d3.tip()
//			.attr('class', 'd3-tip')
//			//.direction('e')
//			.offset([-10, 0])
//			.html(function(d) {
//				var result = "";
//				var cut_score = "";
//				var cur_node = "科室评分";
//				d.dept_gooddisease != null ? result = result + "<strong>擅长疾病:</strong> <span style='color:red'>" + d.dept_gooddisease + "</span><br>" : "";
//				if (d.score != null) {
//					var val = d.score;
//					var left = 5 - val;
//					val = val >= 5 ? 5 : val;
//					for (i = 0; i < val; i++) {
//						cut_score = cut_score + "★";
//					}
//					for (i = 0; i < left; i++) {
//						cut_score = cut_score + "☆";
//					}
//				}
//				if (!d.parent) {
//					cur_node = "医院评分";
//				}
//				d.score != null ? result = result + "<strong>" + cur_node + ":</strong> <span style='color:red'>" + cut_score + "</span><br>" : "";
//				d.resource != null ? result = result + "<strong>资源投入:</strong> <span style='color:red'>" + d.resource + "</span>" : "";
//				return result;
//			});

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) {
                return [d.y, d.x];
            });

        var svg = d3.select(divDom).append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//		svg.call(tip);

       /* d3.json("deptController/getHospitalStructureTreeLevelList?hospital_name=" + hospital_name, function(error, flare) {*/
        d3.json("../jsonp/getHospitalStructureTreeLevelList_two.json", function(error, flare) {
            root = flare;
            root.x0 = height / 2;
            root.y0 = 0;

            function collapse(d) {
                if (d.children && d.children != '') {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            root.children.forEach(collapse);
            update(root);
        });

        d3.select(self.frameElement).style("height", "600px");

        function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) {
                d.y = d.depth * 120;
            });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                .on("click", click);

            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : "#fff";
                });
//				.on("mouseover", tip.show)
//				.on("mouseout", tip.hide);

            nodeEnter.append("text")
                .attr("x", function(d) {
                    return d.children || d._children ? -10 : 10;
                })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function(d) {
                    return d.name + "(" + d.doc_num + "人)";
                })
                .style("fill-opacity", 1);
//				.on("mouseover", tip.show)
//				.on("mouseout", tip.hide);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            nodeUpdate.select("circle")
                .attr("r", 8)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : "#fff";
                });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1);

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
            updateChart(d.name);
        }
    }

    $("#shortList").addClass("keepcenter");
    $("#shortList").showLoading();
    $("#score").showLoading();
    $.ajax({
       // url: "hyTargetController/computeFinalResult",
        url: "../jsonp/computeFinalResult.json",
        dataType: "json",
     /*   data: {
            "hospital_name": $('#hospitalA').val(),
            "hospitalA": $('#hospitalA').val(),
            'hospitalB': $('#hospitalB').val()
        },*/
        async: true,
        success: function(data) {
            $("#shortList").hideLoading();
            $("#shortList").removeClass("keepcenter");
            $("#score").hideLoading();
            $('#score').html(data.score);
            $.each(data.shortList, function(i, val) {
                $('#shortList').append(' <span class="label label-info">' + val + '</span>');
            });
        }
    });

    $("#shortList").on('click','.label', function(){
        updateChart($(this).text());
    });
});