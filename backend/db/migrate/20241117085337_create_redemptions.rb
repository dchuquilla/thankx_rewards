class CreateRedemptions < ActiveRecord::Migration[7.0]
  def change
    create_table :redemptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :reward, null: false, foreign_key: true
      t.datetime :redemed_at, null: false, default: DateTime.now

      t.timestamps
    end
  end
end
