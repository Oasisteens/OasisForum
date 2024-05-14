import json
import random
from datetime import datetime, timedelta
from bson.objectid import ObjectId

documents = []

for _ in range(20):
    # 创建一个包含随机数据的字典
    data = {
        "_id": {
            "$oid": str(ObjectId())  # 使用 ObjectId 函数来生成一个新的 ObjectId
        },
        "title": "test",
        "content": str(random.randint(1, 100)),
        "group": "general",
        "username": "Admin",
        "postAnonymous": "false",
        "pictures": 0,
        "pictureUrl": [],
        "postingtime": (datetime.now() + timedelta(days=random.randint(1, 365))).strftime("%Y-%m-%d %H:%M:%S"),
    }
    documents.append(data)

# 将 documents 保存为一个 JSON 文件
with open('documents.json', 'w') as f:
    json.dump(documents, f)