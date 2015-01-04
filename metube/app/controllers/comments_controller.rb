class CommentsController < ApplicationController
  #create a new comment - POST /videos/:video_id/comments
  def create
    @context = context
    @context.comments.create(comment_params)
    redirect_to context_url(@context)
  end

  #edit comment form - GET /videos/:video_id/comments/:id/edit
  def edit
    @context = context
    @comment = context.comments.find(params[:id])
  end

  #update an existing comment - PUT /videos/:video_id/comments/:id
  def update
    @context = context
    @context.comments.find(params[:id]).update(comment_params)
    redirect_to context_url(@context)
  end

  #destroy an existing comment - DELETE /videos/:video_id/comments/:id
  def destroy
    @context = context
    @context.comments.find(params[:id]).destroy
    redirect_to context_url(@context)
  end

  private
  def comment_params
    params.require(:comment).permit(:subject, :body, :commentable_id, :commentable_type)
  end

  def context
    if params[:video_id]
      id = params[:video_id]
      Video.find(params[:video_id])
    else
      id = params[:playlist_id]
      Playlist.find(params[:playlist_id])
    end
  end 

  def context_url(context)
    if Video === context
      video_path(context)
    else
      playlist_path(context)
    end
  end
    
end
