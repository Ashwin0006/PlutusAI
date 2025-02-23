from flask import Flask, request, jsonify
from flask_cors import CORS  
import os
from document_verification.verification_orchestrator import DocumentVerifier
app = Flask(__name__)
CORS(app)

# Folder for uploading documents!
UPLOAD_FOLDER = "user_submissions"
os.makedirs(UPLOAD_FOLDER, exist_ok=True) 
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
user_documents = {}

emp_creds = {
        ("ash@gmail.com", "Ash123"),
        ("admin@gmail.com", "admin")
    }

user_creds = {
    ("user1@gmail.com", "user123"),
    ("user2@gmail.com", "user123")
}

details = {
    "user1@gmail.com": {
        "name": "User 1",
        "age": 32,
        "dob": "1992-04-15",
        "phone": "+1-555-1234",
        "address": "123 Cyberpunk Street, New York, NY",
        "account_number": "123456789012",
        "account_type": "Savings",
        "branch_name": "Downtown NYC",
        "ifsc_code": "NYC0001234",
        "balance": 5200.75,
        "credit_score": 720,
        "kyc_status": "Completed",
        "linked_pan": "ABCDE1234F",
        "linked_aadhar": "1234-5678-9012",
        "cards": ["Visa Debit - **** 1234", "Mastercard Credit - **** 5678"],
        "loans": ["Home Loan - $50,000 (Active)", "Car Loan - $20,000 (Closed)"],
        "insurance": ["Life Insurance - $100,000", "Health Insurance - Active"],
        "recent_transactions": [
            {"date": "2025-02-18", "type": "Debit", "amount": 150.50, "description": "Amazon Purchase"},
            {"date": "2025-02-17", "type": "Credit", "amount": 2000.00, "description": "Salary Credit"},
            {"date": "2025-02-16", "type": "Debit", "amount": 75.25, "description": "Netflix Subscription"},
            {"date": "2025-02-15", "type": "Debit", "amount": 250.00, "description": "Grocery Store"},
            {"date": "2025-02-14", "type": "Credit", "amount": 500.00, "description": "Freelance Payment"},
        ]
    }
}



@app.route("/checkLogin", methods=["POST", "GET"])
def checkLogin():
    data = request.json
    email = data["email"]
    password = data["password"]

    if (email, password) in emp_creds:
        return jsonify({"message": "Valid", "user": "employee", "id": email}), 200
    elif (email, password) in user_creds:
        return jsonify({"message": "Valid", "user": "user", "id": email}), 200
    else:
        return jsonify({"message": "Invalid credentials", "user": None, "code": "invalid_creds"}), 401
    
@app.route("/register", methods=["POST", "GET"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    for user, _ in user_creds:
        if user == email:
            return jsonify({"message": "Already Existing User", "code": "existing_user"}), 401
    
    user_creds.add((email, password))

    return jsonify({"message": "Registration Done", "code": "OK"}), 200

@app.route("/getDetails/<email>", methods=["GET"])
def getDetails(email):
    det = details.get(email, None)
    if det:
        return jsonify(det), 200
    return jsonify({"message": "User not found"}), 404


@app.route("/uploadDocuments/<email>", methods=["POST"])
def upload_documents(email):
    files = request.files.getlist("files")

    if not email:
        return jsonify({"message": "Email is required in URL"}), 400

    if not files or files[0].filename == "":
        return jsonify({"message": "No files selected"}), 400
    
    user_folder = os.path.join(app.config["UPLOAD_FOLDER"], email)
    os.makedirs(user_folder, exist_ok=True)

    uploaded_files = []
    for file in files:
        file_path = os.path.join(user_folder, file.filename)

        try:
            file.save(file_path)
            doc_id = len(user_documents) + 1 
            user_documents[doc_id] = {
                "email": email,
                "filename": file.filename,
                "path": file_path,
                "status": "Pending"
            }
            uploaded_files.append({
                "doc_id": doc_id,  # Include document ID
                "filename": file.filename,
                "status": "Pending"
            })
        except Exception as e:
            return jsonify({"message": f"Error saving {file.filename}: {str(e)}"}), 500

    return jsonify({
        "message": "Files uploaded successfully!",
        "uploaded_files": uploaded_files
    }), 201

@app.route("/verify-document/<doc_id>", methods=["GET"])
def get_verification(doc_id):
    doc = user_documents.get(int(doc_id))
    if not doc:
        return jsonify({"error": "Document not found"}), 404
    
    verifier = DocumentVerifier()
    results = verifier.verify_document(doc['path'])
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)