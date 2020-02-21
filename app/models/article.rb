class Article < ApplicationRecord
  belongs_to :feed
  validates :body, presence: true
  validates :title, presence: true
  validates :updloaded, presence: true
end
