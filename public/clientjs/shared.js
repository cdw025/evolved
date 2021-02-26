const API_URL = getHostURL();
const AUTH_URL = `${API_URL}/auth`;

function logout() {
  localStorage.clear();
  $.get(`${AUTH_URL}/logout`)
  .then(result => {
    console.log(result);
  });
}

function getHostURL() {
    if (window.location.host.indexOf('localhost') != -1) {
      return 'http://localhost:3000';
    } else {
      return 'https://cbctriptracker.herokuapp.com';
    }
  }

  function getUserFromForm() {
    const email = $('#email').val();
        const password = $('#password').val();

        const user = {
            email,
            password
        };

        return user;
  }

  function getNewJobFromForm() {
    const ordnbr = $('#JobNumberInput').val();
    const status= $('#jobStatus').val();
    const pm_assigned= $('#pmAssigned').val();
    const origin = $('#originInput').val();
    const destination = $('#destinationInput').val();
    const est_start_date = $('#estStartDate').val();
    const origin_desc = $('#originDesc').val();
    const destination_desc = $('#destDesc').val();
    const contract_signed = $('#contractSigned').val();
    const kickoff_meeting = $('#kickoffMeeting').val();
    const barge_name = $('#bargeName').val();
    const tug_name = $('#tugName').val();
    const ord_notes = $('#jobNotes').val();
    const customer = $('#customer').val();
    const customer_nm = $('#customer_nm').val();
    var customer_phone = $('#customer_phone').val();
    if (customer_phone <1) {
      customer_phone = 0;
    } else {
      customer_phone = customer_phone;
    }
    const customer_email = $('#customer_email').val();
    const customer_notes = $('#customer_notes').val();
    const vendor = $('#vendor').val();
    const vendor_nm = $('#vendor_nm').val();
    var vendor_phone = $('#vendor_phone').val();
    if (vendor_phone <1) {
      vendor_phone = 0;
    } else {
      vendor_phone = vendor_phone;
    }
    const vendor_email = $('#vendor_email').val();
    const vendor_notes = $('#vendor_notes').val();
    var lump_sum_amount = $('#lumpSumAmount').val();
    if (lump_sum_amount <1) {
      lump_sum_amount = 0;
    } else {
      lump_sum_amount = lump_sum_amount;
    }
    const lump_sum_paid = $('#lumpSumPaid').val();

 const job = {
            ordnbr,
            status,
            pm_assigned,
            origin,
            destination,
            est_start_date,
            origin_desc,
            destination_desc,
            contract_signed,
            kickoff_meeting,
            barge_name,
            tug_name,
            ord_notes,
            customer,
            customer_nm,
            customer_phone,
            customer_email,
            customer_notes,
            vendor,
            vendor_nm,
            vendor_phone,
            vendor_email,
            vendor_notes,
            lump_sum_amount,
            lump_sum_paid
        };

        return job;
  }
  
  function getEditJobFromForm(form) {
    const order_id = form.find('.eid').val();
    const ordnbr = form.find('.eJobNumberInput').val();
    const status = form.find('.ejobStatus').val();
    const pm_assigned = form.find('.epmAssigned').val();
    const origin = form.find('.eoriginInput').val();
    const destination = form.find('.edestinationInput').val();
    const est_start_date = form.find('.eestStartDate').val();
    const origin_desc = form.find('.eoriginDesc').val();
    const destination_desc = form.find('.edestDesc').val();
    const ord_notes = form.find('.ejobNotes').val();
    const customer = form.find('.ecustomer').val();
    const customer_nm = form.find('.ecustomer_nm').val();
    var customer_phone = form.find('.ecustomer_phone').val();
    if (customer_phone <1) {
      customer_phone = 0;
    } else {
      customer_phone = customer_phone;
    }
    const customer_email = form.find('.ecustomer_email').val();
    const customer_notes = form.find('.ecustomer_notes').val();
    const vendor = form.find('.evendor').val();
    const vendor_nm = form.find('.evendor_nm').val();
    var vendor_phone = form.find('.evendor_phone').val();
    if (vendor_phone <1) {
      vendor_phone = 0;
    } else {
      vendor_phone = vendor_phone;
    }
    const vendor_email = form.find('.evendor_email').val();
    const vendor_notes = form.find('.evendor_notes').val();
    const contract_signed = form.find('.econtractSigned').val();
    var lump_sum_amount = form.find('.elumpSumAmount').val();
    if (lump_sum_amount <1) {
      lump_sum_amount = 0;
    } else {
      lump_sum_amount = lump_sum_amount;
    }
    const lump_sum_paid = form.find('.elumpSumPaid').val();
    const proforma_amount = form.find('.eproformaAmount').val();
    const proforma_paid = form.find('.eproformaPaid').val();
    const kickoff_meeting = form.find('.ekickoffMeeting').val();
    const barge_name = form.find('.ebargeName').val();
    const tug_name = form.find('.etugName').val();

        const job = {
            order_id,
            ordnbr,
            status,
            pm_assigned,
            origin,
            destination,
            est_start_date,
            origin_desc,
            destination_desc,
            ord_notes,
            customer,
            customer_nm,
            customer_phone,
            customer_email,
            customer_notes,
            vendor,
            vendor_nm,
            vendor_phone,
            vendor_email,
            vendor_notes,
            contract_signed,
            lump_sum_amount,
            lump_sum_paid,
            proforma_amount,
            proforma_paid,
            kickoff_meeting,
            barge_name,
            tug_name
        };
        return job;
    }

