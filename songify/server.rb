require 'sinatra'
require 'sinatra/json'
require "sinatra/reloader" if development?

require_relative 'songify.rb'

set :bind, '0.0.0.0' # This is needed for Vagrant

get '/' do
  @albums = Songify.albums_repo.list_all
  @playlists = Songify.playlists_repo.list_all
  erb :index
end

post '/albums' do
  result = Songify.albums_repo.create(params[:title], params[:year], params[:genre], params[:image_url])
  redirect to("/")
end

get '/albums/:id' do |id|
  @album = Songify.albums_repo.get_by_id(id)
  @songs = Songify.songs_repo.list_all_for_album(id)
  @id = id
  erb :album
end

post '/albums/:id' do |id|
  result = Songify.songs_repo.add(params[:name], params[:number], params[:youtube_link], id)
  redirect to("/albums/#{id}")
end

post '/playlists' do
  result = Songify.playlists_repo.create(params[:name])
  redirect to("/")
end

get '/playlists/:id' do |id|
  @id = id
  @all_songs = Songify.songs_repo.list_all
  @songs = Songify.songs_repo.list_all_for_playlist(id)
  erb :playlist
end

post '/playlists/:id' do |id|
  @id = id
  Songify.playlists_repo.add_song_to(id, params[:song_id])
  redirect to("playlists/#{id}")
end

delete '/playlists/:id' do |id|
  Songify.playlists_repo.delete_playlist(id)
  redirect to("/")
end

delete '/playlists/:playlist_id/songs/:song_id' do |playlist_id, song_id|
  Songify.playlists_repo.delete_song_from(playlist_id,song_id)
  redirect to("/playlists/#{playlist_id}")
end

put '/playlists/:id' do |id|
  Songify.playlists_repo.edit_playlist(id,params[:new_name])
  redirect to("/")
end

delete '/albums/:id' do |id|
  Songify.albums_repo.delete(id)
  redirect to("/")
end

put '/albums/:id' do |id|
  Songify.albums_repo.update(playlist_id, params[:album_id], params[:title], params[:year], params[:genre], params[:image_url])
  redirect to("/")
end

delete '/songs/:id' do |id|
  Songify.songs_repo.delete(id)
  redirect to("/albums/#{params[:album_id]}")
end

put '/songs/:id' do |id|
  Songify.songs_repo.update(id, params[:name], params[:number], params[:youtube_link])
  redirect to("/albums/#{params[:album_id]}")
end

get '/albums/:id/edit' do |id|
  @album = Songify.albums_repo.get_by_id(id)
  erb :album_edit
end
