$(function () {
    load_activePage();
    load_frame();


    // /*start check label */
    // var cb = $('<label class="cbox"></label>');
    // $(".ifm-sidebar-search li input[type='checkbox']").before(cb);
    // $('.ifm-sidebar-search li').on('click','.cbox',function(){
    //     var check =  $(this).siblings('input').prop('checked');
    //     $(this).siblings('input').prop('checked',!check)
    // })
    
    // /*end  check label */ 
})
function load_activePage(){
    var xpage = localStorage.getItem('nowPage')?localStorage.getItem('nowPage')-1:0;
    $('dd').eq(xpage).addClass('active').siblings().removeClass('active');
    $('dd').eq(xpage).parents('dl').siblings().find('dd').removeClass('active');
    var url=$('dd').eq(xpage).attr('url');
    $('#iframe_con', parent.document).attr('src',url);
}

function load_frame(){
    $('.main_frame_top li').bind('click',function () {
        $(this).addClass('active').siblings().removeClass('active');
        var url=$(this).attr('url');
        $('#iframe_con', parent.document).attr('src',url);
    });
    $('.main_left dl dd').bind('click',function () {
        localStorage.setItem('nowPage',$(this).attr('data-pid'))
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parents('dl').siblings().find('dd').removeClass('active');
        var url=$(this).attr('url');
        $('#iframe_con').attr('src',url);
    });

    $('.main_frame_analysis_tab li').bind('click',function () {
        var url=$(this).attr('url');
        $('#iframe_con', parent.document).attr('src',url);
    })
}

