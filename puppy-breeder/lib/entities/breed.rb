module PuppyBreeder
  class Breed
    attr_reader :price, :type

    def initialize(params)
      puts params
      @type = params[:type] || params["type"] || "Lab"
      @price = params[:price] || params["price"] || 0
    end

  end
end