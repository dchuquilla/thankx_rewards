# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Reward, type: :model do
  describe 'validations' do
    it "is valid with valid attributes" do
      expect(build(:reward)).to be_valid
    end
  end
end
