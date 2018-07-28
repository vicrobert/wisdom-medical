var hospital_name = "";
function getDepartmentList(params,pageclickednumber){
    $.ajax({
        //url:"../viHospitalController/selectDepartmentList",
        url:"../jsonp/selectDepartmentList.json",
        method: "GET",
      //  data: params,
        dataType:"json",
        async: false,
        success:function(data){
            $('#department_list').empty();
            $.each(data.rows, function(i,val){
                $('#department_list').append("<div class=\"doctor-scheduling-item\"><img style=\"width:81px;height:81px;\" src=\"../resources/images/department.png\"><div class=\"doctor-info\"><div class=\"doctor-info-name\"><a href=\"#\">"+val.department_name+"</a><span>["+val.rank+"]</span><em class=\"\">☆☆☆☆☆</em><div class=\"doctor-comment-num\"><a href=\"#\">0人</a>点评</div></div><div class=\"doctor-info-other\"><p><label>共有</label><span>"+val.cnt_person+"</span><label>名医生</label></p><p><label>电话 : 未知</label></p></div></div></div>");
            });
            pageclickednumber = pageclickednumber!=null ? pageclickednumber : 1;
            $("#deptpager").pager({ pagenumber: pageclickednumber, pagecount: data.pages, buttonClickCallback: deptPageClick});
        }
    });
}
var deptPageClick = function(pageclickednumber) {
    var params = {page: pageclickednumber,limit: 5,'hospital_name': hospital_name};
    getDepartmentList(params,pageclickednumber);
};
$(document).ready(function() {
    $.ajax(
        {
           // url:"../viHospitalController/findHospitalById",
            url:"../jsonp/findHospitalById.json",
            method: "GET",
           // data:{'hospital_id': $('#hospital_id').val()},
            dataType:"json",
            async: false,
            success:function(data)
            {
                $("title").html(data.name);
                hospital_name=data.name;
                $('#hospital_detail_info').empty().html("<img src='../images/hospital.jpg'><div class='departments-info'><div class='departments-info-name'><a href='#'>"+data.name+"</a><span>["+data.level+"]</span></div><div class='departments-info-other'><p><label>电话 : </label><span>400-11-91160</span></p><p><label>地址 : </label><span>"+data.address+"</span></p><p><label>网址 : </label><a href='#'>http://sz.91160.com</a></p><p><label>医院简介 : </label><label class='departments-introduction'>"+data.profiles+"</label><a href='#' class='openbtn'>展开↓</a></p></div></div>");

                //$('#doctor_resume').empty().html(data.experience);
            }
        });

    var params = {'hospital_name': hospital_name};
    getDepartmentList(params);
});