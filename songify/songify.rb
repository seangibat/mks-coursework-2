module Songify
  module Repos
  end
end

# require all lib/ entities and repos files here
require_relative 'lib/entity/album.rb'
require_relative 'lib/entity/song.rb'
require_relative 'lib/entity/playlist.rb'
require_relative 'lib/repos/repo_helper.rb'