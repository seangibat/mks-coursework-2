  class Songify::Album
    attr_reader :title, :year, :genre, :image_url, :id

    def initialize(params)
      @id = params[:id] || params["id"]
      @title = params[:title] || params["title"]
      @year = params[:year] || params["year"]
      @genre = params[:genre] || params["genre"]
      @image_url = params[:image_url] || params["image_url"]
    end
  end