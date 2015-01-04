require 'sinatra'

set :bind, '0.0.0.0'

get '/' do
  "Hey man what's up"
end