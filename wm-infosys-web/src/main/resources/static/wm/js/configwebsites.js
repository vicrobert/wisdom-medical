/**
 * Website Template Configuration
 * by YangJunbo
 */
$(document).ready(function() {
	var currentPage = 1;
	var pageSize = 15;
	var totalPage = 1;
	
	listWebsiteTemplates();
	
	function listWebsiteTemplates() {
		$.ajax({
			url:"../../WebSpider/WebTemplate",
			method: "GET",
			data: {
				'page': currentPage,
				'rows': pageSize
			},
			dataType:"json",  
			async: false,  
			success:function(data) {
				if (data != undefined && data.rows != undefined) {
					currentPage = data.page;
					totalPage = Math.ceil(data.total / pageSize);
					var item = '<tr class="table-title">\
	                    <th height="38" align="center" valign="middle">序号</th>\
	                    <th align="center" valign="middle">应用ID</th>\
	                    <th align="center" valign="middle">任务名称</th>\
	                    <th align="center" valign="middle">采集网站</th>\
	                    <th align="center" valign="middle">网站域名</th>\
	                    <th align="center" valign="middle">网站域名</th>\
	                    <th align="center" valign="middle">字符编码集</th>\
	                    <th align="center" valign="middle">类型</th>\
	                    <th align="center" valign="middle">采集模版</th>\
	                    <th align="center" valign="middle">添加时间</th></tr>';
					$.each(data.rows, function(i, val) {
						item += '<tr class="table-con" onmouseover="this.className=table-con1" onmouseout="this.className=table-con"><td height="38" align="center" valign="middle">' + val.id + '</td>\
						<td align="center" valign="middle">' + val.appId + '</td><td align="center" valign="middle">' + val.taskName + '</td><td align="center" valign="middle">' + val.webName+ '</td>\
						<td align="center" valign="middle">' + val.url + '</td><td align="center" valign="middle">' + val.sampleFreq + '</td><td align="center" valign="middle">' + val.charset + '</td>\
						<td align="center" valign="middle">' + val.type + '</td><td align="center" valign="middle">' + val.tempLocation + '</td>\
						<td align="center" valign="middle" class="addcompare">' + val.updatedAt + '</td></tr>';
					});
					$('#webTempTable').empty();
					$('#webTempTable').append(item);
					$('#current-page').val(data.page);
					$('#total-page').val(totalPage);
				}
			}
		});
	}
	
	$("#addcollection_button").click(function() {
		var taskname = $("#taskName").val();
		var webname = $("#webName").val();
		var siteurl = $("#url").val();
		var samplef =$("input[name='sampleFreq']:checked").val();
		var selectedcharset = $("#selectCharset").find("option:selected").text();
		var selectedtype = $("#selectType").find("option:selected").text();
		var temploc = $("#tempLocation").val();
		$.ajax({
			url:"../../WebSpider/WebTemplate",
			method: "PUT",
			data: {
				'taskName': taskname,
				'webName': webname,
				'url': siteurl,
				'sampleFreq': samplef,
				'charset': selectedcharset,
				'type':selectedtype,
				'tempLocation':temploc
			},
			dataType:"json",
			success:function(data) {
				alert(data.message);
			},
			error:function() {
				alert('error');
			}
		});
	});
	
	
	$("#current-page").keydown(function(e) {
		var keycode = e.which || e.keyCode;
		if (keycode == 13) {
			currentPage = $("#current-page").val();
			listWebsiteTemplates();
		}
		if((keycode < 48 && keycode != 8 && keycode != 46) || keycode > 57) {
			window.event.keyCode = 0;
			window.event.returnValue = false;
		}
	});

	$("#firstpage-button").click(function() {
		currentPage = 1;
		listWebsiteTemplates();
	});

	$("#backpage-button").click(function() {
		currentPage -= 1;
		if (currentPage < 1)
			currentPage = 1;
		listWebsiteTemplates();
	});

	$("#nextpage-button").click(function() {
		currentPage += 1;
		if (currentPage > totalPage)
			currentPage = totalPage;
		listWebsiteTemplates();
	});
	 
	$("#lastpage-button").click(function() {
		currentPage = totalPage;
		listWebsiteTemplates();
	});
});


