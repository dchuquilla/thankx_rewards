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
