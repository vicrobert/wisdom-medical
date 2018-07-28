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

findDoctor("");
top4Doctors();

function findDoctor(doctor_name){
	$.ajax(
    {
		url:"../../medical/SearchDocAndMedDoctorInfo.action",
		method: "GET",
		data: {
			'doctorName': doctor_name,
			'page': currentPage,
			'rows': pageSize
		},
		dataType:"json",  
		async: false,  
		success:function(data) {
			$('#doctorList').empty();
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
							<td width="158" height="176" align="left" valign="middle"><img src="../images/docotor1.png" border="0" /></td>\
								<td align="left" valign="middle">\
									<div class="con-table-div"><span onclick="javascript:top.window.location=doctordetails.html" class="hospital-title">'+val.name+'</span><span class="hospital-title-select">['+val.level+']</span></div>\
									<div class="con-table-div"><span class="hospital-content-text">'+val.hospitalName+'</span></div>\
									<div class="con-table-div"><span class="hospital-content-title">'+val.departmentName+'</span></div>\
									<div class="con-table-div"><span class="hospital-content-title">'+val.goodAt+'</span></div>\
								</td>\
							<td width="136" align="center" valign="middle"><div>';
				item += starSpan;
				item += '</div>\
							<div><span class="hospital-title">'+val.evaluateNum+'</span><span class="hospital-content-title">人点评</span></div>\
	                      </td>\
	                  </tr>\
					</table></li>';
	              
				$('#doctorList').append(item);
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
		findDoctor("");
	}
	if((keycode < 48 && keycode != 8 && keycode != 46) || keycode > 57) {
		window.event.keyCode = 0;
		window.event.returnValue = false;
	}
});

$("#firstpage-button").click(function() {
	currentPage = 1;
	findDoctor("");
});

$("#backpage-button").click(function() {
	currentPage -= 1;
	if (currentPage < 1)
		currentPage = 1;
	findDoctor("");
});

$("#nextpage-button").click(function() {
	currentPage += 1;
	if (currentPage > totalPage)
		currentPage = totalPage;
	findDoctor("");
});
 
$("#lastpage-button").click(function() {
	currentPage = totalPage;
	findDoctor("");
});  

function top4Doctors() {
	$.ajax(
	{
		url:"../../medical/Top4DoctorsLastWeek",
		method: "GET",
		dataType:"json",  
		async: false,  
		success:function(data) {
			$("#top4doctors").empty();
			if (data != undefined && data.rows != null) {
				$.each(data.rows, function(i,val){
					var item = '<div class="con-table-title">\
                        <table width="100%" cellpadding="0" cellspacing="0">\
		                    <tr>\
		                        <td width="110" height="120" align="left" valign="middle"><img src="../images/doctor1.png" border="0" /></td>\
		                        <td align="left" valign="middle">\
		                            <div class="con-table-div"><span class="hospital-title">' + val.doctorName + '</span></div>\
		                            <div class="con-table-div"><span class="hospital-content-text">' + val.hospitalName + '</span></div>\
		                            <div class="con-table-div"><span class="hospital-content-title">' + val.memo + '</span></div>\
		                        </td>\
		                        <td width="70" align="center" valign="middle">\
		                            <div class="hospital-circle">' + (i + 1) + '</div>\
		                            <div class="hospital-content-title">' + val.askNum + '</div>\
		                        </td>\
		                    </tr>\
		                </table>\
		            </div>';
					$("#top4doctors").append(item);
				});
			}
		}
	});
}

 
});


