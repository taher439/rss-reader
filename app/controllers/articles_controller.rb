class ArticlesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        @feed = Feed.find(params["feed_id"])
        sql = "SELECT * FROM articles WHERE feed_id = #{@feed.id} ORDER BY updloaded DESC"
        @articles = ActiveRecord::Base.connection.select_all(sql)
        respond_to do |format|
            format.html {render json: @articles }
        end
    end
    
    def create
        @feed = Feed.find(:params[:feed_id])
        @article = @feed.articles.create(article_params)
    end

    def show
        @article = Article.find(:params[:id])
    end
    
    def update
        @article = Article.find(params["id"])
        @article.read = true
        @article.save
    end 
    
    private 
        def article_params
            params.require(:article).permit(:title, :body)
        end
end
