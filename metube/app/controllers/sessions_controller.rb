class SessionsController < ApplicationController
  def new
    
  end

  def create
    @user = User.authenticate(params[:email], params[:password])
    puts @user
    if @user
      session[:user_id] = @user.id
      puts "yes"
      redirect_to "/videos"
    else
      puts "no"
      redirect_to "/log-in"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to "/"
  end
end
