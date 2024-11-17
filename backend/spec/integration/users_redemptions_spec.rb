# frozen_string_literal: true

require "rails_helper"
require "swagger_helper"
require "devise/jwt/test_helpers"

RSpec.describe "Users Redemptions API", type: :request do
  include Helpers::Authentication

  let(:user) { create(:user, reward_points: (1000)) }
  let(:authorization) { get_token_bearer(user) }

  path "/v1/users/redemptions" do
    get "Retrieves a list of redemptions" do
      tags "Users"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]



      response(200, "redemptions retrieved") do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer, nullable: false },
              reward: {
                type: :object,
                properties: {
                  id: { type: :integer, nullable: false },
                  name: { type: :string, nullable: false },
                },
                required: %w[id name points],
              },
            },
            required: %w[id reward],
          }

        let!(:redemptions) { create_list(:redemption, 3, user: user) }

        before do |example|
          submit_request(example.metadata)
        end

        it "returns a list of redemptions" do
          body = JSON.parse(response.body)

          expect(body.size).to eq(3)
          expect(body.first["reward"]["id"]).to  eq(redemptions.first.reward.id)
          expect(body.first["reward"]["name"]).to  eq(redemptions.first.reward.name)
        end
      end
    end

    post "Creates a redemption" do
      tags "Users"
      consumes "application/json"
      produces "application/json"
      security [Bearer: []]

      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          redemption: {
            type: :object,
            properties: {
              reward_id: { type: :integer },
            },
            required: ["reward_id"],
          },
        },
        required: ["redemption"],
      }

      response(201, "redemption created") do
        schema type: :object,
          properties: {
            id: { type: :integer, nullable: false },
            user_id: { type: :integer, nullable: false },
            reward_id: { type: :integer, nullable: false },
            redimed_at: { type: :string, nullable: false },
            created_at: { type: :string, nullable: false },
            updated_at: { type: :string, nullable: false },
          },
          required: %w[id user_id reward_id redimed_at created_at updated_at]

        let(:params) { { redemption: { reward_id: create(:reward, points_cost: 100).id } } }

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

        it "returns reward error" do
          body = JSON.parse(response.body)

          expect(response).to have_http_status(:unprocessable_entity)
          expect(body["errors"]).to include("Reward not found")
        end
      end

      response(422, "Not enoght points") do
        schema type: :object,
          properties: {
            error: { type: :string, nullable: false },
          }
        let(:gold_reward) { create(:reward, points_cost: 10000) }
        let(:params) { { redemption: { reward_id: gold_reward.id } } }

        before do |example|
          submit_request(example.metadata)
        end

        it "returns points error" do
          body = JSON.parse(response.body)

          expect(response).to have_http_status(:unprocessable_entity)
          expect(body["errors"]).to include("Not enough points")
        end
      end
    end
  end
end
