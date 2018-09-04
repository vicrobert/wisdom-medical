<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>对比页面的实现</title>
    <link rel="stylesheet" href="../css/baseSet.css">
    <link type="text/css" rel="stylesheet" href="../css/dialog.css"/>
    <link type="text/css" rel="stylesheet" href="../css/icon.css">
    <!--<link rel="stylesheet" type="text/css" href="resources/css/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="resources/css/gray/easyui.css">-->
    <link rel="stylesheet" type="text/css" href="../jquery-easyui-1.4.2/themes/metro/easyui.css">
    <link rel="stylesheet" type="text/css" href="../css/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="../css/circle.css">
    <link rel="stylesheet" type="text/css" href="../css/d3-tip-styles.css">
    <link rel="stylesheet" type="text/css" href="../css/showLoading.css">
    <link rel="stylesheet" href="../css/returnContrastPage.css">
    <link rel="stylesheet" href="../css/x-base.css">
    <style>
        #AyBn span,#ByAn span {
            display: inline-block;
            margin: 5px;
            border-radius: 5px;
            font-size: 95%;
            background-color: rgb(181, 195, 52);
            padding: 5px 15px;
            color: #fff;
            text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.12);
        }
        .ifm-box-content label{
            display: block;
            margin: 12px 0 3px;
        }
    </style>
    <script src="../js/jquery-1.11.2.min.js"></script>
</head>
<style>
    body{
        width: 100%;
        height:100%;
        background: url(../images/bj.png) 0 0 no-repeat;
        background-attachment: fixed;
    }
    .back{
        /* width: 10px;
        height:10px;
        display: inline-block;
        background-color:red;
        cursor: pointer; */
    }
    .frame_bottom{
       width: 100%;
    }
    #list10 span,#list20 span,#list50 span {
        display: inline-block;
        margin: 5px;
        border-radius: 5px;
        font-size: 95%;
        background-color: rgb(181, 195, 52);
        padding: 5px 15px;
        color: #fff;
        cursor:pointer;
        text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.12);
    }
    .ifm-box-content label{
        display: block;
        margin: 12px 0 3px;
    }
