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
    const customer_nm = $('#customerNameInput').val();
    const origin_location = $('#OriginInput').val();
    const origin_desc = $('#OriginDescription').val();
    const dest_location = $('#DestinationInput').val();
    const dest_desc = $('#DestinationDescription').val();
    const ord_notes = $('#OrderNotes').val();
    
 const job = {
            ordnbr,
            customer_nm,
            origin_location,
            origin_desc,
            dest_location,
            dest_desc,
            ord_notes
        };

        return job;
  }
  
  function getEditJobFromForm(form) {
    const order_id = form.find('input[id=eid]').val();
    const ordnbr = form.find('input[id=eorderNumberInput]').val();
    const customer_nm = form.find('input[id=ecustomerNameInput]').val();
    const origin_location = form.find('input[id=eOriginInput]').val();
    const origin_desc = form.find('input[id=eOriginDescription]').val();
    const dest_location = form.find('input[id=eDestinationInput]').val();
    const dest_desc = form.find('input[id=eDestinationDescription]').val();
    const ord_notes = form.find('textarea[id=eOrderNotes]').val();

        const job = {
            order_id,
            ordnbr,
            customer_nm,
            origin_location,
            origin_desc,
            dest_location,
            dest_desc,
            ord_notes
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