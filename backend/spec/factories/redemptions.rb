FactoryBot.define do
  factory :redemption do
    user { create(:user) }
    reward { create(:reward) }
    redemed_at { DateTime.now }
  end
end
