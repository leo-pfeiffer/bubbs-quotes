from bson import ObjectId

from utils import get_daily_rand, get_random_index
from db_conn import db


class DataAccess:
    @staticmethod
    def _unnest_object_id(obj: dict):
        obj['_id'] = str(obj['_id'])
        return obj

    @staticmethod
    def _unnest_object_ids(objects: list[dict]):
        for obj in objects:
            DataAccess._unnest_object_id(obj)
        return objects

    @staticmethod
    async def get_random_quote() -> dict:
        res = await db.collection().aggregate([{'$sample': {'size': 1}}]).to_list(1)
        return DataAccess._unnest_object_id(res[0])

    @staticmethod
    async def get_daily_quote() -> dict:
        cursor = await db.collection().find({}, {'_id': 1}).to_list(1000)
        res = [x['_id'] for x in cursor]

        rnd = get_daily_rand()
        idx = get_random_index(len(res), rnd)

        today = await db.collection().find_one({'_id': res[idx]})

        return DataAccess._unnest_object_id(today)

    @staticmethod
    async def get_all_quotes() -> list[dict]:
        cursor = await db.collection().find({}, {'_id': 1, 'quote': 1}).to_list(1000)
        return DataAccess._unnest_object_ids(cursor)

    @staticmethod
    async def insert_new_quote(quote) -> None:
        doc = {'quote': quote.quote}
        db.collection().insert_one(doc)

    @staticmethod
    async def delete_quote(quote_id) -> None:
        db.collection().delete_one({'_id': ObjectId(quote_id)})

    @staticmethod
    def get_daily_name() -> str:
        names = ['Lelo', 'Bubby', 'Leo', 'Your Bubby']
        rnd = get_daily_rand()
        idx = get_random_index(len(names), rnd)
        return names[idx]
