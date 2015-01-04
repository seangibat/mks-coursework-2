def find_weird_40_num(x)
  y = 0
  while (y+=1)
    product = x * y
    return product if /\b4+0*\b/ =~ product.to_s
  end
end

def how_many_4s_0s_calculation(num)
  puts num
  num = num.to_s
  return 2 * num.count('4') + num.count('0')
end


puts how_many_4s_0s_calculation(find_weird_40_num(82))