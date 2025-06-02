# 빈 배열 생성
my_array = []

# 원소를 포함한 배열 생성
my_array_with_elements = [1, 2, 3, 4, 5]

# 다차원 배열 생성
multi_dimensional_array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# 배열의 길이(크기) 확인
array_length = len(my_array_with_elements)

# 배열의 특정 원소에 접근
element = my_array_with_elements[2]  # 3번째 원소에 접근

# 배열의 원소 변경
my_array_with_elements[0] = 10  # 첫 번째 원소를 10으로 변경

# 배열에 원소 추가
my_array.append(6)  # 배열에 6을 추가

# 배열의 원소 삭제
del my_array_with_elements[2]  # 3번째 원소 삭제

# 배열 순회(iteration)
for element in my_array_with_elements:
    print(element)

# 배열의 특정 원소 인덱스 찾기
index = my_array_with_elements.index(4)  # 4의 인덱스를 찾음

# 배열 슬라이싱
sub_array = my_array_with_elements[1:4]  # 2번째부터 4번째 원소까지 슬라이싱
