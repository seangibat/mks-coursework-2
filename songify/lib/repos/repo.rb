require 'pg'

class Songify::Repos::Repo
  def initialize
    @db = PG.connect(dbname: 'songify-db')
  end
end