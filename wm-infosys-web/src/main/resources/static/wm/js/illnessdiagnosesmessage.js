$(function() {

    var handler = illnessdiagnosesmessageDataController(),
        chartHandler = illnessdiagnosesmessageChart();

    handler.getYearSelect();
//    handler.getCommunitySelect();

    $('#year').on('change', function() {
        handler.getMonthSelect($(this).val(),0);
    })

    $('#month').on('change', function() {
        chartHandler.showChart();
    })

    $('#community').on('change', function() {
        chartHandler.showChart();
    })

    // $('#selectbypatientname').on('click', function() {
    //     chartHandler.d3locus();
    // })

    // $("#patientname").autocomplete({
    //     source: function(request, response) {
    //         handler.getPatientName({patientname:request.term}, function(data){
    //             response($.map(data, function(item) {
    //                 return {
    //                     label: item.name,
    //                     value: item.name
    //                 };
    //             }));
    //         });
    //     },
    //     minLength: 0,
    //     autoFill: true,
    //     select: function(event, ui) {}
    // });

})