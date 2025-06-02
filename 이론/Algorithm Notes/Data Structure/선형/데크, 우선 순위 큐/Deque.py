from collections import deque

# 빈 덱 생성
my_deque = deque()

# 원소를 포함한 덱 생성
my_deque_with_elements = deque([1, 2, 3, 4, 5])

# 덱의 길이(크기) 확인
deque_length = len(my_deque_with_elements)

# 덱의 앞쪽에 원소 추가
my_deque.appendleft(0)

# 덱의 뒤쪽에 원소 추가
my_deque.append(6)

# 덱의 앞쪽 원소 추출
front_element = my_deque.popleft()

# 덱의 뒤쪽 원소 추출
rear_element = my_deque.pop()

# 덱 순회(iteration)
for element in my_deque_with_elements:
    print(element)

# 덱의 특정 원소 인덱스 찾기
index = my_deque_with_elements.index(3)  # 3의 인덱스를 찾음
