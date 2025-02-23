import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/login.css"

function SignUp() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignUp(e) {
        e.preventDefault();

        const formData = { email, password };

        try {
            const res = await fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                console.log("Signup successful:", data.code);
                navigate("/login");
            } else {
                console.error("Signup failed:", data.message, data.code);
            }

        } catch (error) {
            console.error("Error during signup:", error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 b-screen">
            <div className="form-container w-sm m-3 p-6 bg-white shadow-lg rounded-lg">
                <p className="title text-center text-xl font-bold">Register Account 📝</p>
                <form className="form flex flex-col gap-4" onSubmit={handleSignUp}>
                    <input 
                        type="email" 
                        className="input border p-2 rounded" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        className="input border p-2 rounded" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="page-link text-sm text-gray-500 text-center">
                        <span className="cursor-pointer hover:underline">Forgot Password?</span>
                    </p>
                    <input type="submit" className="form-btn bg-blue-500 text-white py-2 rounded cursor-pointer" value="Sign Up"/>
                </form>
                <p className="sign-up-label text-center mt-4">
                    Already have an account? 
                    <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/login")}> Login</span>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
