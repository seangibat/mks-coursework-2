  class Songify::Song
    attr_reader :name, :youtube_link, :number, :id

    def initialize(params)
      @name = params[:name] || params["name"]
      @number = params[:number] || params["number"]
      @youtube_link = params[:youtube_link] || params["youtube_link"]
      @id = params[:id] || params["id"]
    end
  end