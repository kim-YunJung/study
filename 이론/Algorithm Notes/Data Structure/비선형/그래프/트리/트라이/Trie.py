class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word

# Trie 생성
my_trie = Trie()

# 단어 삽입
my_trie.insert("apple")
my_trie.insert("app")
my_trie.insert("banana")

# 단어 검색
print("Search 'apple':", my_trie.search("apple"))
print("Search 'app':", my_trie.search("app"))
print("Search 'banana':", my_trie.search("banana"))
print("Search 'grape':", my_trie.search("grape"))
