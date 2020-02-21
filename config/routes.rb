Rails.application.routes.draw do 
  get 'feeds/index'
  get '/feeds' => redirect("/")
  resources :feeds do 
    resources :articles
  end

  root 'feeds#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
