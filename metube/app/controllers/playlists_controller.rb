class PlaylistsController < ApplicationController
  #list all posts - GET /videos
  def index
    @playlists = Playlist.all
  end

  #show a single post - GET /videos/:id
  def show
    @playlist = Playlist.find(params['id'])
    @videos = @playlist.videos
    @comment = @playlist.comments.new
    @comments = @playlist.comments
  end

  #new post creation form - GET /videos/new
  def new
    @playlist = Playlist.new
  end

  #create a new post - POST /videos
  def create
    play = Playlist.create(playlist_params)
    redirect_to "/playlists/#{play.id}"
  end

  #edit post form - GET /videos/:id/edit
  def edit
    @playlist = Playlist.find(params['id'])
  end

  #update an existing post - PUT /videos/:id
  def update
    Playlist.find(params[:id]).update(playlist_params)
    redirect_to "/playlists/#{params[:id]}"
  end

  #destroy an existing post - DELETE /videos/:id
  def destroy
    Playlist.find(params[:id]).destroy
    redirect_to "/playlists"
  end

  def playlist_params
    params.require(:playlist).permit(:title, :description, video_ids: [])
  end
end
