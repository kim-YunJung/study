class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size

    def _hash_function(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        index = self._hash_function(key)
        if self.table[index] is None:
            self.table[index] = []
        self.table[index].append((key, value))

    def get(self, key):
        index = self._hash_function(key)
        if self.table[index] is not None:
            for k, v in self.table[index]:
                if k == key:
                    return v
        return None

    def remove(self, key):
        index = self._hash_function(key)
        if self.table[index] is not None:
            for i, (k, v) in enumerate(self.table[index]):
                if k == key:
                    del self.table[index][i]
                    return

    def display(self):
        for i in range(self.size):
            if self.table[i] is not None:
                print(f"Bucket {i}: {self.table[i]}")

# 해시 테이블 생성
my_hash_table = HashTable(size=10)

# 데이터 삽입
my_hash_table.insert("apple", 5)
my_hash_table.insert("banana", 7)
my_hash_table.insert("cherry", 3)

# 데이터 조회
print("apple:", my_hash_table.get("apple"))
print("banana:", my_hash_table.get("banana"))
print("grape:", my_hash_table.get("grape"))

# 데이터 삭제
my_hash_table.remove("apple")

# 해시 테이블 출력
my_hash_table.display()