</style>
<body>
    <div class="box">
        <!--对比弹出层-->
        <div class="dbtcc">
            <ul>
                <li>
                    <div class="content-con">
                        <div class="con-table">
                            <div class="con-top-l"><img src="../images/con-top-l.png" border="0" class="img" /></div>
                            <div class="con-top-r"><img src="../images/con-top-r.png" border="0" class="img" /></div>
                            <div class="con-bottom-l"><img src="../images/con-bottom-l.png" border="0" class="img" /></div>
                            <div class="con-bottom-r"><img src="../images/con-bottom-r.png" border="0" class="img" /></div>
                            <div class="clear"></div>
                            <!--对比内容-->
                            <div class="compare-content">
                                <div class="ifm-tabs">
                                    <!-- <ul class="tabs-title" id="tabs">
                                        <li class="active">
                                            <a href="#" onclick="changeTabsLoad('yjzb','hospitalContrastController/returnHotContrastPage');">一级指标             </a>
                                        </li>
                                        <li>
                                            <a href="#" onclick="changeTabsLoad('ejzb','secLHosController/secondLevelHosManagerPage');">二级指标</a>
                                        </li>
                                    </ul> -->
                                    <div class="compare-content-title">
                                        <span>&nbsp;</span>
                                        <span class="compare-top-tab active" id="yjzb">一级指标</span>
                                        <span class="jgpic">|</span>
                                        <span class="compare-top-tab"  id="ejzb">二级指标</span>
                                        <span class="back closepic"></span>
                                    </div>
                                </div>
                                <div class="frame_bottom" style="overflow: hidden">
                                        <div class="taba1 x-tab">
                                            <input type="hidden" id="hospitalA" name="hospitalA" value="复旦大学附属肿瘤医院"/>
                                            <input type="hidden" id="hospitalB" name="hospitalB" value="上海长海医院"/>
                                            <div class="col-12">
                                                <div class="compare-l">
                                                    <div class="col-7">
                                                        <div class="ifm-box">
                                                            <div class="content-title c-title">
                                                                <div class="title-left"><img src="../images/title_left.png" border="0" class="img" /></div>
                                                                <div class="title-center">医院科室布局</div>
                                                                <div class="title-right"><img src="../images/title_right.png" border="0" class="img" /></div>
                                                            </div>
                                                            <div class="content-con1 x-content-con">
                                                                    <div class="con-top-l1"><img src="../images/con-top-l.png" border="0" class="img" /></div>
                                                                    <div class="con-top-r1"><img src="../images/con-top-r.png" border="0" class="img" /></div>
                                                                    <div class="con-bottom-l1"><img src="../images/con-bottom-l.png" border="0" class="img" /></div>
                                                                    <div class="con-bottom-r1"><img src="../images/con-bottom-r.png" border="0" class="img" /></div>
                                                                    <div class="ifm-box-content"  style="height:865px;width: 848px;">
                                                                            <div id="hospital_match_list"></div>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="compare-r">
                                                    <div class="col-5">
                                                        <div class="col-12">
                                                            <div class="ifm-box">
                                                                <div class="content-title c-title">
                                                                    <div class="title-left"><img src="../images/title_left.png" border="0" class="img" /></div>
                                                                    <div class="title-center">全表差异图例</div>
                                                                    <div class="title-right"><img src="../images/title_right.png" border="0" class="img" /></div>
                                                                </div>
                                                                <div class="content-con1">
                                                                        <div class="con-top-l1"><img src="../images/con-top-l.png" border="0" class="img" /></div>
                                                                        <div class="con-top-r1"><img src="../images/con-top-r.png" border="0" class="img" /></div>
                                                                        <div class="con-bottom-l1"><img src="../images/con-bottom-l.png" border="0" class="img" /></div>
                                                                        <div class="con-bottom-r1"><img src="../images/con-bottom-r.png" border="0" class="img" /></div>
                                                                        <div class="con-table">
                                                                            <div class="ifm-box-content">
                                                                                <div class="con-table-title"><h3><span>复旦大学附属肿瘤医院</span>具有，<span>上海长海医院</span>没有的科室</h3></div>
                                                                                <div id="AyBn" style="margin-left:15px"></div>
                                                                            </div>
                                                                        
                                                                            <div class="ifm-box-content">
                                                                                <div class="con-table-title"><h3><span>上海长海医院</span>具有，<span>复旦大学附属肿瘤医院</span>没有的科室</h3></div>
                                                                                <div id="ByAn" style="margin-left:15px"></div>
                                                                            </div>
                                                                        </div>        
                                                                <!-- <div class="ifm-box-content" id="">
                                                                    <h3>两医院设计不一样的科室：</h3>
                                                                </div> -->
                                                                </div>
                                                            </div>
                                                        <div class="table-compare">
                                                                <!--标题-->
                                                                <div class="content-title c-title">
                                                                    <div class="title-left"><img src="../images/title_left.png" border="0" class="img" /></div>
                                                                    <div class="title-center">科室差异图例</div>
                                                                    <div class="title-right"><img src="../images/title_right.png" border="0" class="img" /></div>
                                                                </div>
                                                                <!--end 标题-->
                                                                <div class="clear"></div>
                                                                <!--全表比较差异内容-->
                                                                <div class="content-con1">
                                                                    <div class="con-top-l1"><img src="../images/con-top-l.png" border="0" class="img" /></div>
                                                                    <div class="con-top-r1"><img src="../images/con-top-r.png" border="0" class="img" /></div>
                                                                    <div class="con-bottom-l1"><img src="../images/con-bottom-l.png" border="0" class="img" /></div>
                                                                    <div class="con-bottom-r1"><img src="../images/con-bottom-r.png" border="0" class="img" /></div>
                                                                    <div class="con-table">
                                                                        <table width="100%" cellpadding="0" cellspacing="0">
                                                                            <tr>
                                                                                    <div id="deptMatchResult" style="height:400px"></div>
                                                                            </tr>
                                                                        </table>
                                                                        <!--解决父div高度随内容扩展-->
                                                                        <div style="font:0px/0px sans-serif;clear:both;display:block"></div>
                                                                        <!--end 解决父div高度随内容扩展-->
                                                                    </div>
                                                                </div>
                                                                <!--end 全表比较差异内容-->
                                                            </div>
                                                        <!-- <div class="col-12">
                                                            <div class="ifm-box">
                                                                <div class="ifm-box-title">
                                                                    <h2>科室差异图例</h2>
                                                                </div>
                                                                
                                                            </div>
                                                        </div> -->
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                
                                        <div class="taba2 x-tab">
                                            <div>
                                            <div class="col-12">
                                                <div class="compare-l">
                                                    <div class="col-7">
                                                        <div class="ifm-box">
                                                            <div class="content-title c-title">
                                                                    <div class="title-left"><img src="../images/title_left.png" border="0" class="img" /></div>
                                                                    <div class="title-center">对比结果</div>
                                                                    <div class="title-right"><img src="../images/title_right.png" border="0" class="img" /></div>
                                                            </div>
                                                            <!-- <div class="ifm-box-title">
                                                                <h2>对比结果</h2>
                                                            </div> -->
                                                            <div class="content-con1 x-content-con">
                                                                    <div class="con-top-l1"><img src="../images/con-top-l.png" border="0" class="img" /></div>
                                                                    <div class="con-top-r1"><img src="../images/con-top-r.png" border="0" class="img" /></div>
                                                                    <div class="con-bottom-l1"><img src="../images/con-bottom-l.png" border="0" class="img" /></div>
                                                                    <div class="con-bottom-r1"><img src="../images/con-bottom-r.png" border="0" class="img" /></div>
                                                                    <div class="ifm-box-content"  style="height:865px;width: 848px;">
                                                                            <div id="hospital_match_list_two"></div>
                                                                    </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="compare-r">
                                                    <div class="col-5">
                                                        <div class="col-12">
                                                            <div class="ifm-box">
                                                                <div class="content-title c-title">
                                                                        <div class="title-left"><img src="../images/title_left.png" border="0" class="img" /></div>
                                                                        <div class="title-center">逐项差异信息</div>
                                                                        <div class="title-right"><img src="../images/title_right.png" border="0" class="img" /></div>
                                                                </div>
                                                                <!-- <div class="ifm-box-title">
                                                                    <h2>逐项差异信息</h2>
                                                                    <select id="departmentList" style="height:18px; border:0px solid #ccc; padding:0 2px; font-size:12px;"></select>
                                                                </div> -->
                                                                <div class="content-con1">
                                                                        <div class="con-top-l1"><img src="../images/con-top-l.png" border="0" class="img" /></div>
                                                                        <div class="con-top-r1"><img src="../images/con-top-r.png" border="0" class="img" /></div>
                                                                        <div class="con-bottom-l1"><img src="../images/con-bottom-l.png" border="0" class="img" /></div>
                                                                        <div class="con-bottom-r1"><img src="../images/con-bottom-r.png" border="0" class="img" /></div>
                                                                        <div class="con-table">
                                                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                                                <tr>
                                                                                        <div class="ifm-box-content" id="allDiffDeptInfo" style="height:400px;"></div>
                                                                                </tr>
                                                                            </table>
                                                                            <!--解决父div高度随内容扩展-->
                                                                            <div style="font:0px/0px sans-serif;clear:both;display:block"></div>
                                                                            <!--end 解决父div高度随内容扩展-->
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="ifm-box">
                                                                <div class="content-title c-title" style="overflow:hidden">
                                                                        <div class="title-left"><img src="../images/title_left.png" border="0" class="img" /></div>
                                                                        <div class="title-center">全表比较差异</div>
                                                                        <div class="title-right"><img src="../images/title_right.png" border="0" class="img" /></div>
                                                                </div>
                                                                <!-- <div class="ifm-box-title">
                                                                    <h2>全表比较差异</h2>
                                                                </div> -->
                                                                <div class="content-con1">
                                                                        <div class="con-top-l1"><img src="../images/con-top-l.png" border="0" class="img" /></div>
                                                                        <div class="con-top-r1"><img src="../images/con-top-r.png" border="0" class="img" /></div>
                                                                        <div class="con-bottom-l1"><img src="../images/con-bottom-l.png" border="0" class="img" /></div>
                                                                        <div class="con-bottom-r1"><img src="../images/con-bottom-r.png" border="0" class="img" /></div>
                                                                        <div class="con-table">
                                                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                                                <div class="ifm-box-content">
                                                                                        <ul>
                                                                                            <div class="con-table-title"><label>以下科室占比相差 10%</label></div>
                                                                                            <ul id="list10">无</ul>
                                                                                        </ul>
                                                                                        <ul>
                                                                                            <div class="con-table-title"><label>以下科室占比相差 20%</label></div>
                                                                                            <div id="list20">无</div>
                                                                                        </ul>
                                                                                        <ul>
                                                                                            <div class="con-table-title"><label>以下科室占比相差 50%</label></div>
                                                                                            <div id="list50">无</div>
                                                                                        </ul>
                                                                                </div>
                                                                            </table>
                                                                            <!--解决父div高度随内容扩展-->
                                                                            <div style="font:0px/0px sans-serif;clear:both;display:block"></div>
                                                                            <!--end 解决父div高度随内容扩展-->
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <!--end 对比内容-->
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--end 对比弹出层-->
    </div>

