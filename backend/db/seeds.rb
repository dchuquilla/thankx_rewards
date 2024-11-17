require "faker"

# Create users
(1..50).each do |n|
  member = User.find_or_create_by(email: "user_#{n}@thanx.com") do |user|
    user.name = "User"
    user.password = "password"
    user.password_confirmation = "password"
    user.reward_points = rand(100..1000)
  end
  member.save!
end

(1..50).each do |n|
  reward = Reward.find_or_create_by(name: Faker::Restaurant.name) do |reward|
    reward.description = Faker::Restaurant.description
    reward.points_cost = rand(100..1500)
  end
  reward.save!
end
