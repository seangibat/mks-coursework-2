
class VideosController < ApplicationController
  before_action :require_login 

  #list all posts - GET /videos
  def index
    @videos = Video.all
  end

  #show a single post - GET /videos/:id
  def show
    @video = Video.find(params['id'])
    @comment = @video.comments.new
    @comments = @video.comments
  end

  #new post creation form - GET /videos/new
  def new
    @video = Video.new
  end

  #create a new post - POST /videos
  def create
    vid = Video.create(video_params)
    redirect_to "/videos/#{vid.id}"
  end

  #edit post form - GET /videos/:id/edit
  def edit
    @video = Video.find(params['id'])
  end

  #update an existing post - PUT /videos/:id
  def update
    Video.find(params[:id]).update(video_params)
    redirect_to "/videos/#{params[:id]}"
  end

  #destroy an existing post - DELETE /videos/:id
  def destroy
    Video.find(params[:id]).destroy
    redirect_to "/videos"
  end

  def video_params
    params.require(:video).permit(:title, :youtube_id, :description)
  end

  def require_login
    redirect_to "/log-in" unless session[:user_id]
  end
end
