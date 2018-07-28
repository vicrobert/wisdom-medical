$(document).ready(function() {
    initHospitalLevel();
    initDepartment();
    initHospitalList();
    initDept();
    initHotspotFeedback();

    // 快捷键监听
    $('#search_value').keyup(function(e) {
        if (e.keyCode === 13) {
            $('#search_btn').trigger("click");
        }
    });
})


function formatScore(score) {
    var result = '★★★★★'.substring(0, score);
    result += '☆☆☆☆☆'.substring(0, (5 - score));
    return result;
}
//var getTop5FeedbackOneWeek={"patientfbList":[]};
function initHotspotFeedback() {
    $.ajax({
        url: "../jsonp/getTop5FeedbackOneWeek.json",
        method: "GET",
        dataType: "json",
        async: false,
        success: function(data) {
            $.each(data.patientfbList, function(i, val) {
                var m = i + 1,
                    img = 'photo-girl';

                if (val.sex === '男') {
                    img = 'photo-boy'
                }

                $('#hotspot_feedback').append("<div class='doctor-hot-item'><img src='../resources/images/visitor/" + img + ".jpg'><div class='doctor-hot-info'><div class='doctor-hot-info-name'><a class='doctor-name'>" + val.name + "</a><a class='comment-ranking'>" + m + "</a><span>" + val.total + "</span></div><div class='doctor-hot-info-other'><p>" + val.hospital_name + "</p><p>" + val.department_name + "</p></div></div></div>");
            });
        }
    });
}


$("#city_list").on("click", "ul li a", function() {

    $("#city_list > ul > li").removeClass('current');
    $(this).parent().addClass('current');
    $('.change-city').html($(this).text()+" [更换]");
    $('#current_city').html($(this).text());
    $(".city-list").hide();
    $("#search_btn").trigger("click");
});

$("#search_btn").on("click", function() {
    var type = $("#search_type li[class='current']").attr("id");
    var value = $("#search_value").val();
    if (type == "0") {
        var current_id = $("#hospital_sort_item a[class='current']").attr("id");
        var params = {
            page: 1,
            limit: 10,
            order: current_id,
            city: $('#current_city').text(),
            hospital_level: filter,
            hospital_name: value
        };
        findHospitalList(params);
    } else if (type == "1") {
        var filter = $("#dept_filter_zone a em").text();
        var current_id = $("#dept_sort_item a[class='current']").attr("id");
        var params = {
            page: 1,
            limit: 10,
            order: current_id,
            city: $('#current_city').text(),
            pdepartment_name: filter,
            department_name: value
        };
        findDeptList(params);
    } else if (type == "2") {
        var filter = $("#doc_filter_zone a em").text();
        var current_id = $("#doc_sort_item a[class='current']").attr("id");
        var params = {
            page: 1,
            limit: 10,
            order: current_id,
            city: $('#current_city').text(),
            department_name: filter,
            doctor_name: value
        };
        findDoctorList(params);
    }
});

$('#tabs').find("li").bind("click", function() {

    var type = $("#search_type li[class='current']").attr("id"),
        activeindex = $('#tabs').find("li").index(this),
        filter = $("#doc_filter_zone a em").text(),
        params = {
            page: 1,
            limit: 10,
            city: $('#current_city').text()
        };

    $(this).addClass("current").siblings("li").removeClass("current");

    if (activeindex == "0") {

        $("#search_value").attr("placeholder","可输入医院关键字查询");
        findHospitalList(
            $.extend({}, params, {
                order: $("#hospital_sort_item a[class='current']").attr("id"),
                hospital_level: filter,
                hospital_name: $("#search_value").val()
            })
        );
    } else if (activeindex == "1") {

        $("#search_value").attr("placeholder","可输入科室关键字查询");
        findDeptList($.extend({}, params, {
            order: $("#dept_sort_item a[class='current']").attr("id"),
            city: $('#current_city').text(),
            pdepartment_name: filter,
            department_name: $("#search_value").val()
        }));

    } else if (activeindex == "2") {

        $("#search_value").attr("placeholder","可输入医生关键字查询");
        findDoctorList($.extend({}, params, {
            order: $("#doc_sort_item a[class='current']").attr("id"),
            department_name: filter,
            doctor_name: $("#search_value").val()
        }));
    }
});

