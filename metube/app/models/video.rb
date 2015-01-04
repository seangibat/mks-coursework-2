class Video < ActiveRecord::Base
  has_many :comments, :as => :commentable
  has_many :playlistvideos
  has_many :playlists, :through => :playlistvideos
end
