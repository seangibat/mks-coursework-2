class Num
  attr_reader :num

  def initialize(n=0)
    @num = n.to_s
  end

  def increment
    i = -1
    x = add1(i)
    return @num[i] = x.to_s if x != 10
    while x==10
      @num[i]="0"
      i-=1
      if @num[i]==nil
        @num.insert(0,"1")
        return
      end
      x=add1(i)
      if x != 10
        @num[i]=x.to_s
        return
      end
    end
  end

  def add1(i)
    return @num[i].to_i+1
  end
end

b = Num.new(189)

b.increment

puts b.num