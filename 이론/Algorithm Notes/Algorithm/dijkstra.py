import heapq
# 다익스트라 알고리즘은 가중치가 있는 그래프에서 주어진 시작 정점에서 
# 다른 모든 정점까지의 최단 거리를 찾는 알고리즘입니다. 

def dijkstra(graph, start):
    # 거리 배열을 무한대로 초기화
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    queue = [(0, start)] # (거리, 정점)

    while queue:
        current_distance, current_node = heapq.heappop(queue)

        # 이미 방문한 정점이라면 무시
        if distances[current_node] < current_distance:
            continue

        # 현재 정점과 연결된 인접 정점 확인
        for adjacent, weight in graph[current_node].items():
            distance = current_distance + weight

            # 최단 거리를 발견하면 업데이트하고 큐에 추가
            if distance < distances[adjacent]:
                distances[adjacent] = distance
                heapq.heappush(queue, (distance, adjacent))

    return distances

# 그래프 예시 (딕셔너리로 표현)
graph = {
    'A': {'B': 8, 'C': 1, 'D': 2},
    'B': {},
    'C': {'B': 5, 'D': 2},
    'D': {'E': 3, 'F': 5},
    'E': {'F': 1},
    'F': {'A': 5}
}

# 시작 정점 A로부터의 최단 거리
distances = dijkstra(graph, 'A')
print(distances) # 출력: {'A': 0, 'B': 6, 'C': 1, 'D': 2, 'E': 5, 'F': 6}