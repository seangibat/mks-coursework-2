class Playlist < ActiveRecord::Base
  has_many :comments, :as => :commentable
  has_many :playlistvideos
  has_many :videos, :through => :playlistvideos
end
