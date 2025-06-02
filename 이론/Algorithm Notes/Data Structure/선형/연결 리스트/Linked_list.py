class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    # 연결 리스트에 노드 추가
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    # 연결 리스트 순회(iteration)
    def traverse(self):
        current = self.head
        while current:
            print(current.data, end=" ")
            current = current.next
        print()

# 빈 연결 리스트 생성
my_linked_list = LinkedList()

# 노드 추가
my_linked_list.append(1)
my_linked_list.append(2)
my_linked_list.append(3)

# 연결 리스트 순회
my_linked_list.traverse()
