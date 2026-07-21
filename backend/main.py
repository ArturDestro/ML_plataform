from fastapi import FastAPI

app = FastAPI(title='ML Model Serving Plataform')

@app.get("/")
def health():
    return {'status': 'ok'}