//初始化医院等级菜单可选项
function initHospitalLevel() {
    $.ajax({
        //: "../viHospitalController/getAllHospitalLevel",
        url: "../jsonp/getAllHospitalLevel.json",
        method: "GET",
        dataType: "json",
        async: false,
        success: function(data) {
            $.each(data, function(i, val) {
                $('#hos_level_list').append("<a href='#'>" + val.level + "</a>");
            });
        }
    });
}

//初始化科室菜单可选项
function initDepartment() {
    $.ajax({
       // url: "../viDeptController/getAllFirstLevelDepts",
        url: "../jsonp/getAllFirstLevelDepts.json",
        method: "GET",
        dataType: "json",
        async: false,
        success: function(data) {
            $.each(data, function(i, val) {
                $('#doc_dept_list').append("<a href='#'>" + val.name + "</a>");
                $('#dept_list').append("<a href='#'>" + val.name + "</a>");
            });
        }
    });
}

//找医院
function findHospitalList(params) {
    $('#hospital_list').empty();
    $('#hospital_list').prepend("<div align='center'><img src='../resources/images/dataLoading.gif'></div>");
    $.ajax({
       // url: "../viHospitalController/findHospitalList",
        url: "../jsonp/findHospital.json",
        method: "GET",
       // data: params,
        dataType: "json",
        async: false,
        success: function(data) {
            $('#hospital_list').empty();
            $.each(data.rows, function(i, val) {
                var level = val.level ? '<span>[' + val.level + ']</span>' : '';
                $('#hospital_list').append("<div class='hospital-item'><img src='../images/hospital.jpg' alt='医院名称'><div class='hospital-info'><div class='hospital-top'><h3><span class='baclk_history'  href='../html/goToHospitalDetailInfoPage.html ' value=" + val.id + "'>" + val.name + "</span></h3>" + level + "<em class='star'>" + formatScore(val.score) + "</em> </div><div class='hospital-bottom'><p>网址：http://www.sctcm120.com/zyxy/<br>地址：" + val.address + "<br>电话： 028-61360201<br></p><p>科室数量：<span class='fc-red'>" + val.dept_num + "</span><br>人员规模：<span class='fc-red'>" + val.doc_num + "</span>人<br>重点科室：针灸科、消化内科、心血管内科</p></div></div></div>");
            });

            $('#hos_total').text(data.total);
            $('#hos_current').text(1);
            $('#hos_pages').text(data.pages);
            $("#hospager").pager({
                pagenumber: 1,
                pagecount: data.pages,
                buttonClickCallback: HosPageClick
            });
        }
    });
    //定义跳转
    get_url();
}


function initHospitalList() {
    var filter = $("#hos_filter_zone a em").text();
    var current_id = $("#hospital_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: 1,
        limit: 10,
        sort: current_id,
        city: $('#current_city').text(),
        hospital_level: filter,
        hospital_name: type == "0" ? $("#search_value").val() : ""
    };
    findHospitalList(params);
}


$("#hos_level_list").on("click", "a", function() {
    $("#hos_level_list a").removeClass("current");
    $("#hos_level_list").addClass("current");
    $(this).addClass("current");
    $("#hos_filter_zone").empty().append("<a href='#' class='filter-select'><span>级别</span><em>" + $(this).text() + "</em><i>×</i></a>");
    var current_id = $("#hospital_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: 1,
        limit: 10,
        sort: current_id,
        city: $('#current_city').text(),
        hospital_level: $(this).text(),
        hospital_name: type == "0" ? $("#search_value").val() : ""
    };
    findHospitalList(params);
});

$("#hos_filter_zone").on("click", "a i", function() {
    $("#hos_filter_zone").empty();
    $("#hos_level_list a").removeClass("current");
    var current_id = $("#hospital_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: 1,
        limit: 10,
        sort: current_id,
        city: $('#current_city').text(),
        hospital_name: type == "0" ? $("#search_value").val() : ""
    };
    findHospitalList(params);
});

