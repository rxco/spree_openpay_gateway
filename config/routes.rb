Spree::Core::Engine.routes.draw do
  namespace :openpay do
    resources :payments, only: [:create, :show]
  end
end
