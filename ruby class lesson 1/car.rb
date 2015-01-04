class Car
	def initialize
		@fuel = 10.0
		@distance = 0
		puts "the initialize method... is running!"
	end

	def drive(miles)
		if (miles/20.0 > @fuel)
			puts "You can't drive that far!"
		else
			@distance += miles
			@fuel -= miles/20.0
		end
	end

	def fuel_up
		puts "The car was filled with #{10-@fuel} gallons. Charge: #{(10-@fuel)*3.5}"
		@fuel = 10.0
	end

	def get_info
		"I'm a car. I've driven #{@distance} miles and have #{fuel} gallons of gas left."
	end
end