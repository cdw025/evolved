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
    console.log(job.order_id);
    window.location = `${job.order_id}`;
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


// edit log form handler
$(document).delegate('.editlogform', 'submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var log = getEditLogFromForm(form);
    console.log(log);
    editLog(log)
    .then(result => {
        console.log(result);
        window.location = `logs`;
    }).catch(error => {
        console.error(error);
        showErrorMessage(error.responseJSON.message);
    });
});

// routes log info to put route to edit log

function editLog(log) {
    return $.put(`${AUTH_URL}/editlog/${log.log_id}`, log);
}

// delete log form handler
$(document).delegate('.deletelogform', 'submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var log = deleteLogFromForm(form);
    console.log(log);
    deleteLog(log)
    .then(log => {
        window.location = `logs`;
    }).catch(error => {
        console.error(error);
        console.log(log.log_id);
    });
});

// routes log info to delete route

function deleteLog(log) {
    return $.delete(`${AUTH_URL}/deletelog/${log.log_id}`, log);
}







// edit delay form handler
$(document).delegate('.editdelayform', 'submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var delay = editDelayFromForm(form);
    console.log(delay);
    editDelay(delay)
    .then(result => {
        console.log(result);
        window.location = `delays`;
    }).catch(error => {
        console.error(error);
        console.log(delay.delay_id);
        showDelayError(error.responseJSON.message, delay);
    });
});

// routes log info to put route to edit log

function editDelay(delay) {
    return $.put(`${AUTH_URL}/editdelay/${delay.delay_id}`, delay);
}


// delete delay form handler
$(document).delegate('.deletedelayform', 'submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var delay = deleteDelayFromForm(form);
    console.log(delay);
    deleteDelay(delay)
    .then(delay => {
        window.location = `delays`;
    }).catch(error => {
        console.error(error);
        console.log(delay.delay_id);
        showDelayError(error.responseJSON.message, delay);
    });
});

// routes delay info to delete route

function deleteDelay(delay) {
    return $.delete(`${AUTH_URL}/deletedelay/${delay.delay_id}`, delay);
}



// enable tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

  // Show error message when delay start and end are on different days
  function showDelayError(message, delay) {
    const $errorMessage = $('#errorMessage' + '_' + delay.delay_id);
    console.log(delay.delay_id);
    $errorMessage.text(message);
    $errorMessage.show();
  }
