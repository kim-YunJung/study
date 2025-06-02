import heapq

# 빈 우선순위 큐 생성
my_priority_queue = []

# 원소를 포함한 우선순위 큐 생성
my_priority_queue_with_elements = [3, 1, 4, 1, 5, 9, 2, 6]

# 우선순위 큐에 원소 추가
heapq.heappush(my_priority_queue, 5)
heapq.heappush(my_priority_queue, 2)
heapq.heappush(my_priority_queue, 8)

# 우선순위 큐에서 최솟값 추출
min_value = heapq.heappop(my_priority_queue)

# 우선순위 큐에서 최솟값 조회 (제거하지 않고)
peek_min_value = my_priority_queue[0]

# 원소를 추가하지 않고 최솟값 조회
min_value_without_push = heapq.nsmallest(1, my_priority_queue_with_elements)[0]

# 우선순위 큐 순회(iteration)
for element in my_priority_queue_with_elements:
    print(element)
