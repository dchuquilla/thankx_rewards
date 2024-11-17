# frozen_string_literal: true

class V1::Users::RedemptionsController < ApplicationController
  before_action :authenticate_user!

  def index
    redemptions = current_user.redemptions
    render json: redemptions, status: :ok
  end

  def create
    redemption = Redemption.new(redemption_params.merge(user: current_user))

    if redemption.save
      render json: redemption, status: :created
    else
      render json: redemption.errors, status: :unprocessable_entity
    end
  end

  private

  def redemption_params
    params.require(:redemption).permit(:reward_id)
  end
end
