module Spree
  class OpenpayConfiguration < Preferences::Configuration
    preference :merchant_id, :string
  end
end