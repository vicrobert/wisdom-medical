$(document).ready(function() {
  $("#searchHos").autocomplete({
    source: function( request, response ) {
      $.ajax({
        url: "../jsonp/json_one.json",
        dataType: "json",
        data:{
          hospital_name: request.term
        },
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
    minLength: 0,
    autoFill:true,
    select: function( event, ui ) {
          //drawSelfDeptCircle(ui.item.value);
          //drawOtherSelfCharts(ui.item.value);
        }
      });
  
  $('#searchBtn').bind("click", function() {
    var params = {
      'hospitalName' : encodeURI($('#searchHos').val()) 
    };
    $('#hospital_table_list').datagrid('load',params).datagrid('getPager').pagination({
        beforePageText: '第 ',//页数文本框前显示的汉字 
        afterPageText: ' 页，共 {pages} 页',
        displayMsg: ''
      });

  });

  tablelist();
  
  function tablelist(){

    function formatOper(val,row,index){  
     return '<a href="#" onclick="chooseRow(\''+row.name+'\','+row.id+')">加入对比</a>';  
   }
   var cols = [[
   { title:'医院名称', field:'name' ,width:'20%', align:'center', sortable: true },
   { title:'区域', field:'area' ,width:'5%', align:'center', sortable: true },
   { title:'省份', field:'province' ,width:'5%', align:'center', sortable: true },
   { title:'城市', field:'city' ,width:'5%', align:'center', sortable: true},
   { title:'等级', field:'level' ,width:'5%', align:'center', sortable: true},
   { title:'医生数量', field:'doctorNum' ,width:'10%', align:'center', sortable: true},
   { title:'科室数量', field:'departmentNum' ,width:'10%', align:'center', sortable: true},
   { title:'地址', field:'address' ,width:'26%', align:'center', sortable: true},
   { title:'操作', field:'operate' ,width:'10%', align:'center', sortable: false,formatter:formatOper},
   { title:'id', field:'id', hidden:true}
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
   
   $('#hospital_table_list').datagrid({
    fit:true,
    fitColumn:true,
    singleSelect:true,  
    loadMsg : '数据加载中，请稍后......', 
    method: 'get',
    // url: '/deptLayoutController/getHospitalListByName',
    //url:'../jsonp/getHospitalListByName.json',
    url:'../../medical/DecisionSupportHospitalInfo.action',
    columns:cols,
    rownumbers:true,
    animate:true,
    view: myview,
    emptyMsg: '没有相关记录！',
    pagination:true,
    pageList: [1, 3, 5, 7],
    pageSize:7,
    onLoadSuccess: function (data) {

      if (data.rows.length != 0) {

        $('#hospital_table_list').datagrid("selectRow", 0);
      }
    },
    onSelect: function (rowIndex, rowData) {
      drawHospitalTree("#hospital_chart", rowData.name, rowData.id);
      $('#hospital_info').html(rowData.profiles);
      updateeachHospitalNews(rowData.name);
    }     
  })
   .datagrid('getPager').pagination({
        beforePageText: '第 ',//页数文本框前显示的汉字 
        afterPageText: ' 页，共 {pages} 页',
        displayMsg: ''
      });
 }

 function updateeachHospitalNews(hospital_name){
  $.ajax(
  {  
   //url:"deptController/getHospitalNews",
   url:"../jsonp/getHospitalNews.json",
   method: "GET",
   /*data: {'hospital_name': hospital_name},*/
   dataType:"json",  
   async: false,  
   success:function(data)  
   {
    $('#hospital_news').empty();
    $.each(data.newsList, function(i,val){
      $('#hospital_news').append("<li><a target='_blank' href='"+val.source_url+"'>"+val.title+"</a></li>");
    }); 
  },
  error:function(){
    result = "暂无详细信息！";
  }
});
}

function drawHospitalTree(divDom, hospital_name, hospital_id){
  $(divDom).empty();
  var divwidth = $(divDom).width();

  if(typeof(hospital_name) == "undefined"){
    hospital_name="";
  }
  
  var margin = {top: 20, right: 120, bottom: 20, left: 250},
  width = divwidth - margin.right - margin.left,
  height = 300 - margin.top - margin.bottom;
  
  var i = 0,
  duration = 300,
  root;

//  var tip = d3.tip()
//  .attr('class', 'd3-tip')
//    //.direction('e')
//    .offset([-10, 0])
//    .html(function(d) {
//      var result = "";
//      var cut_score = "";
//      var cur_node = "科室评分";
//      d.dept_gooddisease != null ? result = result + "<strong>擅长疾病:</strong> <span style='color:red'>" + d.dept_gooddisease + "</span><br>" : ""; 
//      if(d.score != null){
//        var val = d.score;
//        var left = 5 - val;l
//        val = val >= 5 ? 5 : val;
//        for(i=0; i < val; i++){
//          cut_score=cut_score+"★";
//        }
//        for(i=0; i < left; i++){
//          cut_score=cut_score+"☆";
//        }
//      } 
//      if(!d.parent){
//        cur_node = "医院评分";
//      }
//      d.score != null ? result = result + "<strong>"+cur_node+":</strong> <span style='color:red'>" + cut_score + "</span><br>" : "";
//      d.resource != null ? result = result + "<strong>资源投入:</strong> <span style='color:red'>" + d.resource + "</span>" : "";
//      return result;
//    });
    
    var tree = d3.layout.tree()
    .size([height, width]);

    var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select(divDom).append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", '348')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//    svg.call(tip);
    
    //d3.json("deptController/getHospitalStructureTreeLevelList?hospital_name="+hospital_name, function(error, flare) {
    //d3.json("../jsonp/getHospitalStructureTreeLevelList.json", function(error, flare) {
      d3.json("../../medical/DecisionSupportDeptStructureTreeLevel.action?hospitalId="+hospital_id, function(error, flare) {
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
      //.data(nodes, function(d) { return d.id || (d.id = ++i); });
      .data(nodes, function(d) { return d.name; });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

       nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "#0e577a" : "#0e577a"; })
      .on("click",function(node){
        link.style("stroke",function(line){
          console.log(line,node)
            if(line.source.name==node.name || line.target.name==node.name){
                return '18c2d9';
            }else{
                return '0e577a';
            }
        });
       });
//      .on("mouseover",tip.show)
//      .on("mouseout",tip.hide);
      nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name+"("+d.doctorNum+"人)"; })
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
  
  $('#matchBtn').bind("click", function() {
    var hoslistId=[];
    var hoslistName=[];
    $('#pklist li').each(function(i, val){
      //hoslist.push($(this).title);
    	hoslistId.push(encodeURIComponent(val.title));
    	hoslistName.push((val.innerText));
    });
    if($('#pklist li').length >=2){
        //console.log(hoslist[0])
        //console.log(hoslist[1]);
     //自己修改前的方法 location.href='returnContrastPage?hospitalA='+hoslist[0]+"&hospitalB="+hoslist[1];
     // top.location.href='../html/returnContrastPage.html'
    	//上面一行是原来的方法
    	top.location.href='../html/returnContrastPage.html?hospitalA='+hoslistId[0]+'&nameA='+hoslistName[0]+'&hospitalB='+hoslistId[1]+'&nameB='+hoslistName[1];
     // window.open('returnContrastPage?hospitalA='+hoslist[0]+"&hospitalB="+hoslist[1]);
    }
    else
    {
      alert("请选择两两对比 医院列表。");
    }
  });
  $(document).on("click","#pklist li a",function(){   
    $(this).parent("li").remove();
    //drawRightInfo($(this).parent("li").children("a").text());
  });
});

function chooseRow(row, id){  
  if($('#pklist li').length >=2){
    alert("仅支持两两对比。");
  }
  else if($('#pklist li').length == 0){   
    $('#pklist').append("<li title='" + id + "'>"+row+"<a href='#' title='删除该项'><i class='iconfont'>&#xe611;</i></a></li>");
  }
  else
  {
    $('#pklist li').each(function(){
      if($(this).text() != row){
        $('#pklist').append("<li title='" + id + "'>"+row+"<a href='#' title='删除该项'><i class='iconfont'>&#xe611;</i></a></li>");
      }
    })
  }
};
