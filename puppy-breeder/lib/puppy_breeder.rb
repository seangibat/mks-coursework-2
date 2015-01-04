# we initialize the module here to use in our other files
module PuppyBreeder
  module Repos
  end
end

require_relative './repos/repo_helper.rb'
require_relative './entities/puppy.rb'
require_relative './entities/purchase_request.rb'
require_relative './entities/breed.rb'
require_relative './ui.rb'


PuppyBreeder.puppies_repo.create_table
PuppyBreeder::UI.menu