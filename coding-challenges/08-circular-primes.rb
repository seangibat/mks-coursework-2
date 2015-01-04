$primes = { }
$circs = { }

def is_prime?(num)
  if $primes.has_key?(num.to_s) then return $primes[num.to_s] end
  if num % 2 == 0 then return false end
  sqrt = Math.sqrt(num) / 2 + 1
  x = 3
  (1..sqrt).each do
    if num % x == 0
      $primes[num.to_s] = false
      return false
    end
    x+=2
  end
  $primes[num.to_s] = true
  true
end

def circ_prime?(num)
  num = num.to_s
  if $circs.has_key?(num) then return $circs[num] end
  len = num.length;
  (1..len).each do
    if not is_prime? num.to_i
      $circs[num] = false
      return false 
    end
    num = num[-1] + num[0..-2]
  end
  $circs[num] = true
  true
end

def circ_primes_below_n(n)
  array = []
  (1..n).each do |x|
    if circ_prime?(x) then array << x end
  end
  array
end

# puts is_prime?(7)

# puts circ_prime?(199933)

circ_primes_below_n(1000000)

# puts $primes