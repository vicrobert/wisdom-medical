var hospital_id, hospital_name, dept_id;
var doctoridsarray=[];
$(document).ready(function() {
    $.ajax(
        {
            url:"../jsonp/findDeptById.json",
            method: "GET",
            //data:{'dept_id': $('#dept_id').val()},
            dataType:"json",
            async: false,
            success:function(data)
            {
                $("title").html(data.name);
                $('#dept_detail_info').empty().html("<img src='../images/hospital.jpg'><div class='departments-info'><div class='departments-info-name'><a href='#'>"+data.name+"</a></div><div class='departments-info-other'><p><label>医院 : </label><a href='#'>"+data.hospital_name+"</a></p><p><label>电话 : </label><span>83366388-2146</span></p><p><label>科室介绍 : </label><label class='departments-introduction'>NA</label><a href='#' class='openbtn'>展开↓</a></p></div></div>");
                hospital_id=data.hospital_id;
                hospital_name=data.hospital_name;
                dept_id=data.id;
                getCurrentDeptClinic(data.hospital_id, data.hospital_name, data.id);
            }
        });

    function getCurrentDeptClinic(hospital_id, hospital_name, dept_id)
    {
        var params = {'hospital_id': hospital_id, 'dept_id': dept_id};
        getCurrentDeptClinicList(params);
    };

    $.ajax(
        {
           // url:"../patientfbController/getAllCountById",
            url:"../jsonp/getAllCountById.json",
            method: "GET",
            //data:{'doctor_id':doctoridsarray.toString()},
            dataType:"json",
            async: false,
            success:function(data)
            {
                //$('#feedback_count').empty();
                $.each(data.categoryList, function(i,val){
                    if(val.name == '全部'){$('#fb_all').text("全部("+val.total+")");}
                    else if(val.name == '好'){$('#fb_good').text("好评("+val.total+")");}
                    else if(val.name == '中'){$('#fb_soso').text("中评("+val.total+")");}
                    else if(val.name == '差'){$('#fb_bad').text("差评("+val.total+")");}
                });
            }
        });

    $.ajax(
        {
            url:"../jsonp/getfeedbackById.json",
            method: "GET",
           // data:{'doctor_id': doctoridsarray.toString()},
            dataType:"json",
            async: false,
            success:function(data)
            {
                $('#feedback_list').empty();
                $.each(data.patientfbList, function(i,val){
                    $('#feedback_list').append("<div class='comment-text-item'><img src='../images/user-photo.jpg'><div class='comment-space'><div class='comment-info-name'><label>就诊医生：</label><a href='#'>"+val.doctor_name+"</a><span>就诊原因：</span><span>"+val.disease+"</span><em class='star'>☆☆☆☆☆</em><p class='text'>"+val.comment+"</p><p class='comment-time'>"+val.name+"发表于"+val.time+"</p></div></div></div>");
                });
                $("#fbpager").pager({ pagenumber: 1, pagecount: data.pages, buttonClickCallback: fbPageClick });
            }
        });
})


