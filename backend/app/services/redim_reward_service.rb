# frozen_string_literal: true

class RedimRewardService
  def initialize(user, reward_id)
    @user = user
    @reward = Reward.find_by(id: reward_id)
  end

  def call
    return { success: false, errors: ["Reward not found"] } unless @reward

    return { success: false, errors: ["Not enough points"] } unless @user.reward_points >= @reward.points_cost

    @user.reward_points -= @reward.points_cost
    @user.save!

    redemption = Redemption.new(user: @user, reward: @reward)

    if redemption.save
      { success: true, redemption: redemption }
    else
      { success: false, errors: redemption.errors }
    end

  end
end
