#Refer to this class as PuppyBreeder::PurchaseRequest
module PuppyBreeder
  class PurchaseRequest
    attr_reader :type, :customer, :price
    attr_accessor :complete, :id

    def initialize(params)
      @type = params[:type] || params["type"]
      @customer = params[:customer] || params["customer"]
      @complete = params[:complete] || params["complete"] || false
      @price = params[:price] || params["price"] || 0
      @price = @price.to_i
      @id = params[:id] || params["id"] || nil
    end
  end
end
