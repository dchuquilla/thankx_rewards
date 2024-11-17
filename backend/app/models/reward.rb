class Reward < ApplicationRecord
  has_many :redemptions, dependent: :destroy
  has_many :users, through: :redemptions

  validates :name, presence: true
  validates :description, presence: true
  validates :points_cost, presence: true
  validates :points_cost, numericality: { greater_than: 0 }
  validates :points_cost, numericality: { only_integer: true }
end
