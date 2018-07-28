/**
 * Webspider monitor
 * by YangJunbo
 */
$(document).ready(function() {
	listDoctorRt();
	listDrugInfoRt();
	listInteractInfoRt();
	
	//getSampleTendencyGroupByMin();
	//getSampleTendencyGroupByDay();
	//getSampleStrength();
	getSampleTotalNum();
	getHealthStatus();
	getSystemLogRecent();
	
	function listDoctorRt() {
		$.ajax({
			url:"../../WebSpider/ListDoctorRt",
			method: "GET",
			data: {
				'page': 1,
				'rows': 25
			},
			dataType:"json",  
			async: false,  
			success:function(data) {
				if (data.rows != undefined) {
					$("#doctorinfolist").empty();
					$.each(data.rows, function(i, val) {
						$("#doctorinfolist").append('<div class="swiper-slide swiper-no-swiping"><li>' + val.name + ',' + val.level + ',' + val.hospitalName + ',' + val.departmentName + ',' + val.goodAt + '</li></div>');
					});
				}
			}
		});
	}
	
	function listDrugInfoRt() {
		$.ajax({
			url:"../../WebSpider/ListDrugInfoRt",
			method: "GET",
			data: {
				'page': 1,
				'rows': 25
			},
			dataType:"json",  
			async: false,  
			success:function(data) {
				if (data.rows != undefined) {
					$("#druginfolist").empty();
					$.each(data.rows, function(i, val) {
						$("#druginfolist").append('<div class="swiper-slide swiper-no-swiping"><li>' + val.content + '</li></div>');
					});
				}
			}
		});
	}
	
	function listInteractInfoRt() {
		$.ajax({
			url:"../../WebSpider/ListInteractInfoRt",
			method: "GET",
			data: {
				'page': 1,
				'rows': 25
			},
			dataType:"json",  
			async: false,  
			success:function(data) {
				if (data.rows != undefined) {
					$("#interactinfolist").empty();
					$.each(data.rows, function(i, val) {
						$("#interactinfolist").append('<div class="swiper-slide swiper-no-swiping"><li>' + val.content + '</li></div>');
					});
				}
			}
		});
	}
	
//	function getSampleTendencyGroupByMin() {
//		$.ajax({
//			url:"../../WebSpider/GetSampleTendencyGroupByMin",
//			method: "GET",
//			dataType:"json",
//			async: false,
//			success:function(data) {
//
//			}
//		});
//	}
//
//	function getSampleTendencyGroupByDay() {
//		$.ajax({
//			url:"../../WebSpider/GetSampleTendencyGroupByDay",
//			method: "GET",
//			dataType:"json",
//			async: false,
//			success:function(data) {
//
//			}
//		});
//	}
//
//	function getSampleStrength() {
//		$.ajax({
//			url:"../../WebSpider/GetSampleStrength",
//			method: "GET",
//			dataType:"json",
//			async: false,
//			success:function(data) {
//
//			}
//		});
//	}
	
	function getSampleTotalNum() {
		$.ajax({
			url:"../../WebSpider/GetSampleTotalNum",
			method: "GET",
			dataType:"json",  
			async: false,  
			success:function(data) {
				if (data != undefined) {
					$("#sampletotalnum").empty();
					$("#sampletotalnum").append('<li class="doctorcollection">医生采集数：<span>' + data.docNum+ '</span></li>');
					$("#sampletotalnum").append('<li class="drugcollectionnumber">药品采集数：<span>' + data.drugNum + '</span></li>');
				}
			}
		});
	}
	
	function getHealthStatus() {
		$.ajax({
			url:"../../WebSpider/GetHealthStatus",
			method: "GET",
			data: {
				'page': 1,
				'rows': 6
			},
			dataType:"json",  
			async: false,  
			success:function(data) {
				if (data.status != undefined) {
					$("#websitestatus").empty();
					$.each(data.status, function(i, val) {
						if (val.status == 0) {
							$("#websitestatus").append('<li><span>良</span><p>' + val.webName + '</p></li>');
						} else if(val.status == 1) {
							$("#websitestatus").append('<li><span>异常</span><p>' + val.webName + '</p></li>');
						} else {
							$("#websitestatus").append('<li><span>未知</span><p>' + val.webName + '</p></li>');
						}
					});
				}
			}

		});
	}
	
	function getSystemLogRecent() {
		$.ajax({
			url:"../../WebSpider/GetSystemLogRecent",
			method: "GET",
			data: {
				'page': 1,
				'rows': 5
			},
			dataType:"json",  
			async: false,  
			success:function(data) {
				if (data.logs != undefined) {
					$("#sysmessagelist").empty();
					$.each(data.logs, function(i, val) {
						if (val.level == 2) {
							$("#sysmessagelist").append('<li class="error-msg">[错误]' + val.updatedAt + ' ' + val.content + '</li>');
						} else if(val.level == 1) {
							$("#sysmessagelist").append('<li class="warn-msg">[警告]' + val.updatedAt + ' ' + val.content + '</li>');
						}
					});
				}
			}
		});
	}
	
});