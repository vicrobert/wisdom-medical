// 图表控制
function contrastChart() {
    var ajaxHandler = ajaxDataController(),
        echartshandler = echartsInterface(),
        //同期对比分析
        //GET_CONTRASTANALYZE_CHART_URL = "../../test/data/contrast/getcontrastanalyzecharturl.json";
        //GET_CONTRASTANALYZE_CHART_URL = $.getWebRootPath('disease-web/analysis/historyYOYMatch').replace('medapp/','');
        //GET_CONTRASTANALYZE_CHART_URL = "../jsonp/getcontrastanalyzecharturl.json";
        GET_CONTRASTANALYZE_CHART_URL = "../../medical/DiseaseContrastAnalysis";

    function showChart() {

        echartshandler.columnLine(GET_CONTRASTANALYZE_CHART_URL, getParams(), "contrastanalyze", "custom", "", false);

        ajaxHandler.select(GET_CONTRASTANALYZE_CHART_URL, getParams(), function(data) {
        	if (data != undefined) {
	            $(".table-hover").empty();
	            $.get('../jsonp/contrastTable.tmpl', function(tmpl) {
	
	                $.tmpl(tmpl, data).prependTo(".table-hover");
	            })
	            //refresh table
	            //by YangJunbo
	            if (data.xaxis.length > 0) {
		            $("#contrastTableHeader").append('<th height="38" align="center"></th>');
		            $.each(data.xaxis, function(i, val) {
		            	$("#contrastTableHeader").append('<th align="center">' + val + '</th>');
		            });
	            }
	            if (data.date.length == 4 && data.type.length == 2) {
	            	$("#contrastTableRow1").append('<td height="38" align="center" style="color: #6698ca;">' + data.type[0] + '</td>');
	            	$.each(data.date[0], function(i, val) {
	            		$("#contrastTableRow1").append('<td align="center">' + val + '</td>');
	            	});
	            	$("#contrastTableRow2").append('<td height="38" align="center" style="color: #6698ca;">' + data.type[1] + '</td>');
	            	$.each(data.date[1], function(i, val) {
	            		$("#contrastTableRow2").append('<td align="center">' + val + '</td>');
	            	});
	            	$("#contrastTableRow3").append('<td height="38" align="center" style="color:#6698ca;">差值</td>');
	            	$.each(data.date[2], function(i, val) {
	            		if (val.ud == '+') {
	            			$("#contrastTableRow3").append('<td class="differentcolor" align="center">' + val.num + '</td>');
	            		} else {
	            			$("#contrastTableRow3").append('<td align="center">' + val.num + '</td>');
	            		}
	            	});
	            	$("#contrastTableRow4").append('<td height="38" align="center" style="color:#6698ca;">同比</td>');
	            	$.each(data.date[3], function(i, val) {
	            		if (val.ud == '+') {
	            			$("#contrastTableRow4").append('<td class="differentcolor" align="center">' + val.num + '</td>');
	            		} else {
	            			$("#contrastTableRow4").append('<td align="center">' + val.num + '</td>');
	            		}
	            	});
	            }
        	}
            
        })
    }

    function getParams() {

        var params = {
            'disease': $("#disease").val(),
            'community': $("#community").val(),
            'selectType': $("#selectType").val(),
            'year': $("#year").val(),
            'showType': $("#showType").val()
        }
        return params;
    }

    return {
        'showChart': function() {
            showChart()
        }
    }
}