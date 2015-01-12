arrr = [1,2,3,7,6,5,5,6,4]

def qsort(arr):
  print arr
  if len(arr) <= 1:
    return arr
  pivot = arr[-1]
  left = []
  right = []
  same = [pivot]
  for item in arr[:-1]:
    if item < pivot: 
      left.append(item)
    elif item > pivot: 
      right.append(item)
    elif item == pivot:
      same.append(item)

  return qsort(left) + same + qsort(right)

print qsort(arrr)