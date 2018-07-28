$(document).ready(function() {
    tablelist();
    sectablelist();
    function tablelist(){
        function appendFormatter(val,row,index){
            return val+"医院设置该科室";
        }
        var cols = [[
            { title:'缺少科室名称', field:'name' ,width:300, align:'left', sortable: true },
            { title:'行业科室情况', field:'percent' ,width:500, align:'left', sortable: false, formatter: appendFormatter}
        ]];
        var myview = $.extend({},$.fn.datagrid.defaults.view,{
            onAfterRender:function(target){
                $.fn.datagrid.defaults.view.onAfterRender.call(this,target);
                var opts = $(target).datagrid('options');
                var vc = $(target).datagrid('getPanel').children('div.datagrid-view .datagrid-view2 .datagrid-body');
                vc.children('div.datagrid-empty').remove();
                if (!$(target).datagrid('getRows').length){
                    var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
                    d.css({
                        position:'absolute',
                        left:0,
                        top:50,
                        width:'100%',
                        textAlign:'center'
                    });
                }
            }
        });

        $('#firstLevelresultlist').datagrid({
            title:'科室差异列表',
            nowrap: true,
            fit:true,
            fitColumn:true,
            width:850,
            height:350,
            singleSelect:true,
            loadMsg : '数据加载中，请稍后......',
            method: 'get',
            url: '../jsonp/getFirstLevelDifference.json',
            //queryParams:{'hospital_name': $('#hospitalA').val(),'hospitalB': $('#hospitalB').val()},
            columns:cols,
            rownumbers:true,
            animate:true,
            view: myview,
            emptyMsg: '没有相关记录！',
            pagination:false
        });

    }

    function sectablelist(){
        function appendFormatter(val,row,index){
            return val+"医院设置该科室";
        }
        var cols = [[
            { title:'差异科室名称', field:'name' ,width:120, align:'left', sortable: true },
            { title:$('#hospitalA').val()+'的一级科室', field:'left' ,width:250, align:'left', sortable: false},
            { title:'行业医院科室所在的一级科室', field:'right' ,width:240, align:'left', sortable: false},
            { title:'行业科室情况', field:'result' ,width:190, align:'left', sortable: false, formatter: appendFormatter}
        ]];

        var myview = $.extend({},$.fn.datagrid.defaults.view,{
            onAfterRender:function(target){
                $.fn.datagrid.defaults.view.onAfterRender.call(this,target);
                var opts = $(target).datagrid('options');
                var vc = $(target).datagrid('getPanel').children('div.datagrid-view').children('.datagrid-view2');
                vc.children('div.datagrid-empty').remove();
                console.log(vc)
                if (!$(target).datagrid('getRows').length){
                    var x = $('.datagrid-view').eq(1)
                    var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
                    d.css({
                        position:'static',
                        left:0,
                        top:50,
                        paddingTop:20,
                        paddingBottom:20,
                        width:'100%',
                        textAlign:'center'
                    });
                }
            }
        });

        $('#secondLevelresultlist').datagrid({
            title:'差异科室的一级科室列表',
            nowrap: true,
            fit:true,
            fitColumn:true,
            //width:850,
            //height:350,
            singleSelect:true,
            loadMsg : '数据加载中，请稍后......',
            method: 'get',
            url: '../jsonp/getSecondLevelDifference.json',
           // queryParams:{'hospital_name': $('#hospitalA').val(),'hospitalB': $('#hospitalB').val()},
            columns:cols,
            rownumbers:true,
            animate:true,
            view: myview,
            emptyMsg: '没有相关记录！',
            pagination:false
        });

    }
});
