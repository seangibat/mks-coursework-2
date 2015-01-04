# required gem includes
require 'sinatra'
require "sinatra/json"
require "sinatra/reloader" if development?
require 'pry-byebug'

# require file includes
require_relative 'jokes_app.rb'

set :bind, '0.0.0.0' # Vagrant fix
Pry.config.input = STDIN
Pry.config.output = STDOUT

get '/' do
  send_file 'index.html'
end

#-------- JSON API routes -----------

# more info sinatra json: http://www.sinatrarb.com/contrib/json.html
get '/api/jokes' do
  @jokes = Jokes.orm.get_all_jokes.map {|joke| joke.to_json}
  json @jokes
end

post '/api/jokes' do
  joke_info = params
  joke = Jokes.orm.add_joke(
    joke_info["question"],
    joke_info["answer"]
    )
  json joke.to_json
end

delete '/api/jokes/:id' do
  Jokes.orm.delete_joke(params[:id].to_i)
  json({ id: params[:id] })
end