// duplicate job form getter
function getDuplicateJobFromForm(form) {
  const ordnbr = form.find('.duJobNumberInput').val();
  const status = form.find('.ejobStatus').val();
  const pm_assigned = form.find('.epmAssigned').val();
  const origin = form.find('.eoriginInput').val();
  const destination = form.find('.edestinationInput').val();
  const est_start_date = form.find('.eestStartDate').val();
  const origin_desc = form.find('.eoriginDesc').val();
  const destination_desc = form.find('.edestDesc').val();
  const ord_notes = form.find('.ejobNotes').val();
  const customer = form.find('.ecustomer').val();
  const customer_nm = form.find('.ecustomer_nm').val();
  const customer_phone = form.find('.ecustomer_phone').val();
  const customer_email = form.find('.ecustomer_email').val();
  const customer_notes = form.find('.ecustomer_notes').val();
  const vendor = form.find('.evendor').val();
  const vendor_nm = form.find('.evendor_nm').val();
  const vendor_phone = form.find('.evendor_phone').val();
  const vendor_email = form.find('.evendor_email').val();
  const vendor_notes = form.find('.evendor_notes').val();
  const contract_signed = form.find('.econtractSigned').val();
  const lump_sum_amount = form.find('.elumpSumAmount').val();
  const lump_sum_paid = form.find('.elumpSumPaid').val();
  const proforma_amount = form.find('.eproformaAmount').val();
  const proforma_paid = form.find('.eproformaPaid').val();
  const kickoff_meeting = form.find('.ekickoffMeeting').val();
  const barge_name = form.find('.ebargeName').val();
  const tug_name = form.find('.etugName').val();

      const job = {
          ordnbr,
          status,
          pm_assigned,
          origin,
          destination,
          est_start_date,
          origin_desc,
          destination_desc,
          ord_notes,
          customer,
          customer_nm,
          customer_phone,
          customer_email,
          customer_notes,
          vendor,
          vendor_nm,
          vendor_phone,
          vendor_email,
          vendor_notes,
          contract_signed,
          lump_sum_amount,
          lump_sum_paid,
          proforma_amount,
          proforma_paid,
          kickoff_meeting,
          barge_name,
          tug_name
      };
      return job;
  }


    function getDeleteJobFromForm(form) {
      const ordnbr = form.find('.did').val();
  
          const job = {
              ordnbr
          };
          return job;
      }

      function getNewAssetFromForm(form) {
        const order_id = form.find('.orderIdInput').val();
        const asset_status= form.find('.assetStatus').val();
        const tow_group= form.find('.towGroup').val();
        const asset_name = form.find('.assetName').val();
        const vendor_name = form.find('.assetVendor').val();
        const asset_type = form.find('.assetType').val();
        const asset_start = form.find('.assetStart').val();
        const asset_stop = form.find('.assetStop').val();
        const start_fuel = form.find('.assetStartFuel').val();
        const stop_fuel = form.find('.assetStopFuel').val();
        const start_lube = form.find('.assetStartLube').val();
        const stop_lube = form.find('.assetStopLube').val();
    
        if(asset_stop) {
          const asset = {
                     order_id,
                     asset_status,
                     tow_group,
                     asset_name,
                     vendor_name,
                     asset_type,
                     asset_start,
                     asset_stop,
                     start_fuel,
                     stop_fuel,
                     start_lube,
                     stop_lube
                 };
         
                 return asset;

        } else {
          const asset = {
            order_id,
            asset_status,
            tow_group,
            asset_name,
            vendor_name,
            asset_type,
            asset_start,
            start_fuel,
            stop_fuel,
            start_lube,
            stop_lube
        };

        return asset;
        }
      }

      function getEditAssetFromForm(form) {
        const asset_id = form.find('.eassetIdInput').val();
        const asset_status= form.find('.eassetStatus').val();
        const tow_group= form.find('.etowGroup').val();
        const asset_name = form.find('.eassetName').val();
        const vendor_name = form.find('.eassetVendor').val();
        const asset_type = form.find('.eassetType').val();
        const asset_start = form.find('.eassetStart').val();
        const asset_stop = form.find('.eassetStop').val();
        const start_fuel = form.find('.eassetStartFuel').val();
        const stop_fuel = form.find('.eassetStopFuel').val();
        const start_lube = form.find('.eassetStartLube').val();
        const stop_lube = form.find('.eassetStopLube').val();
    
        if(asset_stop) {
          const asset = {
                     asset_id,
                     asset_status,
                     tow_group,
                     asset_name,
                     vendor_name,
                     asset_type,
                     asset_start,
                     asset_stop,
                     start_fuel,
                     stop_fuel,
                     start_lube,
                     stop_lube
                 };
         
                 return asset;

        } else {
          const asset = {
            asset_id,
            asset_status,
            tow_group,
            asset_name,
            vendor_name,
            asset_type,
            asset_start,
            start_fuel,
            stop_fuel,
            start_lube,
            stop_lube
        };

        return asset;
        }
      }

