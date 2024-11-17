class AddPointsToRedemtion < ActiveRecord::Migration[7.0]
  def change
    add_column :redemptions, :points_cost, :integer, null: false, defautl: 0
  end
end
