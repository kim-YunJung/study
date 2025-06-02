from collections import deque

# 빈 큐 생성
my_queue = deque()

# 원소를 포함한 큐 생성
my_queue_with_elements = deque([1, 2, 3, 4, 5])

# 큐에 원소 추가
my_queue.append(6)
my_queue.append(7)

# 큐에서 원소 추출
popped_element = my_queue.popleft()

# 큐의 가장 앞의 원소 조회 (제거하지 않고)
peek_element = my_queue[0]

# 큐가 비어있는지 확인
is_empty = len(my_queue) == 0

# 큐 순회(iteration)
for element in my_queue_with_elements:
    print(element)
