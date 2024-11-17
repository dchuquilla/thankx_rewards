# frozen_string_literal: true

require "rails_helper"
require "swagger_helper"
require "devise/jwt/test_helpers"

RSpec.describe "Users Profile API", type: :request do
  include Helpers::Authentication

  let(:user) { create(:user) }
  let(:authorization) { get_token_bearer(user) }

  path "/v1/users/points_balance" do
    get "Retrieves the user's points balance" do
      tags "Users"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      response(200, "user's points balance retrieved") do
        schema type: :object,
          properties: {
            id: { type: :integer, nullable: false },
            email: { type: :string, nullable: false },
            points: { type: :integer, nullable: false },
          },
          required: %w[id email points]

          before do |example|
            submit_request(example.metadata)
          end

          it "returns the user's points balance" do
            body = JSON.parse(response.body)
            expect(body["id"]).to eq(user.id)
            expect(body["email"]).to eq(user.email)
            expect(body["points"]).to eq(user.reward_points)
          end
      end
    end
  end
end
