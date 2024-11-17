# frozen_string_literal: true

class V1::RewardsController < ApplicationController
  def index
    render json: { rewards: Reward.all }
  end
end
