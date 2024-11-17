# frozen_string_literal: true

class V1::Users::ProfileController < ApplicationController
  before_action :authenticate_user!

  def index
    user_profile = UserProfilePresenter.new(current_user)
    render json: user_profile.as_json, status: :ok
  end
end
