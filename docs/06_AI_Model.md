# AI Model Documentation

# AyurScan

### Enterprise AI-Powered Medicinal Plant Intelligence Platform

---

# Document Information

| Field | Details |
|--------|---------|
| Document | AI Model Documentation |
| Version | 1.0 |
| Model | EfficientNetB0 (Transfer Learning) |
| Framework | TensorFlow |
| Author | Shrasti  |
| Date | July 2026 |

---

# 1. Purpose

This document describes the Artificial Intelligence pipeline used in AyurScan for medicinal plant identification. It covers dataset preparation, preprocessing, model selection, training strategy, evaluation metrics, explainability, and deployment.

---

# 2. Problem Statement

Develop an image classification model capable of accurately identifying **five medicinal plants** from leaf images.

The model should provide:

- Plant Name
- Confidence Score
- Explainable AI Visualization (Grad-CAM)

---

# 3. Supported Plant Classes

| Class | Scientific Name |
|--------|-----------------|
| Tulsi | Ocimum tenuiflorum |
| Neem | Azadirachta indica |
| Aloe Vera | Aloe vera |
| Giloy | Tinospora cordifolia |
| Ashwagandha | Withania somnifera |

---

# 4. Dataset

## Dataset Source

The dataset will be created by combining:

- Kaggle Plant Image Datasets
- Public research datasets
- Self-curated images
- Manually verified images

Only verified and high-quality images will be included.

---

## Dataset Size (Planned)

| Plant | Images |
|--------|--------|
| Tulsi | 100 |
| Neem | 100 |
| Aloe Vera | 100 |
| Giloy | 100 |
| Ashwagandha | 100 |

**Total Images:** 500

---

## Dataset Split

| Dataset | Percentage |
|----------|------------|
| Training | 70% |
| Validation | 15% |
| Testing | 15% |

---

# 5. Data Preprocessing

The following preprocessing steps will be applied:

- Image resizing (224 × 224)
- RGB conversion
- Pixel normalization
- Duplicate image removal
- Corrupted image filtering

---

# 6. Data Augmentation

To improve model generalization, the following augmentation techniques will be applied:

- Random Rotation
- Horizontal Flip
- Zoom
- Brightness Adjustment
- Width Shift
- Height Shift

---

# 7. Model Selection

## Selected Model

EfficientNetB0

### Reason for Selection

- High accuracy
- Lightweight architecture
- Faster inference
- Suitable for transfer learning
- Lower computational cost

---

# 8. Transfer Learning Strategy

- Load ImageNet pre-trained weights
- Freeze base layers initially
- Train custom classification head
- Fine-tune upper layers
- Save best-performing model

---

# 9. Model Architecture

Input Image

↓

EfficientNetB0 Backbone

↓

Global Average Pooling

↓

Dropout

↓

Dense Layer

↓

Softmax Output (5 Classes)

---

# 10. Hyperparameters (Planned)

| Parameter | Value |
|-----------|-------|
| Input Size | 224 × 224 |
| Batch Size | 16 |
| Epochs | 20–30 |
| Optimizer | Adam |
| Learning Rate | 0.0001 |
| Loss Function | Categorical Crossentropy |
| Activation | Softmax |

---

# 11. Evaluation Metrics

The following metrics will be used:

- Accuracy
- Precision
- Recall
- F1 Score
- Confusion Matrix

---

# 12. Explainable AI

AyurScan uses **Grad-CAM** to visualize the regions of the image that influenced the prediction.

Benefits:

- Improves transparency
- Helps users understand AI decisions
- Increases trust in predictions

---

# 13. Model Deployment

The trained TensorFlow model will be exported and served through a FastAPI microservice.

Prediction flow:

User Image

↓

FastAPI

↓

TensorFlow Model

↓

Prediction

↓

Confidence Score

↓

Grad-CAM

↓

Backend API

↓

Frontend

---

# 14. Current Limitations

- Supports only five medicinal plants
- Requires clear leaf images
- Background clutter may reduce prediction accuracy
- Offline inference only

---

# 15. Future Improvements

- Support additional plant species
- Plant disease detection
- ONNX optimization
- TensorFlow Lite support
- Mobile inference
- Active learning pipeline

---

# 16. Conclusion

The AI component of AyurScan is designed to prioritize prediction accuracy over the number of supported classes. By combining transfer learning, curated datasets, and Explainable AI, the system provides reliable medicinal plant identification suitable for educational and research purposes.