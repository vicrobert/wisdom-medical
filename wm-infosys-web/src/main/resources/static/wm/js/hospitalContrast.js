$(document).ready(function() {
    var deptMatchResult;
    var deptMatchResultDom = document.getElementById('deptMatchResult');

    var regA = new RegExp("(^|&)hospitalA=([^&]*)(&|$)");
    var regB = new RegExp("(^|&)hospitalB=([^&]*)(&|$)");
    var regAn = new RegExp("(^|&)nameA=([^&]*)(&|$)");
    var regBn = new RegExp("(^|&)nameB=([^&]*)(&|$)");
    var hospA = decodeURIComponent(window.location.search.substr(1)).match(regA);
    var hospB = decodeURIComponent(window.location.search.substr(1)).match(regB);
    var hospAn = decodeURIComponent(window.location.search.substr(1)).match(regAn);
    var hospBn = decodeURIComponent(window.location.search.substr(1)).match(regBn);
    if (hospA != null) {
    	hospA = unescape(hospA[2]);
    }
    if (hospB != null) {
    	hospB = unescape(hospB[2]);
    }
    if (hospAn != null) {
    	hospAn = unescape(hospAn[2]);
    }
    if (hospBn != null) {
    	hospBn = unescape(hospBn[2]);
    }
    $('#hospitalA').val(hospAn);
    $('#hospitalB').val(hospBn);
    
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
                title: '一级科室',
                field: 'department',
                width: 78,
                align: 'left',
                sortable: true
            }, {
                title: $('#hospitalA').val() + '二级科室（人）',
                field: 'hospitala',
                width: 240,
                align: 'left',
                sortable: false,
                formatter: deatilformatter
            }, {
                title: $('#hospitalB').val() + '二级科室（人）',
                field: 'hospitalb',
                width: 260,
                align: 'left',
                sortable: false,
                formatter: deatilformatter
            }, {
                title: '差异分析（结论）',
                field: 'verdict',
                width: 239,
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

        $('#hospital_match_list').datagrid({
            title: '医院信息列表',
            nowrap: true,
            fit: true,
            fitColumn: true,
            //width:850,
            //height:350,
            singleSelect: true,
            loadMsg: '数据加载中，请稍后......',
            method: 'get',
           // url: 'hospitalContrastController/getTable',
            //url: '../jsonp/getTable.json',
            url: '../../medical/HospitalContrastTable',
            queryParams: {
                //'hospitalA': $('#hospitalA').val(),
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
    tablelist();
    $.ajax({
        //url: "../jsonp/getAllTableDifferencehospital.json",
    	url: '../../medical/HospitalContrastList',
    	method: "GET",
        dataType: "json",
        data: {
            //'hospitalA': $('#hospitalA').val(),
            //'hospitalB': $('#hospitalB').val()
        	hospitalId1: hospA,
        	hospitalId2: hospB
        },
        async: false,
        success: function(data) {
            $('#AyBnTitle').append('<h3><span>' + hospAn + '</span>具有，<span>' + hospBn + '</span>没有的科室</h3>');
            $.each(data.ayBn.split(","), function(i, val) {
                $('#AyBn').append(' <span class="label label-info">' + val + '</span>');
            });
            $('#ByAnTitle').append('<h3><span>' + hospBn + '</span>具有，<span>' + hospAn + '</span>没有的科室</h3>');
            $.each(data.byAn.split(","), function(i, val) {
                $('#ByAn').append(' <span class="label label-info">' + val + '</span>');
            });

        }
    });
    drawOtherSelfCharts();

    function drawOtherSelfCharts() {
       /* require.config({
            paths: {
                echarts: '../echarts-2.2.7/src'
            }
        });

        require(
            [
                'echarts',
                'echarts/theme/infographic',
                'echarts/layout/chord',
            ],

            function(ec, theme) {
                var deptMatchResultOption = getDeptMatchResultOption();
                deptMatchResult = ec.init(deptMatchResultDom, theme);
                deptMatchResult.setOption(deptMatchResultOption);
                window.onresize = deptMatchResult.resize;
            }
        );*/
        getDeptMatchResultOption();
        var myChart = echarts.init(document.getElementById('deptMatchResult'));
        //myChart.showLoading();
        myChart.setOption(option);
     /*   $.get('data/asset/data/les-miserables.gexf', function (xml) {
            myChart.hideLoading();
            var graph = echarts.dataTool.gexf.parse(xml);
            var categories = [];
            for (var i = 0; i < 9; i++) {
                categories[i] = {
                    name: '类目' + i
                };
            }
            graph.nodes.forEach(function (node) {
                node.itemStyle = null;
                node.value = node.symbolSize;
                node.symbolSize /= 1.5;
                node.label = {
                    normal: {
                        show: node.symbolSize > 10
                    }
                };
                node.category = node.attributes.modularity_class;
            });

        }, 'xml');*/
    }
    function getDeptMatchResultOption() {
        var legendArr = [];
        var nodeArr = [];
        var linkArr = [];

        $.ajax({
            //url: "../jsonp/getTableForChart.json",
        	url: "../../medical/DepartmentDifferenceChart",
            method: "GET",
            dataType: "json",
            data: {
                //'hospitalA': $('#hospitalA').val(),
                //'hospitalB': $('#hospitalB').val()
            	hospitalId1: hospA,
            	hospitalId2: hospB
            },
            async: false,
            success: function(data) {
                $.each(data.legendSet, function(i, val) {
                    legendArr.push(val);
                });
                $.each(data.nodeSet, function(i, val) {
                    nodeArr.push("{name:'" + val + "'}");
                });
                $.each(data.linkMap, function(key, val) {
                    linkArr.push("{source:'" + val + "',target:'" + key + "',weight:1,name:'属于'}");
                    // nodeArr.push("{name:'" + key + "',category:'"+val+"'}");
                });
            }
        });
    //console.log(legendArr);
    console.log(nodeArr);
    //console.log(linkArr);
        var lineColor='#18c3da';

        var nodes = [
            {name: 'what if？', symbolSize: 2, category: 'what if？'},
            {name: '恰到好处的孤独', symbolSize: 3, category: '恰到好处的孤独'},
            {name: '奇特的一生', symbolSize: 4, category: '奇特的一生'},
            {name: '二孩时代', symbolSize: 4, category: '二孩时代'},
            {name: '妈妈是最初的老师', symbolSize: 5, category: '妈妈是最初的老师'},
            {name: '世界因你而温柔', symbolSize: 5, category: '世界因你而温柔'},
            {name: '因为孤独的缘故', symbolSize: 5, category: '因为孤独的缘故'},
            {name: '幸福从不缺席', symbolSize: 5, category: '幸福从不缺席'},
            {name: '冰岛迷梦', symbolSize: 6, category: '冰岛迷梦'},
            {name: '窗边的小豆豆', symbolSize: 6, category: '窗边的小豆豆'},
            {name: '我不', symbolSize: 6, category: '我不'},
            {name: '从容的底气', symbolSize: 6, category: '从容的底气'},
            {name: '无聊的人生，我死也不要', symbolSize: 6, category: '无聊的人生，我死也不要'},
            {name: '种满院植物，安守四季时光', symbolSize: 6, category: '种满院植物，安守四季时光'},
            {name: '和你一起，我不怕老去', symbolSize: 6, category: '和你一起，我不怕老去'},
            {name: '禅宗兴起', symbolSize: 6, category: '禅宗兴起'},
            {name: '局外人', symbolSize: 6, category: '局外人'},
            {name: '容忍与自由', symbolSize: 7, category: '容忍与自由'},
            {name: '我决定活得有趣', symbolSize: 7, category: '我决定活得有趣'},
            {name: '不如任性过生活', symbolSize: 7, category: '不如任性过生活'},
            {name: '品味四讲', symbolSize: 7, category: '品味四讲'},
            {name: '蒋勋破解梵高之美', symbolSize: 7, category: '蒋勋破解梵高之美'},
            {name: '爱，让我们彼此听见', symbolSize: 7, category: '爱，让我们彼此听见'},
            {name: '没有什么了不起', symbolSize: 7, category: '没有什么了不起'},
            {name: '坐在路边鼓掌的人', symbolSize: 7, category: '坐在路边鼓掌的人'},
            {name: '自由疯长', symbolSize: 7, category: '自由疯长'},
            {name: '小豆豆与我', symbolSize: 8, category: '小豆豆与我'},
            {name: '蒋勋破解莫奈之美', symbolSize: 9, category: '蒋勋破解莫奈之美'},
            {name: '我承诺给你的美丽新世界', symbolSize: 10, category: '我承诺给你的美丽新世界'},
            {name: '无关岁月', symbolSize: 11, category: '无关岁月'},
            {name: '以自己喜欢的方式过一生', symbolSize: 11, category: '以自己喜欢的方式过一生'},
            {name: '吴哥之美', symbolSize: 11, category: '吴哥之美'},
            {name: '蒋勋破解高更之美', symbolSize: 11, category: '蒋勋破解高更之美'},
            {name: '孤独六讲', symbolSize: 12, category: '孤独六讲'},
            {name: '水浒传', symbolSize: 13, category: '水浒传'},
            {name: '蒋勋破解米开朗基罗', symbolSize: 14, category: '蒋勋破解米开朗基罗'},
            {name: '蒋勋破解达芬奇之美', symbolSize: 14, category: '蒋勋破解达芬奇之美'},
            {name: '生活十讲', symbolSize: 15, category: '生活十讲'},
            {name: '崭新的理所当然', symbolSize: 15, category: '崭新的理所当然'},
            {name: '美的沉思', symbolSize: 26, category: '美的沉思'},
            {name: '文学', symbolSize: 1, category: '文学'},
            {name: '篆刻', symbolSize: 1, category: '篆刻'},
            {name: '梦想', symbolSize: 1, category: '梦想'},
            {name: '长篇', symbolSize: 1, category: '长篇'},
            {name: '宠物', symbolSize: 1, category: '宠物'},
            {name: '佛教', symbolSize: 1, category: '佛教'},
            {name: '服饰', symbolSize: 1, category: '服饰'},
            {name: '命运', symbolSize: 1, category: '命运'},
            {name: '宋朝', symbolSize: 1, category: '宋朝'},
            {name: '诗', symbolSize: 1, category: '诗'},
            {name: '人性', symbolSize: 1, category: '人性'},
            {name: '书法', symbolSize: 1, category: '书法'},
            {name: '印度教', symbolSize: 1, category: '印度教'},
            {name: '舞蹈', symbolSize: 1, category: '舞蹈'},
            {name: '思考', symbolSize: 1, category: '思考'},
            {name: '戏曲', symbolSize: 1, category: '戏曲'},
            {name: '灰暗', symbolSize: 1, category: '灰暗'},
            {name: '飙车', symbolSize: 1, category: '飙车'},
            {name: '趣味', symbolSize: 1, category: '趣味'},
            {name: '毒品', symbolSize: 1, category: '毒品'},
            {name: '创业', symbolSize: 1, category: '创业'},
            {name: '宿命', symbolSize: 1, category: '宿命'},
            {name: '断舍离', symbolSize: 1, category: '断舍离'},
            {name: '吴哥窟', symbolSize: 1, category: '吴哥窟'},
            {name: '植物', symbolSize: 1, category: '植物'},
            {name: '名著', symbolSize: 1, category: '名著'},
            {name: '摄影', symbolSize: 1, category: '摄影'},
            {name: '经典', symbolSize: 1, category: '经典'},
            {name: '江湖', symbolSize: 2, category: '江湖'},
            {name: '哲学', symbolSize: 2, category: '哲学'},
            {name: '科学', symbolSize: 2, category: '科学'},
            {name: '道德', symbolSize: 2, category: '道德'},
            {name: '价值观', symbolSize: 2, category: '价值观'},
            {name: '自然', symbolSize: 3, category: '自然'},
            {name: '音乐', symbolSize: 3, category: '音乐'},
            {name: '园艺', symbolSize: 3, category: '园艺'},
            {name: '雕刻', symbolSize: 3, category: '雕刻'},
            {name: '建筑', symbolSize: 3, category: '建筑'},
            {name: '死亡', symbolSize: 4, category: '死亡'},
            {name: '女人', symbolSize: 4, category: '女人'},
            {name: '时间', symbolSize: 4, category: '时间'},
            {name: '基督教', symbolSize: 4, category: '基督教'},
            {name: '杀戮', symbolSize: 5, category: '杀戮'},
            {name: '当下', symbolSize: 5, category: '当下'},
            {name: '博爱', symbolSize: 5, category: '博爱'},
            {name: '幸福', symbolSize: 6, category: '幸福'},
            {name: '禅宗', symbolSize: 6, category: '禅宗'},
            {name: '宗教', symbolSize: 6, category: '宗教'},
            {name: '电影', symbolSize: 6, category: '电影'},
            {name: '自由', symbolSize: 6, category: '自由'},
            {name: '吃', symbolSize: 7, category: '吃'},
            {name: '性', symbolSize: 8, category: '性'},
            {name: '伦理', symbolSize: 8, category: '伦理'},
            {name: '旅行', symbolSize: 8, category: '旅行'},
            {name: '战争', symbolSize: 10, category: '战争'},
            {name: '自我', symbolSize: 11, category: '自我'},
            {name: '美', symbolSize: 11, category: '美'},
            {name: '绘画', symbolSize: 11, category: '绘画'},
            {name: '孤独', symbolSize: 11, category: '孤独'},
            {name: '孩子', symbolSize: 12, category: '孩子'},
            {name: '教育', symbolSize: 12, category: '教育'},
            {name: '亲情', symbolSize: 12, category: '亲情'},
            {name: '历史', symbolSize: 14, category: '历史'},
            {name: '艺术', symbolSize: 14, category: '艺术'},
            {name: '成长', symbolSize: 15, category: '成长'},
            {name: '生活品味', symbolSize: 16, category: '生活品味'},
            {name: '文化', symbolSize: 17, category: '文化'},
            {name: '爱', symbolSize: 18, category: '爱'}
        ];

        var legends = [
            {name: '内科'},
            {name: '外科'},
            {name: '其他'},
            {name: '妇科'}
        ];
         option = {
             grid:{
                 top:"10%"
             },
             color:['#13a6be','#1e7fc6','#f6881f','#96b30c'],
            legend: [{
                show: true,
                orient:'vertical',
                x:20,
                y:20,
                textStyle:{
                    color:['#13a6be','#1e7fc6','#f6881f','#96b30c']
                },
                data: legendArr
            }],

            animationDurationUpdate: 2,
            animationEasingUpdate: 'quinticInOut',

            series: [{
                type: 'graph',
                //tooltip: {},
                top:'30%',
                //left:'10%',
                width: '40%',
                height: '40%',
                ribbonType: true,
                layout: 'circular',
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [0, 10],
                circular: {
                    rotateLabel: true
                },
                //layout: 'force',
                force: {
                    initLayout: 'circular',
                    repulsion: 50,
                    gravity: 0.5,
                    edgeLength: 500,
                    layoutAnimation: true,
                },

                roam: false,
                focusNodeAdjacency: true,
                hoverAnimation: true,
                label: {
                    normal: {
                        color:'#18c3da',
                        position: 'center',
                        color:'#135294',
                        fontSize:12,
                        normal: {
                            textStyle: {
                                color:"#18c3da",
                                fontSize:16
                            }
                        }
                    }
                },
                draggable: true,
                itemStyle: {
                    normal: {
                        label: {
                            rotate: true,
                            show: true,
                        },
                        //color: ["#393f51", "#393f51", "#393f51", "#393f51", "#393f51", "#393f51", "#393f51", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7", "#85d6f7"] /* 内的颜色#393f51，外的颜色#85d6f7 */
                    },
                    emphasis: {
                        label: {
                            show: true,
                            
                            // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                        }
                    }
                },
                lineStyle: {
                    normal: {
                        color: lineColor,
                        width: 2,
                        type: 'solid',
                        opacity: 0.2,
                        curveness: 0.3,
                    },
                },
                categories: legends,
                data:eval("([" + nodeArr +"])"),
                // links: [],
                links: eval("([" + linkArr + "])")
            }]
        };





        /*option = {
            grid:{
                width:50,
                height:80
            },
            legend: [{
                x: 'left',
                orient: 'vertical',
                // selectedMode: 'single',
                data:  eval("([" + nodeArr + "])").map(function (a) {
                    return a.name;
                })
            }],
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    layout: 'circular',
                    circular: {
                        rotateLabel: true
                    },
                    label:{
                        normal:{
                            show:true,
                            color:'auto'
                        }
                    },
                    nodes: eval("([" + nodeArr + "])"),
                    links: eval("([" + linkArr + "])"),
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                }
            ]
        };*/


      /*   option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    if (params.indicator2) { // is edge
                        return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
                    } else { // is node
                        return params.name
                    }
                }
            },
            toolbox: {
                show: false,
                feature: {
                    restore: {
                        show: true
                    },
                    magicType: {
                        show: true,
                        type: ['force', 'chord']
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            legend: {
                x: 'left',
                orient: 'vertical',
                //data:['阿森纳', '拜仁慕尼黑', '多特蒙德']
                data: legendArr
            },
            series: [{
                name: '全表差异',
                type: 'graph',
                sort: 'ascending',
                sortSub: 'descending',
                ribbonType: false,
                radius: '60%',
                itemStyle: {
                    normal: {
                        label: {
                            rotate: true
                        }
                    }
                },
                minRadius: 7,
                maxRadius: 20,
                // 使用 nodes links 表达和弦图
                nodes: eval("([" + nodeArr + "])"),
                links: eval("([" + linkArr + "])")
            }]
        };
*/
        return option;
    }
});