$('#hospital_sort_item').on("click", "a", function() {
    $(this).addClass("current").siblings("a").removeClass("current");
    var sortorder = $(this).attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var filter = $("#hos_filter_zone a em").text();
    var params = {
        page: 1,
        limit: 10,
        sort: sortorder,
        city: $('#current_city').text(),
        hospital_level: filter,
        hospital_name: type == "0" ? $("#search_value").val() : ""
    };
    findHospitalList(params);
});

//找科室
function findDeptList(params) {
    $('#department_list').empty();
    $('#department_list').prepend("<div align='center'><img src='../resources/images/dataLoading.gif'></div>");
    $.ajax({
        //url: "../viDeptController/findDeptList",
        url: "../jsonp/findDeptList.json",
        method: "GET",
        data: params,
        dataType: "json",
        async: false,
        success: function(data) {
            $('#department_list').empty();
            $.each(data.rows, function(i, val) {
                var level = val.level || '<span>[' + val.level + ']</span>';
                $('#department_list').append("<div class='hospital-item'><img src='../images/hospital.jpg' alt='医院名称'><div class='hospital-info'><div class='hospital-top'><h3><span class='baclk_history' href='../html/goToDeptDetailInfoPage.html' value="+ val.id + "'>" + val.name + "</span></h3><span>[国家重点]</span></div><div class='ks-bottom'><p><a href='#'>" + val.hospital_name + "</a>" + level + "<br>网址：<a href='#'>http://www.sctcm120.com/zyxy/</a><br>地址：" + val.address + "<span>电话： 028-61360201</span></p></div></div></div>");

            });
            //定义跳转

            $('#dept_total').text(data.total);
            $('#dept_current').text(1);
            $('#dept_pages').text(data.pages);
            $("#deptpager").pager({
                pagenumber: 1,
                pagecount: data.pages,
                buttonClickCallback: DeptPageClick
            });
        }
    });
    get_url();
}


function initDept() {
    var filter = $("#dept_filter_zone a em").text();
    var current_id = $("#dept_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: 1,
        limit: 10,
        sort: current_id,
        city: $('#current_city').text(),
        pdepartment_name: filter,
        department_name: type == "1" ? $("#search_value").val() : ""
    };
    findDeptList(params);
}


$("#dept_list").on("click", "a", function() {
    $("#dept_list a").removeClass("current");
    $("#dept_list").addClass("current");
    $(this).addClass("current");
    $("#dept_filter_zone").empty().append("<a href='#' class='filter-select'><span>科室</span><em>" + $(this).text() + "</em><i>×</i></a>");
    var current_id = $("#dept_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: 1,
        limit: 10,
        sort: current_id,
        city: $('#current_city').text(),
        pdepartment_name: $(this).text(),
        department_name: type == "1" ? $("#search_value").val() : ""
    };
    findDeptList(params);
});

$("#dept_filter_zone").on("click", "a i", function() {
    $("#dept_filter_zone").empty();
    $("#dept_list a").removeClass("current");
    var current_id = $("#dept_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: 1,
        limit: 10,
        sort: current_id,
        city: $('#current_city').text(),
        department_name: type == "1" ? $("#search_value").val() : ""
    };
    findDeptList(params);
});

$('#dept_sort_item').on("click", "a", function() {
    $(this).addClass("current").siblings("a").removeClass("current");
    var sortorder = $(this).attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var filter = $("#hos_filter_zone a em").text();
    var params = {
        page: 1,
        limit: 10,
        sort: sortorder,
        city: $('#current_city').text(),
        pdepartment_name: filter,
        department_name: type == "1" ? $("#search_value").val() : ""
    };
    findDeptList(params);
});

//找医生

function findDoctorList(params) {
    $('#doctor_list').empty();
    $('#doctor_list').prepend("<div align='center'></div>");
    $.ajax({
       // url: "../viDoctorController/findDoctorList",
        url: "../jsonp/findDoctor.json",
        method: "GET",
       // data: params,
        dataType: "json",
        async: false,
        success: function(data) {

            $('#doctor_list').empty();
            $.each(data.rows, function(i, val) {
                img = 'photo-girl';
                if (val.sex === '男') {
                    img = 'photo-boy'
                }
                $('#doctor_list').append("<div class='doctor-item'><img src='../images/"+img+".jpg'><div class='doctor-info'><div class='doctor-info-name'><span class='baclk_history' href='../html/goToDoctorDetailInfoPage.html' value=" + val.id + "'>" + val.name + "</span><span>[" + val.position + "]</span><em class='star'>" + formatScore(val.score) + "</em><div class='doctor-comment-num'><a href='#'>" + val.total + "人</a>点评</div></div><div class='doctor-info-other'><p>" + val.hospital_name + "</p><p>" + val.department_name + "</p><p>" + val.good + "</p></div></div></div>");
            });
            //定义跳转

            $('#doc_total').text(data.total);
            $('#doc_current').text(1);
            $('#doc_pages').text(data.pages);
            $("#pager").pager({
                pagenumber: 1,
                pagecount: data.pages,
                buttonClickCallback: PageClick
            });
        }
    });
    get_url();
}


