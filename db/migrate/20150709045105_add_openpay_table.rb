class AddOpenpayTable < ActiveRecord::Migration
  def change
  	create_table :spree_openpay_payments do |t|
      t.string :payment_type
      t.string :firstname
      t.string :lastname

      t.timestamps
    end

    add_column :spree_credit_cards, :installments_number, :integer
    
  end
end
