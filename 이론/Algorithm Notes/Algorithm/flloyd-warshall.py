# 플루이드-워셜(Flloyd-Warshall) 알고리즘은 그래프의 모든 정점 쌍 간의 최단 거리를 찾는 알고리즘입니다. 
# 이 알고리즘은 다이나믹 프로그래밍을 기반으로 하며, 3중 반복문을 사용하여 구현할 수 있습니다.
def floyd_warshall(graph):
    # 거리 행렬 초기화 (자기 자신으로의 거리는 0, 나머지는 무한대)
    distances = [[float('infinity') if i != j else 0 for j in range(len(graph))] for i in range(len(graph))]

    # 그래프의 간선 정보로 거리 행렬 초기화
    for i in range(len(graph)):
        for j, weight in enumerate(graph[i]):
            if weight != 0:
                distances[i][j] = weight

    # 플루이드-워셜 알고리즘
    for k in range(len(graph)):
        for i in range(len(graph)):
            for j in range(len(graph)):
                distances[i][j] = min(distances[i][j], distances[i][k] + distances[k][j])

    return distances

# 그래프 예시 (2차원 배열로 표현, 0은 연결되지 않음)
graph = [
    [0, 5, 0, 8],
    [7, 0, 9, 0],
    [2, 0, 0, 4],
    [0, 0, 3, 0]
]

# 모든 정점 쌍 간의 최단 거리
shortest_distances = floyd_warshall(graph)
for row in shortest_distances:
    print(row)