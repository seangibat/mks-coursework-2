  class Songify::Playlist
    attr_reader :name, :id

    def initialize(params)
      @id = params[:id] || params["id"]
      @name = params[:name] || params["name"]
    end
  end