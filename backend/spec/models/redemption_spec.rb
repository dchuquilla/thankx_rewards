require 'rails_helper'

RSpec.describe Redemption, type: :model do
  it "should belong to a user and reward" do
    redemption = Redemption.reflect_on_association(:user)
    expect(redemption.macro).to eq(:belongs_to)
    redemption = Redemption.reflect_on_association(:reward)
    expect(redemption.macro).to eq(:belongs_to)
  end

  it "is valid with valid attributes" do
    redemption = build(:redemption)
    expect(redemption).to be_valid
  end
end
