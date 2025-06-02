import heapq

class MinHeap:
    def __init__(self):
        self.heap = []

    def insert(self, value):
        heapq.heappush(self.heap, value)

    def extract_min(self):
        if self.heap:
            return heapq.heappop(self.heap)
        else:
            return None

    def display(self):
        print(self.heap)

# 최소 힙 생성
my_heap = MinHeap()

# 데이터 삽입
my_heap.insert(5)
my_heap.insert(3)
my_heap.insert(8)
my_heap.insert(1)
my_heap.insert(10)

# 힙 출력
my_heap.display()

# 최소값 추출
min_value = my_heap.extract_min()
print("Extracted min value:", min_value)

# 힙 출력
my_heap.display()
