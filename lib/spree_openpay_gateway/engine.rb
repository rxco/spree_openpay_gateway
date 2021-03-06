module SpreeOpenpayGateway
  class Engine < Rails::Engine
    require 'spree/core'
    isolate_namespace Spree
    engine_name 'spree_openpay_gateway'

    # use rspec for tests
    config.generators do |g|
      g.test_framework :rspec
    end

    def self.activate
      Dir.glob(File.join(File.dirname(__FILE__), '../../app/**/*_decorator*.rb')) do |c|
        Rails.configuration.cache_classes ? require(c) : load(c)
      end
    end

    initializer "spree.gateway.payment_methods", after: "spree.register.payment_methods" do |app|
      app.config.spree.payment_methods << Spree::BillingIntegration::Openpay
      app.config.spree.payment_methods << Spree::BillingIntegration::Openpay::Card
      #app.config.spree.payment_methods << Spree::BillingIntegration::Openpay::Cash
      #app.config.spree.payment_methods << Spree::BillingIntegration::Openpay::Bank
      app.config.spree.payment_methods << Spree::BillingIntegration::Openpay::MonthlyPayment
    end

    config.to_prepare &method(:activate).to_proc
  end
end
