$(document).ready(function(){
    $(".change-city").click(function(){
        $(".city-list").show()
    })
    $(".city .close").click(function(){
        $(".city-list").hide()
    })

    $(".search-type h3").click(function(){
        $(".search-type ul").toggle();
    })

    $(".search-type ul li").click(function(){

        var $this = $(this),
            itemID = $this.attr('id'),
            $item = $('#tabs').find('li[id='+itemID+']');


        $this.siblings().removeClass("current");
        $this.addClass("current");

        $("#search-name").text($this.text());
        $("#search-type").val($this.index());
        $(".search-type ul").hide();

        $('#tabs').find('li').removeClass('current');

        $item.addClass('current');
        $item.trigger('click');

    })


    jQuery.jqtab = function(tabtit,tab_conbox,shijian) {

        $(tabtit).find("li").bind(shijian,function(){

            var $this = $(this),
                itemID = $this.attr('id'),
                $item = $('#search_type').find('li[id='+itemID+']');

            $('#search_type li').removeClass('current');
            $item.addClass('current');

            $this.addClass("current").siblings("li").removeClass("current");
            var activeindex = $(tabtit).find("li").index(this);
            $(tab_conbox).children().eq(activeindex).show().siblings().hide();


            return false;
        });

    };

    $(".openbtn").click(function(){
        if($(this).parent().hasClass("open")==false){
            $(this).parent().addClass("open");
            $(this).html("收起↑")
        }
        else{
            $(this).parent().removeClass("open");
            $(this).html("展开↓")
        }

        //$(this).parent().toggleClass("open")

    })
    /* 	$("#dospital-details").click(function(){
            if($(this).hasClass("no-open")){
                console.log(2);
                $(".hospital-information .departments-item").css("height","auto");
                $(this).css("top","auto").css("bottom","0").html("收起↑");
                $(this).removeClass("no-open");
            }else{
                console.log("3");
                $(".hospital-information .departments-item").css("height","210px");
                $(this).css("top","40px").css("bottom","auto").html("展开↓");
                $(this).addClass("no-open");
            }

        });

        $("#departments-details").click(function(){
            if($(this).hasClass("no-open")){
                console.log(2);
                $(".departments-information .departments-item").css("height","auto");
                $(this).css("top","auto").css("bottom","0").html("收起↑");
                $(this).removeClass("no-open");
            }else{
                console.log("3");
                $(".departments-information .departments-item").css("height","168px");
                $(this).css("top","60px").css("bottom","auto").html("展开↓");
                $(this).addClass("no-open");
            }

        });
    */

});
