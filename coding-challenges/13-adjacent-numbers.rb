def find_largest_subset(array)
  array.each_with_index do |v,i|
    for i2 in i..array.length-1
      puts i2
    end
  end
end

find_largest_subset([1,80,30,4,50])