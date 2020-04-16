// submit new job form handler

$(() => {
    
$('.newjobform').submit((event) => {
        event.preventDefault();
        const job = getNewJobFromForm();
        console.log(job);
        
        createJob(job)
        .then(result => {
            console.log(result);
            window.location = `dashboard`;
        }).catch(error => {
            console.error(error);
            showErrorMessage(error.responseJSON.message);
        });
        });
    });

    // routes job info to post route to create new job

    function createJob(job) {
        return $.post(`${AUTH_URL}/newjob`, job);
    }

    // script to enable put and delete requests
    jQuery.each( [ "put", "delete" ], function( i, method ) {
        jQuery[ method ] = function( url, data, callback, type ) {
            if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = undefined;
            }
        
            return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
            });
        };
        });


// submit edit job form handler
         
$(document).delegate('.edittripform', 'submit', function(event) {
    event.preventDefault();
    var form = $(this);
    const job = getEditJobFromForm(form);
    console.log(job);
    editJob(job)
    .then(result => {
        console.log(result);
        window.location = `dashboard`;
    }).catch(error => {
        console.error(error);
        showErrorMessage(error.responseJSON.message);
    });
});

    // routes job info to put route to edit job

function editJob(job) {
    return $.put(`${AUTH_URL}/dashboard/${job.order_id}`, job);
}

    // delete job form handler

$(document).delegate('.deletetripform', 'submit', function(event) {
    event.preventDefault();
    var form = $(this);
    const job = getDeleteJobFromForm(form);
    console.log(job);
    deleteJob(job)
    .then(result => {
        console.log(result);
        window.location = `dashboard`;
    }).catch(error => {
        console.error(error);
        showErrorMessage(error.responseJSON.message);
    });
});

    // routes delete job to delete route

function deleteJob(job) {
    return $.delete(`${AUTH_URL}/dashboard/${job.ordnbr}`, job);
}

    // if no assets in group, then hide group

    // $(".tow-col").filter(function() {
    //     return !$(this).html().trim();
    // }).parent().hide();

    $(".asset-tbody").filter(function() {
        return !$(this).html().trim();
    }).parent().parent().parent().hide();

    // enable datetimepicker to utilize momentjs

$.datetimepicker.setDateFormatter({
    parseDate: function (date, format) {
        var d = moment(date, format);
        return d.isValid() ? d.toDate() : false;
    },
    
    formatDate: function (date, format) {
        return moment(date).format(format);
    }});

    // call datetimepicker to show on tow edit screen and format date according to momentjs format

$( function() {
    $( ".datetimepicker" ).datetimepicker({
        format: 'M/D/YY @ kk:mm'
    });
  } );

    // Add new asset form handler
    $(document).delegate('.newassetform', 'submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var asset = getNewAssetFromForm(form);
        console.log(asset);
        createAsset(asset)
        .then(result => {
            console.log(result);
            window.location = `dashboard`;
        }).catch(error => {
            console.error(error);
            showErrorMessage(error.responseJSON.message);
        });
    });

    function createAsset(asset) {
        return $.post(`${AUTH_URL}/newasset`, asset);
    }

    $(document).delegate('.editassetform', 'submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var asset = getEditAssetFromForm(form);
        console.log(asset);
        // editJob(job)
        // .then(result => {
        //     console.log(result);
        //     window.location = `dashboard`;
        // }).catch(error => {
        //     console.error(error);
        //     showErrorMessage(error.responseJSON.message);
        // });
    });
    
        // routes job info to put route to edit job
    
    function editJob(job) {
        return $.put(`${AUTH_URL}/dashboard/${job.order_id}`, job);
    }