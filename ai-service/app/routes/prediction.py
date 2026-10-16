from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import io
import os
import json
import numpy as np
import tensorflow as tf

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)

# ============================================================
# BASE DIRECTORY
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

# ============================================================
# MODEL PATHS
# ============================================================

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "ayurscan_6class_finetuned_best.keras"
)

CLASS_PATH = os.path.join(
    BASE_DIR,
    "model",
    "classes_6class.json"
)

# ============================================================
# UNKNOWN THRESHOLD
# ============================================================

# Based on your threshold testing:
# 0.75 gave:
# Known accepted accuracy = 86.40%
# Unknown detection = 50.42%

UNKNOWN_THRESHOLD = 0.75

# ============================================================
# STARTUP LOGS
# ============================================================

print("=" * 60)
print("AYURSCAN AI SERVICE")
print("=" * 60)

print("Model path:", MODEL_PATH)
print("Classes path:", CLASS_PATH)
print("Unknown threshold:", UNKNOWN_THRESHOLD)

# ============================================================
# LOAD MODEL
# ============================================================

model = None
class_names = []

if os.path.exists(MODEL_PATH):

    try:

        print("Loading 6-class plant model...")

        model = tf.keras.models.load_model(
            MODEL_PATH
        )

        print("✅ 6-class plant model loaded successfully.")

    except Exception as e:

        print("❌ ERROR loading model:")
        print(str(e))

else:

    print("❌ WARNING: Model not found:")
    print(MODEL_PATH)


# ============================================================
# LOAD CLASSES
# ============================================================

if os.path.exists(CLASS_PATH):

    try:

        with open(CLASS_PATH, "r") as f:
            class_names = json.load(f)

        print("✅ Classes loaded:")
        print(class_names)

    except Exception as e:

        print("❌ ERROR loading classes:")
        print(str(e))

else:

    print("❌ WARNING: classes_6class.json not found:")
    print(CLASS_PATH)


# ============================================================
# VALIDATE CLASS CONFIGURATION
# ============================================================

if len(class_names) == 6:

    print("✅ 6 classes detected.")

else:

    print(
        f"⚠️ WARNING: Expected 6 classes, "
        f"found {len(class_names)}"
    )


# ============================================================
# PREDICTION API
# ============================================================

@router.post("/")
async def predict_plant(
    file: UploadFile = File(...)
):

    # ========================================================
    # CHECK MODEL
    # ========================================================

    if model is None:

        raise HTTPException(
            status_code=503,
            detail="Plant classification model is not loaded"
        )

    # ========================================================
    # CHECK CLASSES
    # ========================================================

    if len(class_names) != 6:

        raise HTTPException(
            status_code=500,
            detail=(
                "Invalid plant class configuration. "
                "Expected 6 classes."
            )
        )

    # ========================================================
    # CHECK FILE TYPE
    # ========================================================

    if (
        not file.content_type
        or not file.content_type.startswith("image/")
    ):

        raise HTTPException(
            status_code=400,
            detail="Only image files are allowed"
        )

    # ========================================================
    # READ IMAGE
    # ========================================================

    image_bytes = await file.read()

    if not image_bytes:

        raise HTTPException(
            status_code=400,
            detail="Empty image file"
        )

    try:

        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Invalid image file"
        )

    # ========================================================
    # PREPROCESS IMAGE
    # ========================================================

    image = image.resize(
        (224, 224)
    )

    image_array = np.array(
        image
    ).astype(np.float32)

    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    # IMPORTANT:
    # Do NOT divide by 255.
    #
    # Your MobileNetV2 model already contains
    # the required preprocessing layer.
    #
    # ========================================================

    # ========================================================
    # MODEL PREDICTION
    # ========================================================

    predictions = model.predict(
        image_array,
        verbose=0
    )

    probabilities = predictions[0]

    # ========================================================
    # TOP PREDICTION
    # ========================================================

    predicted_index = int(
        np.argmax(probabilities)
    )

    confidence = float(
        probabilities[predicted_index]
    )

    raw_prediction = class_names[
        predicted_index
    ]

    # ========================================================
    # UNKNOWN LOGIC
    # ========================================================

    # Case 1:
    # Model itself predicts Unknown
    #
    if raw_prediction == "Unknown":

        prediction = "Unknown"

        print(
            f"⚠️ Model predicted Unknown "
            f"({confidence:.4f})"
        )

    # Case 2:
    # Model predicts a known plant but confidence
    # is below our threshold
    #
    elif confidence < UNKNOWN_THRESHOLD:

        prediction = "Unknown"

        print(
            f"⚠️ Low confidence: "
            f"{raw_prediction} "
            f"({confidence:.4f}) "
            f"→ Unknown"
        )

    # Case 3:
    # Confident known-plant prediction
    #
    else:

        prediction = raw_prediction

        print(
            f"✅ Prediction: "
            f"{prediction} "
            f"({confidence:.4f})"
        )

    # ========================================================
    # MESSAGE
    # ========================================================

    if prediction == "Unknown":

        message = (
            "Plant could not be identified "
            "with sufficient confidence"
        )

    else:

        message = (
            "Plant prediction successful"
        )

    # ========================================================
    # RESPONSE
    # ========================================================

    return {

        "success": True,

        "filename": file.filename,

        "prediction": prediction,

        "confidence": confidence,

        "threshold": UNKNOWN_THRESHOLD,

        "rawPrediction": raw_prediction,

        "message": message
    }