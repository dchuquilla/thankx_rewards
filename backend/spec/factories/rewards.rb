# frozen_string_literal: true

require "faker"

FactoryBot.define do
  factory :reward do
    name { Faker::Restaurant.name }
    description { Faker::Restaurant.description }
    points_cost { rand(100..1500) }
  end
end
