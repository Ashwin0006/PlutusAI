import exiftool
import hashlib
from datetime import datetime

class MetadataAnalyzer:
    def analyze_file(self, file_path):
        with exiftool.ExifToolHelper() as et:
            metadata = et.get_metadata(file_path)[0]
            
        creation_date = metadata.get('EXIF:DateTimeOriginal', '')
        software_used = metadata.get('EXIF:Software', '')
        
        return {
            "creation_date": creation_date,
            "software_used": software_used,
            "hash_consistency": self._check_hash_consistency(file_path)
        }
    
    def _check_hash_consistency(self, file_path):
        # Compare with known document hashes
        with open(file_path, "rb") as f:
            file_hash = hashlib.sha256(f.read()).hexdigest()
        return {"hash": file_hash, "valid": False}