// get new log form
      function getNewLogFromForm(form) {
        const order_id = form.find('.orderId').val();
        const asset_id = form.find('.assetId').val();
        const asset_name = form.find('.assetname').val();
        const tow_group = form.find('.towgroup').val();
        const location_type = form.find('.logLocationType').val();
        const asset_location = form.find('.assetLocation').val();
        const latitude = form.find('.assetlatitude').val();
        const longitude = form.find('.assetlongitude').val();
        const fuel_burn = form.find('.fuelburn').val();
        const lube_burn = form.find('.lubeburn').val();
        const speed = form.find('.currentspeed').val();
        const status = form.find('.logstatus').val();
        const direction = form.find('.logdirection').val();
        const eta = form.find('.logeta').val();
        const miles_made = form.find('.milesmade').val();
        const miles_to_go = form.find('.milestogo').val();
        const notes = form.find('.lognotes').val();


        if(eta) {
          const log = {
            order_id,
            asset_id,
            asset_name,
            tow_group,
            location_type,
            asset_location,
            latitude,
            longitude,
            fuel_burn,
            lube_burn,
            speed,
            status,
            direction,
            eta,
            miles_made,
            miles_to_go,
            notes
        };
        return log;
      } else {
          const log = {
            order_id,
            asset_id,
            asset_name,
            tow_group,
            location_type,
            asset_location,
            latitude,
            longitude,
            fuel_burn,
            lube_burn,
            speed,
            status,
            direction,
            miles_made,
            miles_to_go,
            notes
        };
        return log;
        }
      }

      // get duplicate log form
      function getDuplicateLogFromForm(form) {
        const order_id = form.find('.duorderId').val();
        const asset_id = form.find('.duassetId').val();
        const asset_name = form.find('.duassetname').val();
        const tow_group = form.find('.dutowgroup').val();
        const location_type = form.find('.dulogLocationType').val();
        const asset_location = form.find('.duassetLocation').val();
        const latitude = form.find('.duassetlatitude').val();
        const longitude = form.find('.duassetlongitude').val();
        const fuel_burn = form.find('.dufuelburn').val();
        const lube_burn = form.find('.dulubeburn').val();
        const speed = form.find('.ducurrentspeed').val();
        const status = form.find('.dulogstatus').val();
        const direction = form.find('.dulogdirection').val();
        const eta = form.find('.dulogeta').val();
        const miles_made = form.find('.dumilesmade').val();
        const miles_to_go = form.find('.dumilestogo').val();
        const notes = form.find('.dulognotes').val();


        if(eta) {
          const log = {
            order_id,
            asset_id,
            asset_name,
            tow_group,
            location_type,
            asset_location,
            latitude,
            longitude,
            fuel_burn,
            lube_burn,
            speed,
            status,
            direction,
            eta,
            miles_made,
            miles_to_go,
            notes
        };
        return log;
      } else {
          const log = {
            order_id,
            asset_id,
            asset_name,
            tow_group,
            location_type,
            asset_location,
            latitude,
            longitude,
            fuel_burn,
            lube_burn,
            speed,
            status,
            direction,
            miles_made,
            miles_to_go,
            notes
        };
        return log;
        }
      }

