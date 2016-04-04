Spree::CheckoutController.class_eval do 

		if Rails::VERSION::MAJOR >= 4
      before_action :permit_installments_number
      before_action :permit_openpay_response
    end

 
	  private
	  
	  # Provides a route to redirect after order completion
    def completion_route(custom_params = nil)
      if @order.payments.present? && openpay_payment?(@order.payments.last.payment_method)
         openpay_payment_path(@order)
      else
        spree.order_path(@order, custom_params)
      end
    end

	  def openpay_payment?(payment_method)
      [Spree::BillingIntegration::Openpay::Card, Spree::BillingIntegration::Openpay::MonthlyPayment].include? payment_method.class
    end

    def permit_installments_number
      permitted_source_attributes << :installments_number
    end

    def permit_openpay_response
      permitted_source_attributes << :openpay_response
       permitted_source_attributes << :payment_method_id
    end
end