# frozen_string_literal: true

require "rails_helper"
require "swagger_helper"
require "devise/jwt/test_helpers"

RSpec.describe "Users Redemptions API", type: :request do
  include Helpers::Authentication

  let(:user) { create(:user) }
  let(:authorization) { get_token_bearer(user) }

  path "/v1/users/redemptions" do
    post "Creates a redemption" do
      tags "Users"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      parameter name: :params, in: :body, schema: {
        type: :object,
        prooperties: {
          redemption: {
            type: :object,
            properties: {
              reward_id: { type: :integer },
            },
            required: ["reward_id"],
          },
          required: ["redemption"],
        }
      }

      response(201, "redemption created") do
        schema type: :object,
          properties: {
            id: { type: :integer, nullable: false },
          }

        let(:params) { { redemption: { reward_id: create(:reward).id } } }

        before do |example|
          submit_request(example.metadata)
        end

        it "creates a redemption" do
          body = JSON.parse(response.body)
          expect(body["id"]).to eq(Redemption.last.id)
        end
      end

      response(422, "Reward must exist") do
        schema type: :object,
          properties: {
            error: { type: :string, nullable: false },
          }

        let(:params) { { redemption: { reward_id: 0 } } }

        before do |example|
          submit_request(example.metadata)
        end

        it "returns an error" do
          body = JSON.parse(response.body)

          expect(response).to have_http_status(:unprocessable_entity)
          expect(body["reward"]).to include("must exist")
        end
      end
    end
  end
end
