# frozen_string_literal: true

class UserProfilePresenter
  def initialize(user)
    @user = user
  end

  def as_json
    {
      id: @user.id,
      email: @user.email,
      points: @user.reward_points
    }
  end
end
