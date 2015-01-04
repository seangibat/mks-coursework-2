#Refer to this class as PuppyBreeder::Puppy
module PuppyBreeder
  class Puppy
    attr_reader :type, :name

    def initialize(params)
      @type = params[:type] || params["type"] || "Lab"
      @name = params[:name] || params["name"] || "Spot"
    end

  end
end