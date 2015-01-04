class Car
	@@total_car_count = 0
	@@cars_per_color = Hash.new

	# class var total_car_count getter
	def self.total_car_count
		@@total_car_count
	end

	def self.most_popular_color
		@@cars_per_color.max_by { |k, v| v }[0]
	end

	def to_s()
		"I'm a car! I've driven #{@distance} and have #{@fuel} gallons gas left"
	end

	def initialize(color='blue')
		@fuel = 10
		@distance = 0
		@color = color
		@@total_car_count += 1
		if @@cars_per_color.key?(color)
			@@cars_per_color[color] += 1
		else
			@@cars_per_color[color] = 1
		end
	end

	def color=(color)
		@@cars_per_color[@color] -= 1
		@@cars_per_color[color] += 1
		@color = color
	end


	def drive(miles)
		if (@fuel - miles/20.0) >= 0
			@distance += miles
			@fuel -= miles/20.0
		else
			@distance += @fuel * 20.0
			@fuel = 0
			puts "You're out of gas!"
		end
	end

	def fuel_up()
		gallons_needed = 10.0 - @fuel
		puts "You must pay $#{3.5 * gallons_needed}"
		@fuel = 10.0
	end
end

class ConvertibleCar < Car
	def initialize(color=blue)
		super(color)
		@roof_open? = false
	end

	def top_down
		@roof_open? = true
	end

	def close_top
		@roof_open? = false
	end
end


car_a = Car.new('red')
car_b = Car.new('blue')
www = Car.new('red')
puts car_a
puts car_b
car_a.drive(10)
puts car_a
puts car_b
car_a.drive(232)
car_b.drive(117)
puts car_a
puts car_b
puts Car.total_car_count()
puts Car.most_popular_color