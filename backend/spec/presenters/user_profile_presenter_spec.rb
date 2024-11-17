# frozen_string_literal: true

require "rails_helper"

RSpec.describe UserProfilePresenter, type: :presenter do
  let(:user) { create(:user, reward_points: rand(100..1000)) }
  let(:user_profile_presenter) { described_class.new(user) }

  describe "#as_json" do
    it "returns the user's profile" do
      expect(user_profile_presenter.as_json).to eq(
        id: user.id,
        email: user.email,
        points: user.reward_points
      )
    end
  end
end
