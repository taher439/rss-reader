class Feed < ApplicationRecord
    has_many :articles 
    validates :website, presence: true
    validates :title, presence: true
end
