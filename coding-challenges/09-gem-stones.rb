n = gets.chomp
gems = gets.chomp.split('').uniq

(n.to_i-1).times do
    elements = gets.chomp.split('')
    gems = gems.select{|v| elements.include?(v) }
end

puts gems.length