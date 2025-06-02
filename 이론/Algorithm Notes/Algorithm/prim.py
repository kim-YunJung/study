import heapq

# 프림(Prim) 알고리즘은 주어진 연결 그래프에서 최소 신장 트리를 찾는 알고리즘입니다. 
# 최소 신장 트리는 그래프의 모든 정점을 연결하는 간선의 가중치 합이 최소인 트리를 의미합니다.

def prim(graph):
    visited = [False] * len(graph) # 방문한 정점 표시
    queue = [(0, 0)] # (가중치, 정점)
    result = 0

    while queue:
        weight, node = heapq.heappop(queue)

        # 이미 방문한 정점이라면 무시
        if visited[node]:
            continue

        # 정점을 방문하고 결과에 가중치 추가
        visited[node] = True
        result += weight

        # 현재 정점과 연결된 인접 정점 확인
        for adjacent, adj_weight in enumerate(graph[node]):
            if not visited[adjacent]:
                heapq.heappush(queue, (adj_weight, adjacent))

    return result

# 그래프 예시 (2차원 배열로 표현)
graph = [
    [0, 29, 0, 0, 10],
    [29, 0, 16, 0, 0],
    [0, 16, 0, 12, 0],
    [0, 0, 12, 0, 18],
    [10, 0, 0, 18, 0]
]

# 최소 신장 트리의 가중치 합
mst_weight = prim(graph)
print(mst_weight) # 출력: 65