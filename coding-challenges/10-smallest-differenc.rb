def smallest_dif(array)
  half = (array.length / 2.0).ceil - 1
  len = array.length
  i = 0
  smallest = (array[0] - array[1]).abs

  while (i <= half)
    x = i + 1
    while (x < len)
      diff = (array[i] - array[x]).abs
      puts "smallest: #{smallest}, i: #{i}, x: #{x}, "
      smallest = diff if (diff < smallest)
      x += 1
    end
    i += 1
  end
  smallest
end

x = [1,10,5,25,24]

puts smallest_dif(x)