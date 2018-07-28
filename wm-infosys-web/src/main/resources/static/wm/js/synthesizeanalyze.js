$(function() {

    var chartHandler = synthesizeanalyzeChart(),
        handler = synthesizeanalyzeDataController();

    handler.getTimeSelect();
    //handler.getCommunitySelect();
    //handler.getJobSelect();

    $("#disease").autocomplete({
        source: function(request, response) {
            handler.getDisease({disease:request.term}, function(data){
                response($.map(data, function(item) {
                    return {
                        label: item.name,
                        value: item.name
                    };
                }));
            });
        },
        minLength: 0,
        autoFill: true,
        select: function(event, ui) {}
    });

    $('#selectSub').on('click', function() {
        chartHandler.showChart();
    })
})