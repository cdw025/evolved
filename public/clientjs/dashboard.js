$(() => {
    
$('#newjobform').submit((event) => {
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

function editJob(job) {
    return $.put(`${AUTH_URL}/dashboard/${job.order_id}`, job);
}

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

function deleteJob(job) {
    return $.delete(`${AUTH_URL}/dashboard/${job.ordnbr}`, job);
}

$(".tow-col").filter(function() {
    return !$(this).html().trim();
}).parent().hide();

$( function() {
    $( ".datetimepicker" ).datetimepicker();
  } );
