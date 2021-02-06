
// Search input handler

$(document).ready(function(){
    $('#search').on('input', function() {
    if(this.value !== '') {
      var value = $(this).val().toLowerCase();
      $(".uvs").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    } else {
      var value = $(this).val().toLowerCase();
      $(".uvs").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    }
    });
    });


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

    // duplicate job form handler
    $(document).delegate('.duplicatetripform', 'submit', function(event) {
        event.preventDefault();
        var form = $(this);
        const job = getDuplicateJobFromForm(form);
        console.log(job);
        duplicateJob(job)
        .then(result => {
            console.log(result);
            window.location = `dashboard`;
        }).catch(error => {
            console.error(error);
            showErrorMessage(error.responseJSON.message);
        });
    });

    // routes duplicate job to duplicate route

    function duplicateJob(job) {
        return $.post(`${AUTH_URL}/duplicatejob`, job);
    }

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