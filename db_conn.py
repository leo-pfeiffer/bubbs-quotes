import asyncio

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()


class _DatabaseConnection:
    DATABASE = os.getenv('MONGO_DATABASE')
    USER = os.getenv('MONGO_USER')
    PASSWORD = os.getenv('MONGO_PASSWORD')
    HOST = os.getenv('MONGO_HOST')
    COLLECTION = os.getenv('MONGO_COLLECTION')
    URL = f'mongodb://{USER}:{PASSWORD}@{HOST}:27017/{DATABASE}?retryWrites=true&w=majority'

    _client = AsyncIOMotorClient(URL)
    _client.get_io_loop = asyncio.get_running_loop
    _db = _client[DATABASE]
    _collection = _db[COLLECTION]

    @staticmethod
    def client():
        return _DatabaseConnection._client

    @staticmethod
    def collection():
        return _DatabaseConnection._collection


db = _DatabaseConnection()

