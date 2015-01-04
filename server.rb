require 'sinatra'

set :port, 4568
set :logging, :true

post '/' do
  puts params
  params["1"]
end

get '/' do
  "get"
end