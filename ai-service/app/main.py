from fastapi import FastAPI

from prometheus_fastapi_instrumentator import Instrumentator

from app.routes.prediction import router as prediction_router


app = FastAPI(
    title="AyurScan AI Service",
    description="AI service for medicinal plant identification",
    version="1.0.0",
)


app.include_router(prediction_router)


@app.get("/")
def root():
    return {
        "message": "AyurScan AI Service is running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "ai-service"
    }

# ==============================
# Prometheus Metrics
# ==============================

Instrumentator().instrument(app).expose(
    app,
    endpoint="/metrics"
)