// get edit log form
function getEditLogFromForm(form) {
  const log_id = form.find('.editlogId').val();
  const order_id = form.find('.editorderId').val();
  const asset_id = form.find('.editassetId').val();
  const asset_name = form.find('.editassetname').val();
  const tow_group = form.find('.edittowgroup').val();
  const location_type = form.find('.editlogLocationType').val();
  const asset_location = form.find('.editassetLocation').val();
  const latitude = form.find('.editassetlatitude').val();
  const longitude = form.find('.editassetlongitude').val();
  const fuel_burn = form.find('.editfuelburn').val();
  const lube_burn = form.find('.editlubeburn').val();
  const speed = form.find('.editcurrentspeed').val();
  const status = form.find('.editlogstatus').val();
  const direction = form.find('.editlogdirection').val();
  const eta = form.find('.editlogeta').val();
  const miles_made = form.find('.editmilesmade').val();
  const miles_to_go = form.find('.editmilestogo').val();
  const notes = form.find('.editlognotes').val();


  if(eta) {
    const log = {
      log_id,
      order_id,
      asset_id,
      asset_name,
      tow_group,
      location_type,
      asset_location,
      latitude,
      longitude,
      fuel_burn,
      lube_burn,
      speed,
      status,
      direction,
      eta,
      miles_made,
      miles_to_go,
      notes
  };
  return log;
} else {
    const log = {
      log_id,
      order_id,
      asset_id,
      asset_name,
      tow_group,
      location_type,
      asset_location,
      latitude,
      longitude,
      fuel_burn,
      lube_burn,
      speed,
      status,
      direction,
      miles_made,
      miles_to_go,
      notes
  };
  return log;
  }
}




// New Delay Form getter
      function getNewDelayFromForm(form) {
        const asset_id = form.find('.assetId').val();
        const asset_name = form.find('.assetname').val();
        const order_id = form.find('.orderId').val();
        const tow_group = form.find('.towgroup').val();
        const delay_type = form.find('.delaytype').val();
        const delay_start = form.find('.delaystart').val();
        const delay_stop = form.find('.delaystop').val();
        const description = form.find('.delaynotes').val();
   
     const delay = {
                asset_id,
                asset_name,
                order_id,
                tow_group,
                delay_type,
                delay_start,
                delay_stop,
                description
            };
    
            return delay;
      }


// Edit Delay Form getter
function editDelayFromForm(form) {
  const delay_id = form.find('.editdelayId').val();
  const asset_id = form.find('.editassetId').val();
  const asset_name = form.find('.editassetname').val();
  const order_id = form.find('.editorderId').val();
  const tow_group = form.find('.edittowgroup').val();
  const delay_type = form.find('.editdelaytype').val();
  const delay_start = form.find('.editdelaystart').val();
  const delay_stop = form.find('.editdelaystop').val();
  const description = form.find('.editdelaynotes').val();

const delay = {
          delay_id,
          asset_id,
          asset_name,
          order_id,
          tow_group,
          delay_type,
          delay_start,
          delay_stop,
          description
      };

      return delay;
}

// enable error message pop up to show
      function showErrorMessage(message) {
        const $errorMessage = $('#errorMessage');
        $errorMessage.text(message);
        $errorMessage.show();
      }



// Delete Delay Form Getter
function deleteDelayFromForm(form) {
  const delay_id = form.find('.ddelay_id').val();

  const delay = {
    delay_id
  };

  return delay;
}

// Delete Delay Form Getter
function deleteLogFromForm(form) {
  const log_id = form.find('.dlog_id').val();

  const log = {
    log_id
  };

  return log;
}