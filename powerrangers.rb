module Puncher
	def punch(person)
		strength = rand(10)
		if strength == 0
			puts "#{@name}'s punch to #{person.name} did nothing!"
		elsif strength > 0 && < 5
			person.scream
			person.run
		elsif strength > 5
			puts "#{peson.name} was somersaulted into the air!"
			person.caffeine_level -= 10
		end

		@caffeine_level -= 5
	end
end

class Person
	attr_reader :name
	attr_writer :caffeine_level

	def initialize(name)
		@name = name
		@caffeine_level = 0
	end

	def run
		puts "#{@name} is running!"
		@caffeine_level -= 2
	end

	def scream
		puts "#{@name} screams!"
	end

	def drink_coffee
		@caffeine_level += 10
	end
end

class PowerRanger < Person
	include Puncher

	def initialize (name, strength, color)
		super(name)
		@strength = strength
		@color = color
	end

	def self.use_megazord(person)
		puts "POWER RANGERS UNITE! MEGAZORD!"
		puts "#{person.name} has been destroyed!"
		person = nil;
	end
end

class EvilNinja < Person
	include Puncher
	
	def initialize (name, strength, evilness)
		super(name)
		@strength = strength
		@evilness = evilness
	end

	def cause_mayhem(person)
		"Muaha! Mayhem! #{person.name} shall die!"
		person.caffeine_level = 0
	end
end

def fight_scene(ranger1, ranger2, evil1, evil2, person1, person2)
	puts "A lonely street with no one around..."
	puts "#{person1.name} and #{person2.name} walk onto the scene.."
	puts "#{person1.name}: I love coffee!"
	person1.drink_coffee
	person2.drink_coffee

	puts "MAYHEm! ITS THE EVIL NINJAS! But oh cool it's the Power Rangers too. I guess."
	evil1.cause_mayhem(person1)
	ranger1.punch(evil1)
	ranger2.punch(evil2)
	evil2.punch(ranger2)
	person2.scream
	person2.run
	PowerRanger.use_megazord(evil2)
	PowerRanger.use_megazord(evil1)
end
