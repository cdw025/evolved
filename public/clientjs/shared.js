const API_URL = getHostURL();
const AUTH_URL = `${API_URL}/auth`;

function getHostURL() {
    if (window.location.host.indexOf('localhost') != -1) {
      return 'http://localhost:3000';
    } else {
      return 'https://sticker-mania.herokuapp.com';
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
    const ord_notes = $('#jobNotes').val();
    const customer = $('#customer').val();
    const customer_nm = $('#customer_nm').val();
    const customer_phone = $('#customer_phone').val();
    const customer_email = $('#customer_email').val();
    const customer_notes = $('#customer_notes').val();
    const vendor = $('#vendor').val();
    const vendor_nm = $('#vendor_nm').val();
    const vendor_phone = $('#vendor_phone').val();
    const vendor_email = $('#vendor_email').val();
    const vendor_notes = $('#vendor_notes').val();
    
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
            vendor_notes
        };

        return job;
  }
  
  function getEditJobFromForm(form) {
    const order_id = form.find('input[id=eid]').val();
    const ordnbr = form.find('input[id=eJobNumberInput]').val();
    const status = form.find('input[id=ejobStatus]').val();
    const pm_assigned = form.find('input[id=epmAssigned]').val();
    const origin = form.find('input[id=eoriginInput]').val();
    const destination = form.find('input[id=edestinationInput]').val();
    const est_start_date = form.find('input[id=eestStartDate]').val();
    const origin_desc = form.find('textarea[id=eoriginDesc]').val();
    const destination_desc = form.find('textarea[id=edestDesc]').val();
    const ord_notes = form.find('textarea[id=ejobNotes]').val();
    const customer = form.find('textarea[id=ecustomer]').val();
    const customer_nm = form.find('textarea[id=ecustomer_nm]').val();
    const customer_phone = form.find('textarea[id=ecustomer_phone]').val();
    const customer_email = form.find('textarea[id=ecustomer_email]').val();
    const customer_notes = form.find('textarea[id=ecustomer_notes]').val();
    const vendor = form.find('textarea[id=evendor]').val();
    const vendor_nm = form.find('textarea[id=evendor_nm]').val();
    const vendor_phone = form.find('textarea[id=evendor_phone]').val();
    const vendor_email = form.find('textarea[id=evendor_email]').val();
    const vendor_notes = form.find('textarea[id=evendor_notes]').val();

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
            vendor_notes
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