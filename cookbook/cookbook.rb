class Cookbook
	attr_accessor :title
	attr_reader :recipes

	def initialize(title)
		@title = title
		@recipes = []
	end

	def add_recipe(recipe)
		@recipes.push(recipe)
		puts "Added #{recipe.title} to #{@title}."
	end

	def recipe_titles
		@recipes.each do |r|
			puts r.title
		end
	end

	def recipe_ingredients
		@recipes.each do |r|
			puts "These are the ingredients for #{r.title}: #{r.ingredients}"
		end
	end

	def print_cookbook
		@recipes.each do |r|
			r.print_recipe
		end
	end

	def all_ingredients
		@recipes.each do |r|
			print r.ingredients.join(" ") + " "
		end
		puts ""
	end

	def rand_recipe
		@recipes[rand(@recipes.length)].print_recipe
	end
end

class Recipe
	attr_accessor :title, :steps, :ingredients

	def initialize(title, ingredients, steps)
		@title = title
		@ingredients = ingredients
		@steps = steps
	end

	def print_recipe
		puts "----------"
		puts @title
		print "Ingredients: "
		puts @ingredients.join(", ")
		puts "Steps:"
		@steps.each_with_index do |s, i|
			puts "#{i+1}. #{s}"
		end
		puts "----------"
	end
end
