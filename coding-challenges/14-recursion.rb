def fizzbuzz(n)
  if n==0
    return
  end
  fizzbuzz(n-1)
  if (n%3==0 && n%5==0)
    puts "fizzbuzz"
  elsif (n%3==0)
    puts "fizz"
  elsif (n%5==0)
    puts "buzz"
  else
    puts n
  end
end

def exp(a,b)
  return b==1 ? a : a * exp(a,b-1)
end

def three(n)
  if (n==1)
    puts n
    return
  elsif n % 2 == 0
    puts n
    three(n/2)
  else
    puts n
    three(n*3+1)
  end
end

puts exp(10,3)

# puts fizzbuzz(16)