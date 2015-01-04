require_relative 'cookbook'

mex_cuisine = Cookbook.new("Mexican Cooking")
burrito = Recipe.new("Bean Burrito", ["tortilla", "bean"], ["heat beans", "place beans in tortilla", "roll up"])
pizza = Recipe.new("Pizza", ["crust", "sauce", "cheese"], ["sauce the crust", "put cheese on crust", "bake at 500 for 10 minutes"])


puts mex_cuisine.title # Mexican Cooking
puts burrito.title # Bean Burrito
p burrito.ingredients # ["tortilla", "bean", "cheese"]
p burrito.steps # ["heat beans", "heat tortilla", "place beans in tortilla", "sprinkle cheese on top", "roll up"]

mex_cuisine.title = "Mexican Recipes"
puts mex_cuisine.title # Mexican Recipes

burrito.title = "Veggie Burrito"
burrito.ingredients = ["tortilla", "tomatoes"]
burrito.steps = ["heat tomatoes", "place tomatoes in tortilla", "roll up"]

p burrito.title # "Veggie Burrito"
p burrito.ingredients # ["tortilla", "tomatoes"]


mex_cuisine.recipes # []
mex_cuisine.add_recipe(burrito)
mex_cuisine.add_recipe(pizza)
p mex_cuisine.recipes # [#<Recipe:0x007fbc3b92e560 @title="Veggie Burrito", @ingredients=["tortilla", "tomatoes"], @steps=["heat tomatoes", "place tomatoes in tortilla", "roll up"]>]

mex_cuisine.recipe_titles # Veggie Burrito
mex_cuisine.recipe_ingredients # These are the ingredients for Veggie Burrito: ["tortilla", "bean"]

burrito.print_recipe
pizza.print_recipe
mex_cuisine.print_cookbook
mex_cuisine.all_ingredients
mex_cuisine.rand_recipe