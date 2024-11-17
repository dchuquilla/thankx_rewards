# frozen_string_literal: true

class V1::Users::RedemptionsController < ApplicationController
  before_action :authenticate_user!

  def index
    redemptions = UserRedemptionsPresenter.new(current_user.redemptions)

    render json: redemptions.as_json, status: :ok
  end

  def create
    redemption = RedimRewardService.new(current_user, redemption_params[:reward_id]).call

    if redemption[:success]
      render json: redemption[:redemption], status: :created
    else
      render json: redemption, status: :unprocessable_entity
    end
  end

  private

  def redemption_params
    params.require(:redemption).permit(:reward_id)
  end
end
