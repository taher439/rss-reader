class FeedsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def new
        @feed = Feed.new
    end
    
    def index 
        @feed = Feed.new
        @feeds = Feed.all
    end 

    def edit
        @feeds = Feed.all
        @feed = Feed.find(params[:id])
    end

    def create
        require 'simple-rss'
        require 'open-uri'
        require 'nokogiri'
        @feeds = Feed.all
        @feed = Feed.new(feed_params)
        if @feed.save
            @articles = @feed.articles
            rss = SimpleRSS.parse(open(@feed.website)).items[0..30]
            rss.each do |result|
                title_ = result.title.force_encoding('UTF-8')
                link_ = result.link.force_encoding('UTF-8')
                date_ = result.pubDate
                body_ = Nokogiri::HTML(result.description.force_encoding('UTF-8')).text

                @feed.articles.create(title: title_, 
                    body: sanitize_string(body_), 
                    read: false,
                    link: link_,
                    updloaded: date_)
            end
        end
        redirect_to feeds_path
    end 
    
    def update
        require 'simple-rss'
        require 'open-uri'
        require 'nokogiri'
        @feeds = Feed.all
        @feed = Feed.find(params[:id])
        @articles = @feed.articles
        rss = SimpleRSS.parse(open(@feed.website)).items[0]
        title_ = rss.title.force_encoding('UTF-8')
        if !Article.exists?(title: title_)
            link_ = rss.link.force_encoding('UTF-8')
            date_ = rss.pubDate
            body_ = Nokogiri::HTML(rss.description.force_encoding('UTF-8')).text

            @feed.articles.create(title: title_, 
                body: sanitize_string(body_), 
                read: false,
                link: link_,
                updloaded: date_)
        end
        render 'index'
    end
    
    def show
        @feed = Feed.find(params[:id])
        @articles = [@feed.articles]
    end

    def destroy
        @feeds = Feed.all
        @feed = Feed.find(params[:id])
        @feed.articles.each do |article|
            article.destroy
        end
        @feed.destroy
    end

    private 
        def feed_params
            params.require(:feed).permit(:website, :title)
        end

        def sanitize_string(s)
            Rails::Html::FullSanitizer.new.sanitize(s)
        end 
end
