Rails.application.routes.draw do
  get '/:url', to: 'pages#show', as: :page
end
