from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from data_access import DataAccess
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static", html=True), name="static")


class Quote(BaseModel):
    quote: str


class QuoteId(BaseModel):
    quote_id: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/quote/random")
async def quote_random():
    quote = await DataAccess.get_random_quote()
    return {'quote': quote}


@app.get("/quote/daily")
async def quote_daily():
    quote = await DataAccess.get_daily_quote()
    return {'quote': quote}


@app.get("/quote/all")
async def quote_all():
    quotes = await DataAccess.get_all_quotes()
    return {'quotes': quotes}


@app.post("/quote/add")
async def quote_add(quote: Quote):
    await DataAccess.insert_new_quote(quote)
    return {'detail': 'quote added'}


@app.post("/quote/delete")
async def quote_delete(quote_id: QuoteId):
    await DataAccess.delete_quote(quote_id.quote_id)
    return {'detail': 'quote deleted'}


@app.get("/author/daily")
async def author_daily():
    return {'name': DataAccess.get_daily_name()}
