
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

// Enable dropdown for location selection on newlogmodal
// $(".logLocationType").change(function() {
//     if ($(".logLocationType").val() == "inland") {
//         $(".locationinland").show();
//     } else 
//     if ($(".logLocationType").val() == "offshore") {
//         $(".locationinland").css('display','none');
//     }});


// Enables ability to click return key and create new line instead of submitting forms
window.addEventListener('keydown',function(e){
    if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
        if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

    
    
    // Add new asset form handler
    $(document).delegate('.newassetform', 'submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var asset = getNewAssetFromForm(form);
        console.log(asset);
        createAsset(asset)
        .then(result => {
            console.log(result);
            window.location = `${localStorage.company}`;
        }).catch(error => {
            console.error(error);
            showErrorMessage(error.responseJSON.message);
        });
    });

    function createAsset(asset) {
        return $.post(`${AUTH_URL}/newasset`, asset);
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


    // edit asset form handler
    $(document).delegate('.editassetform', 'submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var asset = getEditAssetFromForm(form);
        console.log(asset);
        editAsset(asset)
        .then(result => {
            console.log(result);
            window.location = `${localStorage.company}`;
        }).catch(error => {
            console.error(error);
            showErrorMessage(error.responseJSON.message);
        });
    });
    
    // routes job info to put route to edit job
    
    function editAsset(asset) {
        return $.put(`${AUTH_URL}/editasset/${asset.asset_id}`, asset);
    }

    // // delete asset form handler

    // $(document).delegate('.deleteassetform', 'submit', function(event) {
    //     event.preventDefault();
    //     var form = $(this);
    //     const asset = getDeleteAssetFromForm(form);
    //     console.log(asset);
    //     deleteAsset(asset)
    //     .then(result => {
    //         console.log(result);
    //         window.location = `dashboard`;
    //     }).catch(error => {
    //         console.error(error);
    //         showErrorMessage(error.responseJSON.message);
    //     });
    // });
    
    //     // routes delete asset to delete route
    
    // function deleteAsset(asset) {
    //     return $.delete(`${AUTH_URL}/dashboard/asset/${asset.asset_id}`, asset);
    // }


    // Add new log form handler
    $(document).delegate('.newlogform', 'submit', function(event) {
        event.preventDefault();
        var form = $(this);
        const log = getNewLogFromForm(form);
        // console.log(log);
        createLog(log)
        .then(result => {
            console.log(result);
            window.location = `${localStorage.company}`;
        }).catch(error => {
            console.error(error);
            showErrorMessage(error.responseJSON.message);
        });
    });

    function createLog(log) {
        return $.post(`${AUTH_URL}/newlog`, log);
    }


    // if no assets in group, then hide group
    $(".asset-tbody").filter(function() {
        return !$(this).html().trim();
    }).closest(".bbvs").hide();


    // change color of log date submitted to red if date is less than today
    $( ".logdttm").each(function() {
        var today = new Date();
        var momentToday = moment(today).startOf('day');
        console.log(today);
        var dttm = $(this).html();
        var momentDate = moment(dttm, 'MM-DD-YYYY').toDate();
        console.log(momentDate);
        if(momentDate < momentToday) {
            $(this).css('color', 'red');
        }
    });