function initDoctorList() {
    var filter = $("#doc_filter_zone a em").text();
    var current_id = $("#doc_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: 1,
        limit: 10,
        sort: current_id,
        city: $('#current_city').text(),
        department_name: filter,
        doctor_name: type == "2" ? $("#search_value").val() : ""
    };
    findDoctorList(params);
}


$("#doc_dept_list").on("click", "a", function() {
    $("#doc_dept_list a").removeClass("current");
    $("#doc_dept_list").addClass("current");
    $(this).addClass("current");
    $("#doc_filter_zone").empty().append("<a href='#' class='filter-select'><span>科室</span><em>" + $(this).text() + "</em><i>×</i></a>");
    var current_id = $("#doc_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: 1,
        limit: 10,
        order: 'position',
        city: $('#current_city').text(),
        department_name: $(this).text(),
        doctor_name: type == "2" ? $("#search_value").val() : ""
    };
    findDoctorList(params);
});

$("#doc_filter_zone").on("click", "a i", function() {
    $("#doc_filter_zone").empty();
    $("#doc_dept_list a").removeClass("current");
    var current_id = $("#doctor_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: 1,
        limit: 10,
        order: current_id,
        city: $('#current_city').text(),
        doctor_name: type == "2" ? $("#search_value").val() : ""
    };
    findDoctorList(params);
});

$('#doctor_sort_item').on("click", "a", function() {
    $(this).addClass("current").siblings("a").removeClass("current");
    var sortorder = $(this).attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var filter = $("#doc_filter_zone a em").text();
    var params = {
        page: 1,
        limit: 10,
        sort: sortorder,
        city: $('#current_city').text(),
        department_name: filter,
        doctor_name: type == "2" ? $("#search_value").val() : ""
    };
    findDoctorList(params);
});

PageClick = function(pageclickednumber) {
    var filter = $("#doc_filter_zone a em").text();
    var current_id = $("#doc_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: pageclickednumber,
        limit: 10,
        sort: current_id,
        city: $('#current_city').text(),
        department_name: filter,
        doctor_name: type == "2" ? $("#search_value").val() : ""
    };
    $('#doctor_list').empty();
    $('#doctor_list').prepend("<div align='center'><img src='../resources/images/dataLoading.gif'></div>");
    $.ajax({
       // url: "../viDoctorController/findDoctorList",
        url: "../jsonp/findDoctor.json",
        method: "GET",
       // data: params,
        dataType: "json",
        async: false,
        success: function(data) {
            $('#doctor_list').empty();
            $.each(data.rows, function(i, val) {
                img = 'photo-girl';

                if (val.sex === '男') {
                    img = 'photo-boy'
                }
                $('#doctor_list').append("<div class='doctor-item'><img src='../images/"+img+".jpg'><div class='doctor-info'><div class='doctor-info-name'><span class='baclk_history' href='../html/goToDoctorDetailInfoPage.html' value=" + val.id + "'>" + val.name + "</span><span>[" + val.position + "]</span><em class='star'>" + formatScore(val.score) + "</em><div class='doctor-comment-num'><a href='#'>" + val.total + "人</a>点评</div></div><div class='doctor-info-other'><p>" + val.hospital_name + "</p><p>" + val.department_name + "</p><p>" + val.good + "</p></div></div></div>");
            });

            $('#doc_total').text(data.total);
            $('#doc_current').text(pageclickednumber);
            $('#doc_pages').text(data.pages);
            $("#pager").pager({
                pagenumber: pageclickednumber,
                pagecount: data.pages,
                buttonClickCallback: PageClick
            });
        }
    });
    //定义跳转
    get_url();
}

