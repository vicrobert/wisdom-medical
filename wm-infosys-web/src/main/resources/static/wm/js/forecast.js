$(function() {

    var handler = forecastDataController(),
        chartHandler = forecastChart();

    (function() { // 渲染条件筛选工具条

        function render(domID, data) {

            var tmpl = '<span class="label"  data-id="${id}" data-name="${name}">${name}</span>'

            if (domID === "#disease") {
                $(domID).append($.tmpl(tmpl, data))
                    .attr('data-item-length', data.length)
                    .find('.label').each(function(index, el) {
                    if (index < 2) {
                        $(el).addClass('label-danger');
                    }
                })
                return;
            }

            $(domID).append($.tmpl(tmpl, data))
                .attr('data-item-length', data.length)
                .find('span:first').addClass('label-danger')
        }

        handler.getSelecttypeData(function(data) {

            render('#selectType', data)
        })

        handler.getCommunityData(function(data) {

            render('#community', data)
        })

        handler.getYearData(function(data) {

            render('#year', data)
            handler.getMonthData(function(data) {

                render('#month', data)
                handler.getDiseaseData(function(data) {

                    render('#disease', data)
                    chartHandler.showChart()
                })
            })
        })

        // handler.getMonthData(function(data) {

        //     render('#month', data)
        //     handler.getDiseaseData(function(data) {

        //         render('#disease', data)
        //         chartHandler.showChart()
        //     })
        // })



    }())

    // 筛选条件选择事件
    $('.medical-filter').on('click', 'span', function(event) {

        var $this = $(this),
            $parent = $this.parent(),
            dataID = $this.attr('data-id'),
            parentID = $parent.attr("id"),
            dataItemLength = parseInt($parent.attr('data-item-length')) - 1,
            chooseLength

        // 视觉响应
        if (dataID === '0') {

            $this.addClass('label-danger')
            $this.nextAll('span').removeClass('label-danger')
        } else if (parentID === "year") {

            $parent.find('span').removeClass('label-danger')
            $this.addClass('label-danger')
        } else if (parentID === "selectType") {

            $parent.find('span').removeClass('label-danger')
            $this.addClass('label-danger')
        } else {

            $this.prevAll('span[data-id=0]').removeClass('label-danger')
            $this.toggleClass('label-danger')
        }

        chooseLength = $parent.find('.label-danger').length

        if (!(parentID === "year") || !(parentID === "selectType") ) {

            if (parentID === "disease") {

                if (chooseLength === 0) {
                    $parent.find('span:first').addClass('label-danger')
                }
            } else if (!chooseLength || chooseLength === dataItemLength) {

                $parent.find('span').removeClass('label-danger')
                $parent.find('span:first').addClass('label-danger')
            }
        }

        if (parentID === "year") {
            handler.getMonthData(function(data) {

                var tmpl = '<span class="label"  data-id="${id}" data-name="${name}">${name}</span>'

                $("#month").empty();
                $("#month").append("<div class='x-cate'>月份</div>");
                $("#month").append($.tmpl(tmpl, data))
                    .attr('data-item-length', data.length)
                    .find('span:first').addClass('label-danger')
                chartHandler.showChart()
            })
        };
        if (parentID !== "disease") {
            handler.getDiseaseData(function(data) {
                var tmpl = '<span class="label"  data-id="${id}" data-name="${name}">${name}</span>'
                $("#disease").empty();
                $("#disease").append("<div class='x-cate'>疾病</div>");
                $("#disease").append($.tmpl(tmpl, data))
                    .attr('data-item-length', data.length)
                    .find('.label').each(function(index, el) {
                    if (index < 2) {
                        $(el).addClass('label-danger');
                    }
                })
                chartHandler.showChart()
            })
        }else{
            chartHandler.showChart()
        }
    })
})