# frozen_string_literal: true

Rails.application.routes.draw do
  get 'prodile/index'
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  namespace :v1 do
    namespace :users do
      get "points_balance", to: "profile#index"
    end

    get "rewards", to: "rewards#index"
  end
end
