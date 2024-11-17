# frozer_string_literal: true

require 'rails_helper'

RSpec.describe "V1::Rewards", type: :request do
  let(:rewards) { create_list(:reward, 10) }

  path "/v1/rewards" do
    get "Retrieves all rewards" do
      tags "Rewards"
      consumes "application/json"
      produces "application/json"

      response(200, "rewards retrieved") do
        schema type: :object,
          properties: {
            rewards: {
              type: :array,
              items: {
                type: :object,
                properties: {
                  id: { type: :integer, nullable: false },
                  name: { type: :string, nullable: false },
                  description: { type: :string, nullable: false },
                  points_cost: { type: :integer, nullable: false },
                },
                required: %w[id name description points_cost]
              }
            }
          },
          required: %w[rewards]

        before do |example|
          rewards
          submit_request(example.metadata)
        end

        it "returns all rewards" do
          body = JSON.parse(response.body)
          expect(body["rewards"].size).to eq(rewards.size)
        end
      end
    end
  end
end
