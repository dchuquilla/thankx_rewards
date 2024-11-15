# frozen_string_literal: true

RSpec.configure(&:disable_monkey_patching!) unless Rails.env.production?

Rswag::Api.configure do |c|
  c.openapi_root = Rails.root.to_s + "/swagger"
end
