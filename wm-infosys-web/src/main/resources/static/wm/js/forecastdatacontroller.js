/**
 * 舆情中心-疾病分析与预测数据综合处理
 */
function forecastDataController() {

    // AJAX 数据请求处理
    var ajaxHandler = ajaxDataController(),
        // 类型数据
        GET_SELECTTYPE_URL = '../jsonp/selecttypedata.json',
        // 社区数据
        //GET_COMMUNITY_URL = '../../test/data/disease/forecast/communitydata.json',
        //GET_COMMUNITY_URL = $.getWebRootPath('disease-web/analysis/community').replace('medapp/',''),
        GET_COMMUNITY_URL = '../jsonp/communitydata.json',
        // 年代数据
        //GET_YEAR_URL = '../../test/data/disease/forecast/yeardata.json',
       // GET_YEAR_URL = $.getWebRootPath('disease-web/analysis/yeardata').replace('medapp/',''),
        GET_YEAR_URL = '../jsonp/yeardata.json',
        // 月份数据
        //GET_MONTH_URL = '../../test/data/disease/forecast/monthdata.json',
        //GET_MONTH_URL = $.getWebRootPath('disease-web/analysis/monthdata').replace('medapp/',''),
        GET_MONTH_URL = '../jsonp/monthdata.json',
        // 疾病数据
        //GET_DISEASE_URL = '../../test/data/disease/forecast/diseasedata.json';
        //GET_DISEASE_URL = $.getWebRootPath('disease-web/analysis/sicknessdata').replace('medapp/','');
        GET_DISEASE_URL = '../jsonp/diseasedata.json';

    function getFilterData(type, callback) {

        var urls = {
                'getSelecttypeData': GET_SELECTTYPE_URL,
                'getDiseaseData': GET_DISEASE_URL,
                'getCommunityData': GET_COMMUNITY_URL,
                'getYearData': GET_YEAR_URL,
                'getMonthData': GET_MONTH_URL
            },
            params = {};

        if(type === "getMonthData"){

            $("div.panel ul li[id=year] span").each(function(index, element) {

                if($(this).hasClass("label-danger")){

                    params.year = $(this).attr("data-name");
                }
            });
        }

        ajaxHandler.select(urls[type], params, function(data) {

            if(!(type=="getDiseaseData" || type=="getYearData")){
                data.unshift({
                    'id': 0,
                    'name': '全部'
                })
            }
            callback(data)
        })
    }

    function getDiseaseFilterData(callback) {

        // 组装表单数据
        var filterData = {
            selectType: [],
            community: [],
            year: [],
            month: []
        }

        $('.medical-filter li').each(function(index, el) {

            // != 4 表示 忽略 疾病选项栏
            if(index != 4){
                var $this = $(this),
                    itemID = $this.attr('id')

                $this.find('.label-danger').each(function(index, el) {

                    filterData[itemID].push($(el).attr('data-id'))
                })
            }

        })

        var params = {
            /*'selectType': filterData.selectType.join(',') || 0,
            'community': filterData.community.join(',') || 0,
            'year': filterData.year.join(',') || 0,
            'month': filterData.month.join(',') || 0*/
        }

        ajaxHandler.select(GET_DISEASE_URL, params, function(data) {

            callback(data)
        })
    }

    return {
        'getSelecttypeData': function(callback) {

            getFilterData('getSelecttypeData', callback)
        },
        'getCommunityData': function(callback) {

            getFilterData('getCommunityData', callback)
        },
        'getYearData': function(callback) {

            getFilterData('getYearData', callback)
        },
        'getMonthData': function(callback) {

            getFilterData('getMonthData', callback)
        },
        'getDiseaseData': function(callback) {

            getDiseaseFilterData(callback)
        }
    }
}