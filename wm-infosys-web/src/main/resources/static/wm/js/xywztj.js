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

var currentPage = 1;
var totalPage = 1;
var pageSize = 3;

findHospital("");
top4Hospitals();

function findHospital(hospital_name){
	$.ajax(
	{
		url:"../../medical/DecisionSupportHospitalInfo.action",
		method: "GET",
		data: {
			'hospitalName': hospital_name,
			'page': currentPage,
			'rows': pageSize
		},
		dataType:"json",  
		async: false,  
		success:function(data) {
			$('#hospitalList').empty();
			currentPage = data.page;
			totalPage = Math.ceil(data.total / pageSize);
			$.each(data.rows, function(i,val){
				var starSpan = "";
				if (val.stars == null || val.stars == "undefined") {
					val.stars = "0";
				}
				var star = Math.floor(parseInt(val.stars) / 2);
				if (star > 5) {
				   star = 5;
				} else if (star < 0) {
					star = 0;
				}
				for (var j=0; j < star; j ++) {
					starSpan += '<span><img src="../images/star.png" border="0"></span>';
				}
				for (var j=star; j < 5; j ++) {
					starSpan += '<span><img src="../images/star1.png" border="0"></span>';
				}
				var item='<li>\
				               <table width="100%" cellpadding="0" cellspacing="0">\
				                   <tr>\
				                       <td width="230" height="176" align="left" valign="middle"><img src="../images/pic1.png" border="0" /></td>\
				                       <td align="left" valign="middle">\
				                           <div class="con-table-div"><span onclick="javascript:top.window.location=\'hospitalinformation.html\'" class="hospital-title">'+val.name+'</span><span class="hospital-title-select">['+val.hospitalClass+']</span></div>\
				                           <div class="con-table-div"><span class="hospital-content-title">网址：</span><span class="hospital-content-text">'+val.website+'</span></div>\
				                           <div class="con-table-div"><span class="hospital-content-title">地址：</span><span class="hospital-content-text">'+val.address+'</span></div>\
				                           <div class="con-table-div"><span class="hospital-content-title">电话：</span><span class="hospital-content-text">'+val.tel+'</span></div>\
				                           <div class="con-table-div"><span class="hospital-content-title">科室数量：</span><span class="hospital-content-number">'+val.departmentNum+'</span></div>\
				                           <div class="con-table-div"><span class="hospital-content-title">人员规模：</span><span class="hospital-content-number">'+val.doctorNum+'</span><span class="hospital-content-text">人</span></div>\
				                           <div class="con-table-div"><span class="hospital-content-title">重点科室：</span><span class="hospital-content-text">'+val.featureDepartment+'</span></div>\
				                       </td>\
				                       <td width="136" align="center" valign="middle">';
				item += starSpan;
	            item += '</td>\
	                                   </tr>\
	                               </table>\
	                           </li>';
	            $('#hospitalList').append(item);
            });
			$('#current-page').val(data.page);
			$('#total-page').val(totalPage);
        },
        error:function(){
        	result = "暂无详细信息！";
        }
	});
}

$("#current-page").keydown(function(e) {
	var keycode = e.which || e.keyCode;
	if (keycode == 13) {
		currentPage = $("#current-page").val();
		findHospital("");
	}
	if((keycode < 48 && keycode != 8 && keycode != 46) || keycode > 57) {
		window.event.keyCode = 0;
		window.event.returnValue = false;
	}
});

$("#firstpage-button").click(function() {
	currentPage = 1;
	findHospital("");
});

$("#backpage-button").click(function() {
	currentPage -= 1;
	if (currentPage < 1)
		currentPage = 1;
	findHospital("");
});

$("#nextpage-button").click(function() {
	currentPage += 1;
	if (currentPage > totalPage)
		currentPage = totalPage;
	findHospital("");
});
 
$("#lastpage-button").click(function() {
	currentPage = totalPage;
	findHospital("");
});


function top4Hospitals() {
	$.ajax(
	{
		url:"../../medical/Top4HospitalsLastWeek",
		method: "GET",
		dataType:"json",  
		async: false,  
		success:function(data) {
			$("#top4hospital").empty();
			if (data != undefined && data.rows != null) {
				$.each(data.rows, function(i,val){
					var item = '<div class="con-table-title">\
	                                <table width="100%" cellpadding="0" cellspacing="0">\
	                                    <tr>\
	                                        <td width="130" height="100" align="left" valign="middle"><img src="../images/week1.png" border="0" /></td>\
	                                        <td align="left" valign="middle">\
	                                            <div class="con-table-div"><span class="hospital-title">' + val.hospitalName + '</span></div>\
	                                            <div class="con-table-div"><span class="hospital-content-text">' + val.hospitalLevel + '</span></div>\
	                                            <div class="con-table-div"><span class="hospital-content-title">' + val.hospitalAddress + '</span></div>\
	                                        </td>\
	                                        <td width="70" align="center" valign="middle">\
	                                            <div class="hospital-circle">' + (i + 1) + '</div>\
	                                            <div class="hospital-content-title">' + val.askNum + '</div>\
	                                        </td>\
	                                    </tr>\
	                                </table>\
	                            </div>';
					$("#top4hospital").append(item);
				});
			}
		}
	});
}


});


