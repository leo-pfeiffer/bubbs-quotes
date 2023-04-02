from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from utils import get_daily_rand, get_random_index

load_dotenv()


class DataAccess:
    def __init__(self):
        database = os.getenv('DATABASE')
        user = os.getenv('DBUSER')
        password = os.getenv('DBPASSWORD')
        db_ip = os.getenv('DBIP')
        collection = os.getenv('DBCOLLECTION')
        url = f'mongodb://{user}:{password}@{db_ip}:27017/'
        self.client = AsyncIOMotorClient(url)
        self.db = self.client[database]
        self.collection = self.db[collection]

    @staticmethod
    def _unnest_object_id(obj: dict):
        obj['_id'] = str(obj['_id'])
        return obj

    @staticmethod
    def _unnest_object_ids(objects: list[dict]):
        for obj in objects:
            DataAccess._unnest_object_id(obj)
        return objects

    async def get_random_quote(self) -> dict:
        res = await self.collection.aggregate([{'$sample': {'size': 1}}]).to_list(1)
        return self._unnest_object_id(res[0])

    async def get_daily_quote(self) -> dict:
        cursor = await self.collection.find({}, {'_id': 1}).to_list(1000)
        res = [x['_id'] for x in cursor]

        rnd = get_daily_rand()
        idx = get_random_index(len(res), rnd)

        today = await self.collection.find_one({'_id': res[idx]})

        return self._unnest_object_id(today)

    async def get_all_quotes(self) -> list[dict]:
        cursor = await self.collection.find({}, {'_id': 1, 'quote': 1}).to_list(1000)
        return self._unnest_object_ids(cursor)

    async def insert_new_quote(self, quote) -> None:
        doc = {'quote': quote.quote}
        self.collection.insert_one(doc)

    async def delete_quote(self, quote_id) -> None:
        self.collection.delete_one({'_id': ObjectId(quote_id)})

    @staticmethod
    def get_daily_name() -> str:
        names = ['Lelo', 'Bubby', 'Leo', 'Your Bubby']
        rnd = get_daily_rand()
        idx = get_random_index(len(names), rnd)
        return names[idx]


dao = DataAccess()
