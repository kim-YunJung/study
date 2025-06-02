# 빈 스택 생성
my_stack = []

# 원소를 포함한 스택 생성
my_stack_with_elements = [1, 2, 3, 4, 5]

# 스택에 원소 추가
my_stack.append(6)
my_stack.append(7)

# 스택에서 원소 추출
popped_element = my_stack.pop()

# 스택의 가장 위의 원소 조회 (제거하지 않고)
peek_element = my_stack[-1]

# 스택이 비어있는지 확인
is_empty = len(my_stack) == 0

# 스택 순회(iteration)
for element in my_stack_with_elements:
    print(element)
