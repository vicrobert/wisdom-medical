$(document).ready(function() {
    //  $.ajax(
    //          {
    //           url:"secLHosController/getSecLevelDeptMatchedList",
    //           method: "GET",
    //           data: {'hospital_name': $('#hospitalA').val(),'hospitalB': $('#hospitalB').val()},
    //           dataType:"json",
    //           async: false,
    //           success:function(data)
    //           {
    //
    //           },
    //           error:function(){
    //               }
    //           });
    var allDiffDeptInfo;
    var allDiffDeptInfoDom = document.getElementById('allDiffDeptInfo');
    tablelist();
    getdifferentList();
    
    var regA = new RegExp("(^|&)hospitalA=([^&]*)(&|$)");
    var regB = new RegExp("(^|&)hospitalB=([^&]*)(&|$)");
    var regAn = new RegExp("(^|&)nameA=([^&]*)(&|$)");
    var regBn = new RegExp("(^|&)nameB=([^&]*)(&|$)");
    var hospA = window.location.search.substr(1).match(regA);
    var hospB = window.location.search.substr(1).match(regB);
    var hospAn = window.location.search.substr(1).match(regAn);
    var hospBn = window.location.search.substr(1).match(regBn);

    function getdifferentList() {
        $.ajax({
            //url: "../jsonp/getMatchedDistinceList.json",
            url: "../../medical/DepartmentL2ContrastPercent",
            method: "GET",
            data: {
//                'hospital_name': $('#hospitalA').val(),
//                'hospitalB': $('#hospitalB').val()
            	'hospitalId1': hospA,
            	'hospitalId2': hospB
            },
            dataType: "json",
            async: false,
            success: function(data) {

                $.each(data.deptList, function(key, val) {
                    $("#departmentList").append("<option value='" + val + "'>" + val + "</option>");
                });

                $('#list10').empty();
                $('#list20').empty();
                $('#list50').empty();

                $.each(data.list10, function(key, val) {

                    $('#list10').append(' <span class="label label-info">' + val + '</span>');
                });
                $.each(data.list20, function(key, val) {

                    $('#list20').append(' <span class="label label-info">' + val + '</span>');
                });

                $.each(data.list50, function(key, val) {

                    $('#list50').append(' <span class="label label-info">' + val + '</span>');
                });
            },
            error: function() {}
        });

    }

    function tablelist() {
        function deatilformatter(val, row, index) {
            var result = "";
            if (typeof(val) != "undefined") {
                $.each(val.split(","), function(i, value) {
                    result = result + value + "<br>";
                });
            }
            return result;
        }

        var cols = [
            [{
                title: '二级科室',
                field: 'name',
                width: 80,
                align: 'left',
                sortable: true
            }, {
                title: $('#hospitalA').val(),
                field: 'left',
                width: 160,
                align: 'left',
                sortable: false,
                formatter: deatilformatter
            }, {
                title: $('#hospitalB').val(),
                field: 'right',
                width: 160,
                align: 'left',
                sortable: false,
                formatter: deatilformatter
            }, {
                title: '差异分析',
                field: 'result',
                width: 417.5,
                align: 'left',
                sortable: false,
                formatter: deatilformatter
            }]
        ];

        var myview = $.extend({}, $.fn.datagrid.defaults.view, {
            onAfterRender: function(target) {
                $.fn.datagrid.defaults.view.onAfterRender.call(this, target);
                var opts = $(target).datagrid('options');
                var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
                vc.children('div.datagrid-empty').remove();
                if (!$(target).datagrid('getRows').length) {
                    var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
                    d.css({
                        position: 'absolute',
                        left: 0,
                        top: 50,
                        width: '100%',
                        textAlign: 'center'
                    });
                }
            }
        });

        $('#hospital_match_list_two').datagrid({
            title: '医院信息列表',
            nowrap: true,
            fit: true,
            fitColumn: true,
            //width:850,
            //height:350,
            singleSelect: true,
            loadMsg: '数据加载中，请稍后......',
            method: 'get',
            //url: '../jsonp/getSecLevelDeptMatchedList.json',
            url: "../../medical/DepartmentL2ContrastTable",
            queryParams: {
               //'hospital_name': $('#hospitalA').val(),
               //'hospitalB': $('#hospitalB').val()
            	hospitalId1: hospA,
            	hospitalId2: hospB
            },
            columns: cols,
            rownumbers: true,
            animate: true,
            view: myview,
            emptyMsg: '没有相关记录！',
            pagination: false
        });

    }
    drawOtherSelfCharts();

    function drawOtherSelfCharts() {
        require.config({
            paths: {
                echarts: '../echarts-2.2.7/src'
            }
        });
        require(
            [
                'echarts',
                'echarts/theme/infographic',
                'echarts/chart/bar'
            ],
            function(ec, theme) {
                var allDiffDeptInfoOption = getAllDiffDeptInfoOption($("#departmentList").val());
                allDiffDeptInfo = ec.init(allDiffDeptInfoDom, theme);
                allDiffDeptInfo.setOption(allDiffDeptInfoOption);
                window.onresize = allDiffDeptInfo.resize;

                var cur_dept = $("#departmentList").val();
                var rows = $("#hospital_match_list").datagrid("getRows");
                for (var i = 0; i < rows.length; i++) {
                    if (cur_dept === rows[i].name) {
                        $('#hospital_match_list').datagrid('selectRow', i);
                        break;
                    }
                }
            }
        );
    }

    function getAllDiffDeptInfoOption(dept_name) {
        var yAxisArray = [];
        var legendArray = [];
        var dataArray = [];

        $.ajax({
            //url: "../jsonp/getDistinceDetailByDept.json",
        	url: "../../medical/DepartmentL2ContrastBar",
            method: "GET",
            dataType: "json",
            data: {
//                'hospital_name': $('#hospitalA').val(),
//                'hospitalB': $('#hospitalB').val(),
//                'dept_name': dept_name
            	'hospitalId1': hospA,
            	'hospitalId2': hospB
            },
            async: false,
            success: function(data) {
                yAxisArray = data.categoryList;
                $.each(data.maplist, function(key, val) {
                    legendArray.push(key);
                    var temp = "{name:'" + key + "',type:'bar',itemStyle:{normal:{barBorderRadius:10,label:{show: true,position: 'right',formatter: '{c}%'}},emphasis:{barBorderRadius:10}},data:[" + val + "]}"
                    dataArray.push(temp);
                });
                
            }
        });
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer : {           
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: [
                    {
                        name:legendArray[0],
                        textStyle:{
                            color:'#13a6be'
                        }
                    },
                    {
                        name:legendArray[1],
                        textStyle:{
                            color:'#f6881f'
                        }
                    }
                ]
            },
            color:['#13a6be','#f6881f'],
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
            calculable: false,
            xAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '占比 {value} %',
                    textStyle:{
                        color:'#1765b1',
                        fontSize:14
                    }
                },
                axisLine:{
                    show:true,
                    lineStyle:{
                        width:1.5
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        type:'dashed',
                        color:'#0d4472'
                    }
                },
                boundaryGap: [0, 0.01]
            }],
            yAxis: [{
                type: 'category',
                axisLabel: {
                    textStyle:{
                        color:'#1765b1',
                        fontSize:14
                    }
                },
                axisLine:{
                    show:true,
                    lineStyle:{
                        width:1.5
                    }
                },
                data: yAxisArray
            }],
            series: eval("([" + dataArray + "])")
        };

        return option;
    }

    function selectChange() {
        var cur_dept = $("#departmentList").val();
        if (allDiffDeptInfo && allDiffDeptInfo.dispose) {
            allDiffDeptInfo.dispose();
        }

        require(['echarts', 'echarts/theme/infographic', 'echarts/chart/bar'], function(ec, theme) {
            allDiffDeptInfo = ec.init(allDiffDeptInfoDom, theme);
        });
        var allDiffDeptInfoOption = getAllDiffDeptInfoOption(cur_dept);
        allDiffDeptInfo.setOption(allDiffDeptInfoOption, true);
        window.onresize = allDiffDeptInfo.resize;
    }
    $("#departmentList").change(function() {
        var cur_dept = $("#departmentList").val();
        var rows = $("#hospital_match_list").datagrid("getRows");
        for (var i = 0; i < rows.length; i++) {
            if (cur_dept === rows[i].name) {
                $('#hospital_match_list').datagrid('selectRow', i);
                break;
            }
        }
        selectChange();
    });

    $("#list10,#list20,#list50").on('click','.label', function(){
        $("#departmentList").val($(this).text());
        $("#departmentList").trigger("change");
    });
});