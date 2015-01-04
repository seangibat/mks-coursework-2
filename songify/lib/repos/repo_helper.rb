module Songify
  def self.albums_repo=(repo)
    @albums_repo=repo
  end

  def self.albums_repo
    @albums_repo
  end

  def self.songs_repo=(repo)
    @songs_repo=repo
  end

  def self.songs_repo
    @songs_repo
  end

  def self.playlists_repo=(repo)
    @playlists_repo=repo
  end

  def self.playlists_repo
    @playlists_repo
  end
end

require_relative 'repo.rb'
require_relative 'albums.rb'
require_relative 'songs.rb'
require_relative 'playlists.rb'

Songify.albums_repo = Songify::Repos::Albums.new
Songify.songs_repo = Songify::Repos::Songs.new
Songify.playlists_repo = Songify::Repos::Playlists.new