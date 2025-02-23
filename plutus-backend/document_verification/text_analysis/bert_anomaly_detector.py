from transformers import BertTokenizer, BertForSequenceClassification
import torch

class TextAnomalyDetector:
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertForSequenceClassification.from_pretrained('models/bert-base-uncased')
        
    def analyze_text(self, text):
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
        outputs = self.model(**inputs)
        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
        return {
            "anomaly_score": probabilities[0][1].item(),
            "entities": self._extract_entities(text)
        }
    
    def _extract_entities(self, text):
        # Implement NER using spaCy or similar
        return []