Rails.application.routes.draw do
  root 'dashboard#index'
  namespace :api do
    resources :events, only: [:index, :create, :update, :destroy, :complete] do
      get :search, on: :collection
      member do
      patch :complete
	end
    end
  end
end