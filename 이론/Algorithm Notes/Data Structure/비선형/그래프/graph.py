class Graph:
    def __init__(self):
        self.nodes = set()
        self.edges = {}

    def add_node(self, value):
        self.nodes.add(value)
        self.edges[value] = []

    def add_edge(self, from_node, to_node):
        self.edges[from_node].append(to_node)

    def display(self):
        for node, neighbors in self.edges.items():
            print(f"{node} -> {neighbors}")

# 그래프 생성
my_graph = Graph()

# 노드 추가
my_graph.add_node("A")
my_graph.add_node("B")
my_graph.add_node("C")
my_graph.add_node("D")
my_graph.add_node("E")

# 간선 추가
my_graph.add_edge("A", "B")
my_graph.add_edge("B", "C")
my_graph.add_edge("C", "D")
my_graph.add_edge("D", "E")
my_graph.add_edge("E", "A")

# 그래프 출력
my_graph.display()