HosPageClick = function(pageclickednumber) {
    var filter = $("#hos_filter_zone a em").text();
    var current_id = $("#hospital_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: pageclickednumber,
        limit: 10,
        sort: current_id,
        city: $('#current_city').text(),
        hospital_level: filter,
        hospital_name: type == "0" ? $("#search_value").val() : ""
    };
    $('#hospital_list').empty();
    $('#hospital_list').prepend("<div align='center'><img src='../resources/images/dataLoading.gif'></div>");
    $.ajax({
       // url: "../viHospitalController/findHospitalList",
        url: "../jsonp/findHospital.json",
        method: "GET",
      //  data: params,
        dataType: "json",
        async: false,
        success: function(data) {
            $('#hospital_list').empty();
            $.each(data.rows, function(i, val) {
                var level = val.level || '<span>[' + val.level + ']</span>';
                $('#hospital_list').append("<div class='hospital-item'><img src='../images/hospital.jpg' alt='医院名称'><div class='hospital-info'><div class='hospital-top'><h3><span class='baclk_history' href='../html/goToHospitalDetailInfoPage.html‘ value=" + val.id + "'>" + val.name + "</span></h3>" + level + "<em class='star'>" + formatScore(val.score) + "</em> </div><div class='hospital-bottom'><p>网址：http://www.sctcm120.com/zyxy/<br>地址：" + val.address + "<br>电话： 028-61360201<br></p><p>科室数量：<span class='fc-red'>" + val.dept_num + "</span><br>人员规模：<span class='fc-red'>" + val.doc_num + "</span>人<br>重点科室：针灸科、消化内科、心血管内科</p></div></div></div>");
            });

            $('#hos_total').text(data.total);
            $('#hos_current').text(pageclickednumber);
            $('#hos_pages').text(data.pages);
            $("#hospager").pager({
                pagenumber: pageclickednumber,
                pagecount: data.pages,
                buttonClickCallback: HosPageClick
            });
        }
    });
    //定义跳转
    get_url();
}

DeptPageClick = function(pageclickednumber) {
    var filter = $("#dept_filter_zone a em").text();
    var current_id = $("#dept_sort_item a[class='current']").attr("id");
    var type = $("#search_type li[class='current']").attr("id");
    var params = {
        page: pageclickednumber,
        limit: 10,
        sort: current_id,
        city: $('#current_city').text(),
        pdepartment_name: filter,
        department_name: type == "1" ? $("#search_value").val() : ""
    };
    $('#department_list').empty();
    $('#department_list').prepend("<div align='center'><img src='../resources/images/dataLoading.gif'></div>");
    $.ajax({
       // url: "../viDeptController/findDeptList",
        url: "../jsonp/findDep.json",
        //method: "GET",
        data: params,
        dataType: "json",
        async: false,
        success: function(data) {
            $('#department_list').empty();
            $.each(data.rows, function(i, val) {
                var level = val.level || '<span>[' + val.level + ']</span>';
                $('#department_list').append("<div class='hospital-item'><img src='../images/hospital.jpg' alt='医院名称'><div class='hospital-info'><div class='hospital-top'><h3><span class='baclk_history'  href='../html/goToDeptDetailInfoPage.html' value="+val.id + "'>" + val.name + "</span></h3><span>[国家重点]</span></div><div class='ks-bottom'><p><a href='#'>" + val.hospital_name + "</a>" + level + "<br>网址：<a href='#'>http://www.sctcm120.com/zyxy/</a><br>地址：" + val.address + "<span>电话： 028-61360201</span></p></div></div></div>");
            });

            $('#dept_total').text(data.total);
            $('#dept_current').text(pageclickednumber);
            $('#dept_pages').text(data.pages);
            $("#deptpager").pager({
                pagenumber: pageclickednumber,
                pagecount: data.pages,
                buttonClickCallback: DeptPageClick
            });
        }
    });
    //定义跳转
    get_url();
}

function  get_url() {
    $(".baclk_history").unbind('click').bind('click',function () {
        top.window.location=$(this).attr('href');
        console.log($(this).attr('href'));
    })
}