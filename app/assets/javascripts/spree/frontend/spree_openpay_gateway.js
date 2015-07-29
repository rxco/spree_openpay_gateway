// Placeholder manifest file.
// the installer will append this file to the app vendored assets here: vendor/assets/javascripts/spree/frontend/all.js'

//= require openpay.v1
//= require openpay-data.v1

// Dependency on openpay.js 
// :author => Elias Martinez :email => emsedano@live.com.mx

( function( window, undefined ) {
  
  // closure js class 
  var _SpreeOpenpay = function(f, g ) {

    this._form = f;
    this._gatewayOpts = g;    

    this.methods       = this._form.find('input[name="order[payments_attributes][][payment_method_id]"]');
    this.currentMethod = this.methods.filter(':checked').val();
    
    this.listenChanges();    
    this.listenForm();
    console.log('OpenPay client initialized');
  }

  // privileged methods
  _SpreeOpenpay.prototype = {
    
    success_callbak: function(response) { 
      console.log('success OpenPay callback function');
      this.setOpenpayResponse(response);
      this.submitForm();
    },

    error_callbak: function(response) {
     var desc = response.data.description != undefined ? 
      response.data.description : response.message;
		  alert("ERROR [" + response.status + "] " + desc);
		  $("#pay-button").prop("disabled", false);
		},

    setOpenpayResponse: function(response) {
      console.log('OpenPay response parsed and merged');
      var token_id = response.data.id;
      $('#token_id').val(token_id);
      
      this._form.children("input[name='payment_source["+this.currentMethod+"][gateway_payment_profile_id]']").val(response.id)
      this._form.children("input[name='payment_source["+this.currentMethod+"][openpay_response]']").val(JSON.stringify(response))
    },

    submitForm: function() {
      console.log('submitting Payment form');
      this._form.off('submit')
      this._form.submit();

    },

    listenForm: function(){
      var that = this;
      this._form.on('submit', function (e) {
        e.preventDefault()
        currentForm = that._form.clone();
        
        if (that.isConektaForm(currentForm) ) 
          processOpenpayPayment(currentForm);
        else
          that.submitForm();

      });
    },    

    isConektaForm: function (form) {
      $('input', form).is("[data-openpay='card[name]']");
    },

    processOpenpayPayment: function(form) {
      console.log('processing Openpay request');
      $("#pay-button").prop( "disabled", true);
      OpenPay.token.extractFormAndCreate('checkout_form_payment', success_callbak, error_callbak);
    },

    listenChanges: function(){
      var that = this;
      this.methods.on('change', function(e){
        that.currentMethod = e.target.value;
      });
      
    }
    
  };

  // static methods
  _SpreeOpenpay.configureAPI_Client = function (id, k, isSandbox) {
            
      isSandbox = isSandbox !== undefined ? isSandbox : true; //set default true
      
      OpenPay.setId(id);
      OpenPay.setApiKey(k);
      OpenPay.setSandboxMode(isSandbox);
      console.log('OpenPay API client configured');
  }

  // expose access to the constructor
  window.Spree.Openpay = _SpreeOpenpay;
  
} )( window );
