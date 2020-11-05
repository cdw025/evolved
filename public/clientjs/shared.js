const API_URL = getHostURL();
const AUTH_URL = `${API_URL}/auth`;

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

  function showErrorMessage(message) {
    const $errorMessage = $('#errorMessage');
    $errorMessage.text(message);
    $errorMessage.show();
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
    const order_id = form.find('input[id=eid]').val();
    const ordnbr = form.find('input[id=eJobNumberInput]').val();
    const status = form.find('select[id=ejobStatus]').val();
    const pm_assigned = form.find('input[id=epmAssigned]').val();
    const origin = form.find('input[id=eoriginInput]').val();
    const destination = form.find('input[id=edestinationInput]').val();
    const est_start_date = form.find('input[id=eestStartDate]').val();
    const origin_desc = form.find('input[id=eoriginDesc]').val();
    const destination_desc = form.find('input[id=edestDesc]').val();
    const ord_notes = form.find('textarea[id=ejobNotes]').val();
    const customer = form.find('input[id=ecustomer]').val();
    const customer_nm = form.find('input[id=ecustomer_nm]').val();
    const customer_phone = form.find('input[id=ecustomer_phone]').val();
    const customer_email = form.find('input[id=ecustomer_email]').val();
    const customer_notes = form.find('textarea[id=ecustomer_notes]').val();
    const vendor = form.find('input[id=evendor]').val();
    const vendor_nm = form.find('input[id=evendor_nm]').val();
    const vendor_phone = form.find('input[id=evendor_phone]').val();
    const vendor_email = form.find('input[id=evendor_email]').val();
    const vendor_notes = form.find('textarea[id=evendor_notes]').val();
    const contract_signed = form.find('select[id=econtractSigned]').val();
    const lump_sum_amount = form.find('input[id=elumpSumAmount]').val();
    const lump_sum_paid = form.find('select[id=elumpSumPaid]').val();
    const proforma_amount = form.find('input[id=eproformaAmount]').val();
    const proforma_paid = form.find('select[id=eproformaPaid]').val();
    const kickoff_meeting = form.find('select[id=ekickoffMeeting]').val();
    const barge_name = form.find('input[id=ebargeName]').val();
    const tug_name = form.find('input[id=etugName]').val();

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
  const ordnbr = form.find('input[id=duJobNumberInput]').val();
  const status = form.find('select[id=ejobStatus]').val();
  const pm_assigned = form.find('input[id=epmAssigned]').val();
  const origin = form.find('input[id=eoriginInput]').val();
  const destination = form.find('input[id=edestinationInput]').val();
  const est_start_date = form.find('input[id=eestStartDate]').val();
  const origin_desc = form.find('input[id=eoriginDesc]').val();
  const destination_desc = form.find('input[id=edestDesc]').val();
  const ord_notes = form.find('textarea[id=ejobNotes]').val();
  const customer = form.find('input[id=ecustomer]').val();
  const customer_nm = form.find('input[id=ecustomer_nm]').val();
  const customer_phone = form.find('input[id=ecustomer_phone]').val();
  const customer_email = form.find('input[id=ecustomer_email]').val();
  const customer_notes = form.find('textarea[id=ecustomer_notes]').val();
  const vendor = form.find('input[id=evendor]').val();
  const vendor_nm = form.find('input[id=evendor_nm]').val();
  const vendor_phone = form.find('input[id=evendor_phone]').val();
  const vendor_email = form.find('input[id=evendor_email]').val();
  const vendor_notes = form.find('textarea[id=evendor_notes]').val();
  const contract_signed = form.find('select[id=econtractSigned]').val();
  const lump_sum_amount = form.find('input[id=elumpSumAmount]').val();
  const lump_sum_paid = form.find('select[id=elumpSumPaid]').val();
  const proforma_amount = form.find('input[id=eproformaAmount]').val();
  const proforma_paid = form.find('select[id=eproformaPaid]').val();
  const kickoff_meeting = form.find('select[id=ekickoffMeeting]').val();
  const barge_name = form.find('input[id=ebargeName]').val();
  const tug_name = form.find('input[id=etugName]').val();

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
      const ordnbr = form.find('input[id=did]').val();
  
          const job = {
              ordnbr
          };
          return job;
      }

      function getNewAssetFromForm(form) {
        const ordnbr = form.find('input[id=asset_ordnbr]').val();
        const asset_type = form.find('input[id=asset_type]').val();
        const asset_name = form.find('input[id=asset_name]').val();
        const vendor_name = form.find('input[id=vendor_name]').val();
        const tow_group = form.find('input[id=tow_group]').val();
        const asset_start = form.find('input[id=asset_start]').val();
        const asset_stop = form.find('input[id=asset_stop]').val();
        const asset_status = form.find('input[id=asset_status]').val();
        
     const asset = {
                ordnbr,
                asset_type,
                asset_name,
                vendor_name,
                tow_group,
                asset_start,
                asset_stop,
                asset_status
            };

            if (asset.asset_stop === "") {
              delete asset.asset_stop
            };
    
            return asset;
      }

      function getEditAssetFromForm(form) {
        const ordnbr = form.find('input[id=asset_ordnbr]').val();
        const asset_id = form.find('input[id=asset_id]').val();
        const asset_type = form.find('input[id=asset_type]').val();
        const asset_name = form.find('input[id=asset_name]').val();
        const vendor_name = form.find('input[id=vendor_name]').val();
        const tow_group = form.find('input[id=tow_group]').val();
        const asset_start = form.find('input[id=asset_start]').val();
        const asset_stop = form.find('input[id=asset_stop]').val();
        const asset_status = form.find('input[id=asset_status]').val();
        
     const asset = {
                ordnbr,
                asset_id,
                asset_type,
                asset_name,
                vendor_name,
                tow_group,
                asset_start,
                asset_stop,
                asset_status
            };

            if (asset.asset_stop === "") {
              delete asset.asset_stop
            };
    
            return asset;
      }


      function getDeleteAssetFromForm(form) {
        const asset_id = form.find('input[id=did]').val();
    
            const asset = {
                asset_id
            };
            return asset;
        }