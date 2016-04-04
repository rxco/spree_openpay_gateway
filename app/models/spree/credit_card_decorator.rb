Spree::CreditCard.class_eval do
  attr_accessor :name_on_card, :openpay_response

  unless Rails::VERSION::MAJOR == 4
    attr_accessible :name_on_card, :installments_number, :openpay_response
  end

  
  def name?
    !!name_on_card | (name?)
    name_on_card
  end

  def name
    name_on_card || "#{name}"
  end

end