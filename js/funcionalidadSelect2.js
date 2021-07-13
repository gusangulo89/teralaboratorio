$(document).ready(function() {

    $('#udp-elemento').select2({
        allowClear: true,
        minimumResultsForSearch: -1,
        width: 600
    });

    // override the select2 open event
    $('#udp-elemento').on('select2:open', function() {
        // get values of selected option
        var values = $(this).val();
        // get the pop up selection
        var pop_up_selection = $('.select2-results__options');

        if (values != null) {
            // hide the selected values
            pop_up_selection.find("li[aria-selected=true]").hide();

        } else {
            // show all the selection values
            pop_up_selection.find("li[aria-selected=true]").show();
        }

    });

});