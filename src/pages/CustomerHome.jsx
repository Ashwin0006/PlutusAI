import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion"; 
import { Upload, FileText, UserCircle } from "lucide-react"; 
import "../styles/glow.css";

function CustomerHome() {
    const params = useParams();
    const navigate = useNavigate();
    const user = params.userId;

    async function handleUser() {
        try{
            const res = await fetch(`http://127.0.0.1:5000/getDetails/${user}`);

            if(res.ok){
                const data = await res.json();
                navigate("/userInfo", { state: data });
            }
            else{
                console.log("Error: Not good Response");
            }
        }
        catch(e){
            console.log("Error:", e);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 text-gray-900">
            <header className="flex justify-between items-center p-6 shadow-md bg-gradient-to-br from-blue-600 to-purple-600">
                {/* <img src="/logo.png" className="w-12 md:w-16 lg:w-20 h-auto" alt="Plutus.AI Logo" /> */}
                <h1 className="text-2xl font-bold tracking-widest text-pink-300">Plutus.AI</h1>
                <UserCircle size={36} className="text-emerald-300 cursor-pointer hover:text-purple-500 transition-all" onClick={handleUser}/>
            </header>


            <div className="flex flex-col items-center justify-center mt-16">
                <h1 className="text-3xl font-extrabold text-gray-800 flex justify-center flex-col items-center">
                    Welcome, <span className="text-purple-600">{user}!</span>
                </h1>
                <p className="text-lg text-gray-600 mt-2">Manage your documents securely.</p>

                <div className="mt-8 flex space-x-6">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="cyber-button flex flex-col items-center p-5 bg-white shadow-md border border-purple-300 rounded-xl hover:shadow-purple-400"
                    >
                        <Upload size={40} className="text-purple-500" />
                        <span className="mt-2 font-medium text-gray-700">Upload Documents</span>
                    </motion.button>

                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="cyber-button flex flex-col items-center p-5 bg-white shadow-md border border-blue-300 rounded-xl hover:shadow-blue-400"
                    >
                        <FileText size={40} className="text-blue-500" />
                        <span className="mt-2 font-medium text-gray-700">Review Status</span>
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default CustomerHome;