</body>

<script src="../js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="../js/jQuery.resizeEnd.min.js"></script>
<script type="text/javascript" src="../js/d3.min.js"></script>
<script type="text/javascript" src="../js/d3.tip.v0.6.3.js"></script>
<script type="text/javascript" src="../jquery-easyui-1.4.2/jquery.easyui.min.js"></script>
<script src="../js/jquery-ui.js"></script>
<script type="text/javascript" src="../js/jquery.showLoading.min.js"></script>
<script type="text/javascript" src="../plug/echarts.js"></script>
<script type="text/javascript" src="../js/hospitalContrast.js"></script>
<script src="../js/echarts.js"></script>
<script type="text/javascript" src="../js/secondLevelHosMatch.js"></script>
<script type="text/javascript">
    $(function() {
        
        $('.back').bind('click',function () {
            window.history.back(-1);
        })
        //$.jqtab("#tabs","#tab-conbox","click");
        $('#yjzb').click(function(){
            $(this).addClass('active').siblings('.compare-top-tab').removeClass('active');
            changeTab('.taba1')
        })
        $('#ejzb').click(function(){
            $(this).addClass('active').siblings('.compare-top-tab').removeClass('active');
            changeTab('.taba2')
        })
        setTimeout(()=>{
            $('.taba2').css('display','none')
        },500)
    });
    // function changeTabsLoad(divId,url){
    //     $("#yjzb").empty();
    //     $("#ejzb").empty();
    //     $("#"+divId).load(url+"?hospitalA=复旦大学附属肿瘤医院&hospitalB=上海长海医院");
    // }
    function changeTab(tab){
        
        $(tab).css({"display":"block","opacity":1})
        .siblings('.x-tab').css({"display":"none","opacity":0})

       
    }
    // changeTabsLoad('yjzb','hospitalContrastController/returnHotContrastPage');
</script>










</html>






