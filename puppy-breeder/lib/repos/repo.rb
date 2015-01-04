require 'pg'

class PuppyBreeder::Repos::Repo
  def initialize
    @db = PG.connect(dbname: 'puppy-breeder-db')
  end
end