import heapq

class Graph:
    def __init__(self):
        self.nodes = set()
        self.edges = {}

    def add_node(self, value):
        self.nodes.add(value)
        self.edges[value] = []

    def add_edge(self, from_node, to_node, weight):
        self.edges[from_node].append((to_node, weight))
        self.edges[to_node].append((from_node, weight))  # 양방향 그래프라면 추가

    def dijkstra(self, start):
        distances = {node: float('inf') for node in self.nodes}
        distances[start] = 0
        priority_queue = [(0, start)]

        while priority_queue:
            current_distance, current_node = heapq.heappop(priority_queue)

            if current_distance > distances[current_node]:
                continue

            for neighbor, weight in self.edges[current_node]:
                distance = current_distance + weight
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    heapq.heappush(priority_queue, (distance, neighbor))

        return distances

# 그래프 생성
my_graph = Graph()
my_graph.add_node("A")
my_graph.add_node("B")
my_graph.add_node("C")
my_graph.add_node("D")
my_graph.add_node("E")

my_graph.add_edge("A", "B", 5)
my_graph.add_edge("B", "C", 3)
my_graph.add_edge("C", "D", 1)
my_graph.add_edge("D", "E", 2)
my_graph.add_edge("A", "E", 8)

# 최단 경로 계산
start_node = "A"
shortest_distances = my_graph.dijkstra(start_node)

# 결과 출력
for node, distance in shortest_distances.items():
    print(f"Shortest distance from {start_node} to {node}: {distance}")