function getCurrentDeptClinicList(params, pageclickednumber){
    $.ajax(
        {
           // url:"../viDeptController/getAllClinicList",
            url:"../jsonp/getAllClinicList.json",
            method: "GET",
            //data:params,
            dataType:"json",
            async: false,
            success:function(data)
            {
                $('#doctor_list').empty();
                $('#dept_DTList').empty();
                $('#dept_DTList').append("<th><a href='#' class='back'></a></th>");
                $.each(data.dateList, function(i,val){
                    week="";
                    switch(i)
                    {
                        case 0: week = "周日";break;
                        case 1: week = "周一";break;
                        case 2: week = "周二";break;
                        case 3: week = "周三";break;
                        case 4: week = "周四";break;
                        case 5: week = "周五";break;
                        case 6:	week = "周六";break;
                    }

                    $('#dept_DTList').append("<th>"+val+"<br />"+week+"</th>");
                });
                $('#dept_DTList').append("<th><a href='#' class='forward'></a></th>");
                $.each(data.dataList, function(i,item){
                    doctoridsarray.push(item.doctor.id);
                    var morning = "<td>上午</td>";
                    $.each(item.mornintClinic, function(key, value){
                        //console.log(key);
                        if(value == 'Y'){
                            morning = morning + "<td><span class='can-see-doctor'></span></td>";
                        }else{
                            morning = morning + "<td><span></span></td>";
                        }
                    });
                    var afternoon = "<td>下午</td>";
                    $.each(item.afternoonClinic, function(key, value){
                        if(value == 'Y'){
                            afternoon = afternoon + "<td><span class='can-see-doctor'></span></td>";
                        }else{
                            afternoon = afternoon + "<td><span></span></td>";
                        }
                    });
                    $('#doctor_list').append("<div class='doctor-scheduling-item'><img src='../images/photo-small.jpg'><div class='doctor-info'><div class='doctor-info-name'><a href='#'>"+item.doctor.name+"</a><span>["+item.doctor.position+"]</span><em class=''>☆☆☆☆☆</em><div class='doctor-comment-num'><a href='#'>"+item.doctor.total+"人</a>点评</div></div><div class='doctor-info-other'><p>"+hospital_name+"</p><p>门诊儿科</p><p>"+item.doctor.good+"</p></div></div><table><tbody><tr>"+morning+"</tr><tr>"+afternoon+"</tr></tbody></table></div>");
                });
                pageclickednumber = pageclickednumber!=null ? pageclickednumber : 1;
                $("#deptpager").pager({ pagenumber: pageclickednumber, pagecount: data.pages, buttonClickCallback: deptPageClick });
            }
        });
}
deptPageClick = function(pageclickednumber) {
    var params = {page: pageclickednumber,limit: 5,'hospital_id': hospital_id, 'dept_id': dept_id};
    getCurrentDeptClinicList(params,pageclickednumber);
}


fbPageClick = function(pageclickednumber) {
    var catetype = $("#feedback_count li[class='current']").text();
    if(catetype.substring(0,1) == '全'){
        var params = {page: pageclickednumber,limit: 5,'doctor_id': doctoridsarray.toString()};
    }
    else
    {
        var params = {page: pageclickednumber,limit: 5,'doctor_id': doctoridsarray.toString(),'attitude':catetype.substring(0,1)};
    }

    $.ajax(
        {
           // url:"../patientfbController/getfeedbackById",
            url:"../jsonp/getfeedbackById.json",
            method: "GET",
           // data: params,
            dataType:"json",
            async: false,
            success:function(data)
            {
                $('#feedback_list').empty();
                $.each(data.patientfbList, function(i,val){
                    $('#feedback_list').append("<div class='comment-text-item'><img src='../images/user-photo.jpg'><div class='comment-space'><div class='comment-info-name'><label>就诊医生：</label><a href='#'>"+val.doctor_name+"</a><span>就诊原因：</span><span>"+val.disease+"</span><em class='star'>☆☆☆☆☆</em><p class='text'>"+val.comment+"</p><p class='comment-time'>"+val.name+"发表于"+val.time+"</p></div></div></div>");
                });
                $("#fbpager").pager({ pagenumber: pageclickednumber, pagecount: data.pages, buttonClickCallback: fbPageClick });
            }
        });
}

$("#feedback_count").on("click","li",function(){
    $(this).addClass("comment-active").siblings("li").removeClass("comment-active");
    if($(this).text().substring(0,1) == '全'){
        var params = {'doctor_id': doctoridsarray.toString()};
    }
    else
    {
        var params = {'doctor_id': doctoridsarray.toString(),'attitude': $(this).text().substring(0,1)};
    }
    $.ajax(
        {
            //url:"../patientfbController/getfeedbackById",
            url:"../jsonp/getfeedbackById.json",
            method: "GET",
            //data:params,
            dataType:"json",
            async: false,
            success:function(data)
            {
                $('#feedback_list').empty();
                $.each(data.patientfbList, function(i,val){
                    $('#feedback_list').append("<div class='comment-text-item'><img src='../images/user-photo.jpg'><div class='comment-space'><div class='comment-info-name'><label>就诊医生：</label><a href='#'>"+val.hospital_name+"</a><span>就诊原因：</span><span>"+val.disease+"</span><em class='star'>☆☆☆☆☆</em><p class='text'>"+val.comment+"</p><p class='comment-time'>"+val.name+"发表于"+val.time+"</p></div></div></div>");
                });
                $("#fbpager").pager({ pagenumber: 1, pagecount: data.pages, buttonClickCallback: fbPageClick });
            }
        });
});