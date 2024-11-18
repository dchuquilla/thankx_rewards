# frozen_string_literal: true
require "devise/jwt/test_helpers"

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super do |user|
      if user.persisted?
        token = generate_token_for(user) # Ensure this method generates a valid token
        render json: { message: "Logged in successfully.", token: token }, status: :ok and return
      else
        Rails.logger.info "User not persisted: #{user.errors.full_messages.join(", ")}"
        render json: { message: "Invalid login credentials." }, status: :unauthorized and return
      end
    end
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { message: "Logged in successfully." }, status: :ok
    else
      render json: { message: "Invalid login credentials." }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    render json: { message: "Logged out successfully." }, status: :ok
  end

  def generate_token_for(user)
    headers = { "Accept" => "application/json", "Content-Type" => "application/json" }
    auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    auth_headers["Authorization"]
  end
end
