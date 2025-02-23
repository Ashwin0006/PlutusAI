import cv2
import numpy as np
from tensorflow.keras.models import load_model

class ImageForensics:
    def __init__(self):
        self.ela_model = load_model('models/ela_cnn.h5')
        
    def analyze_image(self, image_path):
        # Error Level Analysis
        ela_image = self._perform_ela(image_path)
        prediction = self.ela_model.predict(np.expand_dims(ela_image, axis=0))
        return {
            "tamper_score": float(prediction[0][0]),
            "ela_image": ela_image.tolist()
        }
    
    def _perform_ela(self, image_path, quality=90):
        orig = cv2.imread(image_path)
        temp_path = "temp.jpg"
        cv2.imwrite(temp_path, orig, [cv2.IMWRITE_JPEG_QUALITY, quality])
        temp = cv2.imread(temp_path)
        diff = 15 * cv2.absdiff(temp, orig)
        return diff