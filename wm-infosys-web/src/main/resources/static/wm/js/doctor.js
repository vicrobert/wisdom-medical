$(document).ready(function() {

    $.ajax({
        url: "../viDoctorController/findDoctorById",
        method: "GET",
       /* data: {
            'doctor_id': $('#doctor_id').val()
        },*/
        dataType: "json",
        async: false,
        success: function(data) {
            $("title").html(data.name);
            img = 'photo-girl';

            if (data.sex === '男') {
                img = 'photo-boy'
            }
            $('#detailDocInfo').empty().html("<img src='../resources/images/visitor/"+img+".jpg'><div class='doctor-info'><div class='doctor-info-name'><a href='#'>" + data.name + "</a><span>[" + data.position + "]</span><em class='star'>" + formatScore(data.score) + "</em><div class='doctor-comment-num'><a href='#'>" + data.total + "人</a>点评</div></div><div class='doctor-info-other'><a href='#'>" + data.hospital_name + "</a><span>" + data.department_name + "</span><p>" + data.good + "</p></div></div>");
            $('#doctor_resume').empty().html(data.experience);
        }
    });

    $.ajax({
        //url: "../viDocClinicController/getOutpatientTimeById",
        url: "../jsonp/getOutpatientTimeById.json",
        method: "GET",
        /*data: {
            'doctor_id': $('#doctor_id').val()
        },*/
        dataType: "json",
        async: false,
        success: function(data) {
            $('#dateList').empty();
            $('#dateList').append("<th><a href='#' class='back'></a></th>");
            $.each(data.dList, function(i, val) {
                week = "";
                switch (i) {
                    case 0:
                        week = "周日";
                        break;
                    case 1:
                        week = "周一";
                        break;
                    case 2:
                        week = "周二";
                        break;
                    case 3:
                        week = "周三";
                        break;
                    case 4:
                        week = "周四";
                        break;
                    case 5:
                        week = "周五";
                        break;
                    case 6:
                        week = "周六";
                        break;
                }

                $('#dateList').append("<th>" + val + "<br />" + week + "</th>");
            });
            $('#dateList').append("<th><a href='#' class='forward'></a></th>");
            //门诊时间列表
            $('#morning_clinic').empty();
            $('#morning_clinic').append("<td>上午</td>");

            $('#after_clinic').empty();
            $('#after_clinic').append("<td>上午</td>");

            $.each(data.mornintClinic, function(i, val) {
                if (val == 'Y') {
                    $('#morning_clinic').append("<td><span class='can-see-doctor'></span></td>");
                } else {
                    $('#morning_clinic').append("<td><span></span></td>");
                }
            });

            $.each(data.afternoonClinic, function(i, val) {
                if (val == 'Y') {
                    $('#after_clinic').append("<td><span class='can-see-doctor'></span></td>");
                } else {
                    $('#after_clinic').append("<td><span></span></td>");
                }
            });
        }
    });

    $.ajax({
        //url: "../patientfbController/getAllCountById",
        url: "../jsonp/getAllCountById.json",
        method: "GET",
        /*data: {
            'doctor_id': $('#doctor_id').val()
        },*/
        dataType: "json",
        async: false,
        success: function(data) {
            //$('#feedback_count').empty();
            $.each(data.categoryList, function(i, val) {
                if (val.name == '全部') {
                    $('#fb_all').text("全部(" + val.total + ")");
                } else if (val.name == '好') {
                    $('#fb_good').text("好评(" + val.total + ")");
                } else if (val.name == '中') {
                    $('#fb_soso').text("中评(" + val.total + ")");
                } else if (val.name == '差') {
                    $('#fb_bad').text("差评(" + val.total + ")");
                }
            });
        }
    });

    $.ajax({
       // url: "../patientfbController/getfeedbackById",
        url: "../jsonp/getfeedbackById.json",
        method: "GET",
        /*data: {
            'doctor_id': $('#doctor_id').val()
        },*/
        dataType: "json",
        async: false,
        success: function(data) {
            $('#feedback_list').empty();
            $.each(data.patientfbList, function(i, val) {
                $('#feedback_list').append("<div class='comment-text-item'><img src='../images/user-photo.jpg'><div class='comment-space'><div class='comment-info-name'><label>就诊医生：</label><a href='#'>" + $('#doctor_id').val() + "</a><span>就诊原因：</span><span>" + val.disease + "</span><em class='star'>☆☆☆☆☆</em><p class='text'>" + val.comment + "</p><p class='comment-time'>" + val.name + "发表于" + val.time + "</p></div></div></div>");
            });
            $("#fbpager").pager({
                pagenumber: 1,
                pagecount: data.pages,
                buttonClickCallback: fbPageClick
            });
        }
    });

})

$("#feedback_count").on("click", "li", function() {
    $(this).addClass("comment-active").siblings("li").removeClass("comment-active");
    if ($(this).text().substring(0, 1) == '全') {
        var params = {
            'doctor_id': $('#doctor_id').val()
        };
    } else {
        var params = {
            'doctor_id': $('#doctor_id').val(),
            'attitude': $(this).text().substring(0, 1)
        };
    }
    $.ajax({
        //url: "../patientfbController/getfeedbackById",
        url: "../jsonp/getfeedbackById.json",
        method: "GET",
       // data: params,
        dataType: "json",
        async: false,
        success: function(data) {
            $('#feedback_list').empty();
            $.each(data.patientfbList, function(i, val) {
                $('#feedback_list').append("<div class='comment-text-item'><img src='../images/user-photo.jpg'><div class='comment-space'><div class='comment-info-name'><label>就诊医生：</label><a href='#'>" + $('#doctor_id').val() + "</a><span>就诊原因：</span><span>" + val.disease + "</span><em class='star'>☆☆☆☆☆</em><p class='text'>" + val.comment + "</p><p class='comment-time'>" + val.name + "发表于" + val.time + "</p></div></div></div>");
            });
            $("#fbpager").pager({
                pagenumber: 1,
                pagecount: data.pages,
                buttonClickCallback: fbPageClick
            });
        }
    });
});

function formatScore(score) {
    var result = '★★★★★'.substring(0, score);
    result += '☆☆☆☆☆'.substring(0, (5 - score));
    return result;
}

fbPageClick = function(pageclickednumber) {
    var catetype = $("#feedback_count li[class='current']").text();
    if (catetype.substring(0, 1) == '全') {
        var params = {
            page: pageclickednumber,
            limit: 5,
            'doctor_id': $('#doctor_id').val()
        };
    } else {
        var params = {
            page: pageclickednumber,
            limit: 5,
            'doctor_id': $('#doctor_id').val(),
            'attitude': catetype.substring(0, 1)
        };
    }

    $.ajax({
       // url: "../patientfbController/getfeedbackById",
        url: "../jsonp/getfeedbackById.json",
        method: "GET",
       // data: params,
        dataType: "json",
        async: false,
        success: function(data) {
            $('#feedback_list').empty();
            $.each(data.patientfbList, function(i, val) {
                $('#feedback_list').append("<div class='comment-text-item'><img src='../images/user-photo.jpg'><div class='comment-space'><div class='comment-info-name'><label>就诊医生：</label><a href='#'>" + $('#doctor_id').val() + "</a><span>就诊原因：</span><span>" + val.disease + "</span><em class='star'>☆☆☆☆☆</em><p class='text'>" + val.comment + "</p><p class='comment-time'>" + val.name + "发表于" + val.time + "</p></div></div></div>");
            });
            $("#fbpager").pager({
                pagenumber: pageclickednumber,
                pagecount: data.pages,
                buttonClickCallback: fbPageClick
            });
        }
    });
}