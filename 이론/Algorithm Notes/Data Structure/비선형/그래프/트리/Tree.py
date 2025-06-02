class TreeNode:
    def __init__(self, value):
        self.value = value
        self.children = []

    def add_child(self, child_node):
        self.children.append(child_node)

    def __repr__(self, level=0):
        ret = "\t" * level + repr(self.value) + "\n"
        for child in self.children:
            ret += child.__repr__(level + 1)
        return ret

# 트리 생성
root = TreeNode("Root")

# 노드 추가
child1 = TreeNode("Child 1")
child2 = TreeNode("Child 2")
child3 = TreeNode("Child 3")

root.add_child(child1)
root.add_child(child2)
root.add_child(child3)

child11 = TreeNode("Child 1.1")
child12 = TreeNode("Child 1.2")

child1.add_child(child11)
child1.add_child(child12)

# 트리 출력
print(root)
