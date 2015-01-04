word1 = "aabbaca"

def palindrome?(word)
  word == word.reverse
end

# def permute(word)
#   length = word.length
#   array = word.split('')
#   solution = []
#   solution.push(array[0])
#   word.each_with_index do |letter, index|
#     l = solution.length
#     (index+1 * length).times.each_with_index do |v,i|

#     end
#   end
# end

def permute(word, i=0, solution=[])
  if solution == []
    solution.push(word[0])
    permute(word, 1, solution)
  end

  solution2 = []
  solution.each_with_index do |value,index|
    (i+1).times do |i|
      x = value
      x.insert(i,word[i])
      puts x
      solution2.push(x)
    end
  end

  if (i < word.length)
    permute(word, i+1, solution2)
  end
end

def fn(word)
  obj = Hash.new(0)
  word = word.split('')
  word.each do |v|
    obj[v] += 1
  end

  odd = 0

  obj.each do |key,value|
    if (value % 2 != 0)
      odd += 1
    end
  end

  return true unless odd > 1
  return false
end

puts permute("abc")