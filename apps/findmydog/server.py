from typing import Union
from publickey_gen import get_airtag_key
from fastapi import FastAPI

app = FastAPI()


@app.get("/nowkey")
def read_root():
    key = get_airtag_key()
    return {"key": key}
