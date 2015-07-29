// Placeholder manifest file.
// the installer will append this file to the app vendored assets here: vendor/assets/javascripts/spree/frontend/all.js'

//= require openpay.v1
//= require openpay-data.v1

// Dependency on openpay.js 
// :author => Elias Martinez :email => emsedano@live.com.mx

( function( window, undefined ) {
  
  var _SpreeOpenpay = {
    
    initClient: function (id, k, isSandbox) {
            
      if(isSandbox !== undefined)
      	OpenPay.setSandboxMode(isSandbox);
      else 
      	OpenPay.setSandboxMode(true);

     	OpenPay.setId(id);
      OpenPay.setApiKey(k);
    },
    

    success_callbak: function(response) {
        
        _SpreeOpenpay.setOpenpayResponse(response);
        _SpreeOpenpay.submitForm();

    },

    error_callbak: function(response) {
     var desc = response.data.description != undefined ? 
        response.data.description : response.message;
		     alert("ERROR [" + response.status + "] " + desc);
		     $("#pay-button").prop("disabled", false);
		},

    setOpenpayResponse: function(response) {
      var token_id = response.data.id;
      $('#token_id').val(token_id);
      $('#checkout_form_payment').children("input[name='payment_source[#{@currentMethod}][gateway_payment_profile_id]']").val(response.id)
      $('#checkout_form_payment').children("input[name='payment_source[#{@currentMethod}][openpay_response]']").val(JSON.stringify(response))
    },

    submitForm: function() {
      $('#checkout_form_payment').off('submit')
      $('#checkout_form_payment').submit();
    }
    
  }
  
  // expose access to the constructor
  window.SpreeOpenpay = _SpreeOpenpay;
  
} )( window );
