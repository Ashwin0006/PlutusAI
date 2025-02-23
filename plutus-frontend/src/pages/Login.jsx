import { useNavigate } from "react-router-dom";
import "../styles/login.css"
import { useState } from "react";

function LoginScreen() {
    const navigate = useNavigate();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword] = useState("");

    async function validate() {

        const formData = {email, password};

        try{
            const res = await fetch("http://127.0.0.1:5000/checkLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            // console.log(data)
            if(res.ok){
                if(data.user == "employee")
                    navigate(`/employee/home/${data.id}`)
                else if(data.user == "user")
                    navigate(`/customer/home/${data.id}`)
            }
            else{
                console.error("Login failed:", data.message);
            }

        }
        catch(e){
            console.error("Login failed:", e);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen b-screen">
            <div className="form-container w-sm m-3">
                <p className="title">Welcome back! 😊</p>
                <form className="form" action={validate}>
                    <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <p className="page-link">
                        <span className="page-link-label">Forgot Password?</span>
                    </p>
                    <input className="form-btn" type="submit" value="Log in"/>
                </form>
                <p className="sign-up-label" onClick={() => navigate("/signup")}>
                    <center>
                        Don't have an account?<span className="sign-up-link">Sign up</span>
                    </center>  
                </p>
            </div>
        </div>
        
    )
}

export default LoginScreen;