class Page < ApplicationRecord
  validates :url, uniqueness: true
end
