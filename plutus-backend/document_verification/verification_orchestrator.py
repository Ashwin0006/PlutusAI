import pytesseract
from PIL import Image
from .text_analysis.bert_anomaly_detector import TextAnomalyDetector
from .image_forensics.error_level_analysis import ImageForensics
from .metadata_analysis.file_metadata import MetadataAnalyzer
import base64

class DocumentVerifier:
    def __init__(self):
        self.text_analyzer = TextAnomalyDetector()
        self.image_analyzer = ImageForensics()
        self.metadata_analyzer = MetadataAnalyzer()
        
    def verify_document(self, file_path):
        results = {}
        
        # Extract text using OCR
        text_content = self._extract_text(file_path)
        
        if text_content:
            results['text_analysis'] = self.text_analyzer.analyze_text(text_content)
            
        if file_path.lower().endswith(('.png', '.jpg', '.jpeg')):
            # Include original image in results
            with open(file_path, "rb") as image_file:
                original_image = base64.b64encode(image_file.read()).decode('utf-8')
            image_results = self.image_analyzer.analyze_image(file_path)
            image_results['original_image'] = original_image
            results['image_analysis'] = image_results
            
        results['metadata_analysis'] = self.metadata_analyzer.analyze_file(file_path)
        
        return self._generate_verdict(results)
    
    def _extract_text(self, file_path):
        """
        Extract text from a document using Tesseract OCR.
        """
        try:
            if file_path.lower().endswith(('.png', '.jpg', '.jpeg')):
                # For images, use Tesseract OCR
                text = pytesseract.image_to_string(Image.open(file_path))
                return text
            elif file_path.lower().endswith('.pdf'):
                # For PDFs, use PyPDF2 or similar
                from PyPDF2 import PdfReader
                reader = PdfReader(file_path)
                text = ""
                for page in reader.pages:
                    text += page.extract_text()
                return text
            else:
                # For other formats, attempt to read as text
                with open(file_path, 'r', encoding='utf-8') as file:
                    return file.read()
        except Exception as e:
            print(f"Error extracting text: {e}")
            return ""
    
    def _generate_verdict(self, results):
        """
        Generate a verdict based on combined analysis scores.
        """
        # Define weights for each analysis component
        weights = {
            'text_anomaly_score': 0.4,
            'tamper_score': 0.4,
            'metadata_consistency': 0.2
        }
        
        # Calculate overall score
        overall_score = (
            results.get('text_analysis', {}).get('anomaly_score', 0) * weights['text_anomaly_score'] +
            results.get('image_analysis', {}).get('tamper_score', 0) * weights['tamper_score'] +
            (1 if results.get('metadata_analysis', {}).get('hash_consistency', {}).get('valid', False) else 0) * weights['metadata_consistency']
        )
        
        # Determine verdict
        if overall_score > 0.7:
            return "Fraudulent"
        elif overall_score > 0.4:
            return "Suspicious"
        else:
            return "Genuine"