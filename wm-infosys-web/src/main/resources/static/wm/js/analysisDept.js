$(document).ready(function() {
    var searchparam="";
    $("#analysis_searchHospital").autocomplete({
        source: function( request, response ) {
            $.ajax({
                //url: "deptController/getAutoCompleteFieldsByHospital",
                url: "../jsonp/json_one.json",
                dataType: "json",
                /*data:{
                    hospital_name: request.term
                },*/
                success: function( data ) {
                    response($.map(data.autoCompletedFields, function(item) {
                        return {
                            label:item.name,
                            value:item.name
                        }
                    }));
                }
            });
        },
        autoFocus: true,
        minLength: 1,
        autoFill:true
    });

    tablelist();

    $('#analSearchbtn').bind("click", function() {
        init();
    });
    function init(){
        var chk_value =[];//定义一个数组
        $('input[name="searchFilter"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数
            chk_value.push($(this).val());//将选中的值添加到数组chk_value中
        });
        var params = {
            'hospital_name' : $('#analysis_searchHospital').val(),
            'filter' : chk_value.toString()
        };
        searchparam = "[hospital_name:"+$('#analysis_searchHospital').val()+";filter:"+chk_value.toString()+"]";
        getAnlysisSearchedRequest(params);
    }

    function tablelist(){
        function formatOper(val,row,index){
            return '<a href="#" onclick="chooseRow2(\''+row.name+'\')">加入主对比</a>';
        }
        var toolbar = [{
            text:'添加所选进入行业医院列表',
            iconCls:'choose-add',
            handler:function(){
                $('#hypklist').empty();
                var checkedItems = $('#hyHospitalList').datagrid('getChecked');
                var names = [];
                $.each(checkedItems, function(index, item){
                    if(index>1){
                        alert('行业医院最多只能添加2个')
                       return false;
                    }
                    $('#hypklist').append("<li><div>"+item.name+"<span id ='select' style='display:none;'>"+item.id+"</span><a href='#' title='删除该项'><i class='iconfont'>&#xe611;</i></a></div></li>");
                    names.push(item.name);
                    
                });
                if($('.x-pk').height()>220){
                    var h = $('#hostpklist').height()
                    var h2 = $('#hypklist').height()
                    $('.x-pk').css('top', 240-(h+h2))
                }
                
            }
        },{
            text:'添加全部进入行业医院列表',
            iconCls:'icon-add',
            handler:function(){
                data = $('#hyHospitalList').datagrid('getData');
                $('#hypklist').empty();
                $('#hypklist').append("<li><div>左侧列表全部"+data.total+"条记录<a href='#' title='删除该项'><i class='iconfont'>&#xe611;</i></a></div></li>");
                if($('.x-pk').height()>220){
                    var h = $('#hostpklist').height()
                    var h2 = $('#hypklist').height()
                    $('.x-pk').css('top', 240-(h+h2))
                }
            }
        }];
        var cols = [[
            { title:'医院名称', field:'name' ,width:'20%', align:'center', sortable: true },
            { title:'区域', field:'area' ,width:'5%', align:'center', sortable: true },
            { title:'省份', field:'province' ,width:'5%', align:'center', sortable: true },
            { title:'城市', field:'city' ,width:'5%', align:'center', sortable: true},
            { title:'等级', field:'level' ,width:'5%', align:'center', sortable: true},
            { title:'医院数量', field:'doc_num' ,width:'8%', align:'center', sortable: true},
            { title:'科室数量', field:'dept_num' ,width:'8%', align:'center', sortable: true},
            { title:'地址', field:'address' ,width:'30%', align:'center', sortable: true},
            { title:'id', field:'id', hidden:true},
            { title:'操作', field:'operate'  ,width:'10%', align:'center', sortable: false,formatter:formatOper}
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
                        width:'100%',
                        textAlign:'center'
                    });
                }
            }
        });

        $('#hyHospitalList').datagrid({
            fit:true,
            fitColumn:true,
            singleSelect:false,
            selectOnCheck: true,
            checkOnSelect: false,
            loadMsg : '数据加载中，请稍后......',
            method: 'get',
           // url: 'deptLayoutController/getSearchedListByHosOrDept',
           //之前的假数据 url: '../jsonp/getSearchedListByHosOrDept.json',
            url:'../../medical/DecisionSupportHospitalInfo.action',
          /*  queryParams:{'hospital_name':$('#analysis_searchHospital').val()},*/
            frozenColumns:[[
                { field:'ck',checkbox:true }
            ]],
            columns:cols,
            rownumbers:true,
            animate:true,
            toolbar:toolbar,
            view: myview,
            emptyMsg: '没有相关记录！',
            pagination:false,
            // pageSize:5,
            // pageList:[5,10,20,50,100],
            onLoadSuccess: function (data) {
                if (data.rows.length != 0) {
                    $('#hyHospitalList').datagrid("selectRow", 0);
                    //drawpie();
                }
                $('.datagrid-header-check').children('input').attr('id','check');
                var tlab = $('<label for="check"></label>')
                $('.datagrid-header-check').append(tlab);

                $('.datagrid-cell-check').children('input').each(function(i,val){
                    $(this).attr('id','check'+i);
                    var lab = $('<label for="check'+i+'"></label>')
                    $(this).after(lab);
                    
                    
                });
            },
            onSelect: function (rowIndex, rowData) {
                drawHospitalTree("#selectHospitalTree", rowData.name, rowData.id);
                //$('#hospital_info').html(rowData.profiles);
            }
        })
            .datagrid('getPager').pagination({
            beforePageText: '第 ',//页数文本框前显示的汉字
            afterPageText: ' 页，共 {pages} 页',
            displayMsg: ''
        });

    }

    function getAnlysisSearchedRequest(params){

        $('#hyHospitalList').datagrid('load',params).datagrid('getPager').pagination({
            beforePageText: '第 ',//页数文本框前显示的汉字
            afterPageText: ' 页，共 {pages} 页',
            displayMsg: ''
        });
    }

    $('#hymatchBtn').bind("click", function() {
        var hoslist=[];
        //alert(1);
        $('#hypklist li').each(function(){
            hoslist.push($(this).text());
        });
        if($('#hostpklist li').length < 1){
            alert("请选择主对比医院。");
            return false;
        }

        if($('#hypklist li').length < 1){
            alert("请选择行业对比医院。");
            return false;
        }
        var selectId="";
        var value="";
        $("span[id^='select']").each(function(i) {
            selectId+=$(this).text()+"&";
        });
        if(selectId.length!=0){
            value=selectId;
        }else{
            value=searchparam;
        }

        $.ajax(
            {
                url:"../jsonp/setHYmatchedList.json",
                method: "GET",
               // data: {'hospitalA': $('#hostpklist li').text(),hospitalB:value},
                dataType:"json",
                async: false,
                success:function(data)
                {
                    //alert(1);
                    // top.location.href='../html/kshlhfx-levelone.html';
                    top.location.href='../html/returnhyContrastPage.html';
                    //location.href='returnhyContrastPage?hospitalA='+data.hospitalA+"&hospitalB="+data.hospitalB;
                    //window.open('returnhyContrastPage?hospitalA='+data.hospitalA+"&hospitalB="+data.hospitalB);
                },
                error:function(){
                    result = "暂无详细信息！";
                }
            });

    });

    $(document).on("click","#hostpklist li div a",function(){
        $(this).parent().parent().remove();
    });

    $(document).on("click","#hypklist li div a",function(){
        $(this).parent().parent().remove();
    });

    function drawHospitalTree(divDom, hospital_name, hospital_id){
        $(divDom).empty();
        var divwidth = $(divDom).width();

        if(typeof(hospital_name) == "undefined"){
            hospital_name="";
        }

        var margin = {top: 20, right: 120, bottom: 20, left: 250},
            width = divwidth - margin.right - margin.left,
            height = 340 - margin.top - margin.bottom;

        var i = 0,
            duration = 400,
            root;

//    var tip = d3.tip()
//    .attr('class', 'd3-tip')
//    //.direction('e')
//    .offset([-10, 0])
//    .html(function(d) {
//      var result = "";
//      var cut_score = "";
//      var cur_node = "科室评分";
//      d.dept_gooddisease != null ? result = result + "<strong>擅长疾病:</strong> <span style='color:red'>" + d.dept_gooddisease + "</span><br>" : "";
//      if(d.score != null){
//       var val = d.score;
//       var left = 5 - val;
//       val = val >= 5 ? 5 : val;
//       for(i=0; i < val; i++){
//        cut_score=cut_score+"★";
//      }
//      for(i=0; i < left; i++){
//        cut_score=cut_score+"☆";
//      }
//    }
//    if(!d.parent){
//      cur_node = "医院评分";
//    }
//    d.score != null ? result = result + "<strong>"+cur_node+":</strong> <span style='color:red'>" + cut_score + "</span><br>" : "";
//    d.resource != null ? result = result + "<strong>资源投入:</strong> <span style='color:red'>" + d.resource + "</span>" : "";
//    return result;
//  });

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        var svg = d3.select(divDom).append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//    svg.call(tip);

       /* d3.json("deptController/getHospitalStructureTreeLevelList?hospital_name="+hospital_name, function(error, flare) {*/
        //d3.json('../jsonp/getHospitalStructureTreeLevelList.json', function(error, flare) {
        d3.json('../../medical/DecisionSupportDeptStructureTreeLevel.action?hid='+hospital_id, function(error, flare) {
            root = flare;
            root.x0 = height / 2;
            root.y0 = 0;

            function collapse(d) {
                if (d.children && d.children !='') {
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
            nodes.forEach(function(d) { d.y = d.depth * 120; });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", click);

            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
//      .on("mouseover",tip.show)
//      .on("mouseout",tip.hide);

            nodeEnter.append("text")
                .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                .text(function(d) { return d.name+"("+d.doc_num+"人)"; })
                .style("fill-opacity", 1);
//      .on("mouseover",tip.show)
//      .on("mouseout",tip.hide);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 8)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1);

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
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
        }
    }
});
function chooseRow2(row){
    $('#hostpklist').empty();
    $('#hostpklist').append("<li><div>"+row+"<a href='#' title='删除该项'><i class='iconfont'>&#xe611;</i></a></div></li>");
    $('#analysis_searchHospital').val(row);
    if($('.x-pk').height()>220){
        var h = $('#hostpklist').height()
        var h2 = $('#hypklist').height()
        $('.x-pk').css('top', 240-(h+h2))
    }
};
