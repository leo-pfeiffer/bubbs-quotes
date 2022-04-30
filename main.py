from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from dao import dao
from pydantic import BaseModel

app = FastAPI()

app.mount("/static", StaticFiles(directory="static", html=True), name="static")


class Quote(BaseModel):
    quote: str


class QuoteId(BaseModel):
    quote_id: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.get("/quote/random")
async def quote_random():
    quote = await dao.get_random_quote()
    return {'quote': quote}


@app.get("/quote/daily")
async def quote_daily():
    quote = await dao.get_daily_quote()
    return {'quote': quote}


@app.get("/quote/all")
async def quote_all():
    quotes = await dao.get_all_quotes()
    return {'quotes': quotes}


@app.post("/quote/add")
async def quote_add(quote: Quote):
    await dao.insert_new_quote(quote)
    return {'detail': 'quote added'}


@app.post("/quote/delete")
async def quote_delete(quote_id: QuoteId):
    await dao.delete_quote(quote_id.quote_id)
    return {'detail': 'quote deleted'}


@app.get("/author/daily")
async def author_daily():
    return {'name': dao.get_daily_name()}
