from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import io

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"],
)


@router.post("/")
async def predict_plant(
    file: UploadFile = File(...)
):
    # Check file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Only image files are allowed"
        )

    # Read image
    image_bytes = await file.read()

    try:
        image = Image.open(io.BytesIO(image_bytes))
        image.verify()
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid image file"
        )

    # Temporary prediction
    # Real ML model will be connected here
    return {
        "success": True,
        "filename": file.filename,
        "prediction": "Tulsi",
        "confidence": 0.95,
        "message": "Prediction API is working"
    }