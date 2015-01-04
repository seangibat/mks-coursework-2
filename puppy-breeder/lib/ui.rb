class PuppyBreeder::UI
  def self.menu
    input = nil
    until input == "6" or input == "exit"
      puts "---MENU---"
      puts "[1] Set Price for a Breed"
      puts "[2] Add a Puppy"
      puts "[3] Make Purchase Request"
      puts "[4] View and Complete Pending Purchase Requests"
      puts "[5] View Completed Purchase Requests"
      puts "[6] Exit"
      puts "--- Please select a number to continue."
      input = gets.chomp
      make_selection(input)
    end
  end

  def self.make_selection(selection)
    case selection
    when "1"
      set_breed_price
    when "2"
      add_puppy
    when "3"
      make_purchase_request
    when "4"
      view_pending_purchase_requests
    when "5"
      view_completed_purchase_requests
    end
  end

  def self.set_breed_price
    puts "Setting breed price."
    puts "Enter breed name."
    type = gets.chomp
    puts "Enter price"
    price = gets.chomp
    puts "Setting $#{price} for #{type}."
    breed = PuppyBreeder.breeds_repo.set(type,price)
    if breed != nil
      puts "Breed price set."
    else
      puts "Error: invalid input."
    end
  end

  def self.make_purchase_request
    puts "Making purchase request."
    puts "Please enter the customer's name."
    customer = gets.chomp
    puts "Please enter the desired breed."
    type = gets.chomp
    request = PuppyBreeder.requests_repo.add({type:type, customer:customer})
    if request != nil
      puts "Request made successfully."
    else
      puts "Error: price for breed does not exist."
      puts "You must enter a price for a breed before entering a purchase request for that type."
    end
  end

  def self.add_puppy
    puts "Generating new puppy."
    puts "What type of puppy shall we evilly generate?"
    type = gets.chomp
    puts "What is its name?"
    name = gets.chomp
    puts "Confining #{name} to a small space in 3, 2, .."
    puppy = PuppyBreeder.puppies_repo.add(type, name)
    if puppy != nil
      puts "Puppy added."
    else
      puts "Error: invalid puppy type."
    end
  end

  def self.view_pending_purchase_requests
    puts "Viewing pending."
    input = nil

    while (input != "exit")
      puts "Enter a purchase ID to complete."
      pending = PuppyBreeder.requests_repo.get_pending
      pending.each {|v| puts "ID: #{v.id.to_s}, Customer: #{v.customer}, Breed: #{v.type}, Price: #{v.price.to_s}" }
      puts "Enter an ID to attempt to complete it or type 'exit' without quotes."
      input = gets.chomp
      complete_purchase_request(input) if not input == 'exit'
    end
  end

  def self.complete_purchase_request(id)

    puts "Trying to complete #{id} purchase request."
    request = PuppyBreeder.requests_repo.get_by_id(id)
    type = request.type
    count = PuppyBreeder.puppies_repo.count(type)

    if count > 0
      result = PuppyBreeder.requests_repo.complete(id)
      if result = nil
        puts "Invalid input."
        return nil
      end
      puppy = PuppyBreeder.puppies_repo.remove(type)
      puts "Purchase request completed. #{puppy.name} the #{puppy.type} has been given."
    elsif count == 0
      puts "You don't have enough puppies to complete this request!"
    else
      puts "Invalid input.."
    end

  end

  def self.view_completed_purchase_requests
    puts "Viewing completed requests."
    completed = PuppyBreeder.requests_repo.get_completed
    completed.each {|v| puts "ID: #{v.id.to_s}, Customer: #{v.customer}, Breed: #{v.type}, Price: #{v.price.to_s}" }
  end


end