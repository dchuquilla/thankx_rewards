# frozen_string_literal: true

require "rails_helper"
require "json-schema"

RSpec.configure do |config|
  config.openapi_root = Rails.root.join("swagger").to_s

  config.openapi_specs = {
    "v1/swagger.json" => {
      openapi: "3.0.1",
      info: {
        title: "Rewards API V1",
        version: "v1",
      },
      paths: {},
      servers: [
        {
          url: "http://{defaultHost}",
          variables: {
            defaultHost: {
              default: "127.0.0.1:3000",
            },
          },
        },
      ],
      components: {
        securitySchemes: {
          Bearer: {
            description: "This project implements a basic rewards redemption web app with a backend built using Ruby on Rails and a frontend built using React.",
            type: :apiKey,
            name: "authorization",
            in: :header,
          },
        },
      },
    },
  }

  config.openapi_format = :json
end
