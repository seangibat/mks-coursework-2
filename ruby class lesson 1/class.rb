

class Pet
	def initialize
		@noise = "woof"
		@weight = 1
	end

  	def speak
		puts "#{noise} #{noise}"
  	end

  	def walk(yards)
		puts "*walks #{yards} yards*"
  	end

  	def eat(pounds)
		puts "*eats #{pounds} pounds of kibble"
		@weight += pounds
  	end

  	def set_noise(noise)
  		@noise = noise
  	end
end

class Car
	def initalize
		@total_driven = 0
		@gas = 0
	end
	def drive(miles)
		@total_driven += miles
		puts "Drove #{miles} miles for a total of #{@total_driven}! Whew!"
	end
	def fill_gas(gallons)
		@gas += gallons
		puts "Now have #{@gas} in the car.."
	end
end

dog = Pet.new

class Marker
	def set_color(my_color)
		@color = my_color
	end

	def write
		puts("I am writing with a #{@color} marker!")
	end
end

def convert_to_send
	5.send('*', 5)
	"omg".send('upcase')
	['a', 'b', 'c'].send('at',1)
	['a', 'b', 'c'].send('insert', [2, 'o', 'h', 'n', 'o'])
	{}.send('size')
	{character: "Mario"}.send('has_key?',:character)
end

def convert_to_not_send
	6-32
	{html: true, json: false}.keys
	"MakerSquare" * 6
	"MakerSquare".split('a')
	['alpha', 'beta'][3]
end