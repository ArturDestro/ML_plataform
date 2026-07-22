from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import training, predictions, datasets

app = FastAPI(title='ML Model Serving Plataform')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(datasets.router, prefix="/datasets", tags=["datasets"])
app.include_router(training.router, prefix="/train", tags=["training"])
app.include_router(predictions.router, prefix="/predict", tags=["predictions"])

@app.get("/health")
def health():
    return {'status': 'ok'}