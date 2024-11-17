# frozen_string_literal: true

class UserRedemptionsPresenter
  def initialize(redemptions)
    @redemptions = redemptions
  end

  def as_json
    @redemptions.map do |redemption|
      {
        id: redemption.id,
        reward: {
          id: redemption.reward.id,
          name: redemption.reward.name
        },
        points_cost: redemption.points_cost,
        created_at: redemption.created_at,
      }
    end
  end
end
