import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { UserCircle, CreditCard, Banknote, ShieldCheck, Wallet } from "lucide-react";
import "../styles/glow.css"; 

export default function UserInfo() {
    const location = useLocation();
    const userData = location.state || {}; 

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900 flex flex-col items-center p-10">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="flex items-center gap-6 p-6 bg-white shadow-xl rounded-xl border border-purple-300 w-full max-w-3xl hover:shadow-purple-500 transition-all"
            >
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full"
                >
                    <UserCircle size={80} className="text-white" />
                </motion.div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 glow-text">{userData.name}</h1>
                    <p className="text-gray-500">{userData.email}</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl">
                <ProfileCard 
                    icon={<Wallet size={40} className="text-blue-500" />} 
                    title="Account Balance" 
                    value={`$${userData.balance}`} 
                />

                <ProfileCard 
                    icon={<Banknote size={40} className="text-green-500" />} 
                    title="Account Type" 
                    value={`${userData.account_type} - ${userData.account_number}`} 
                />

                <ProfileCard 
                    icon={<ShieldCheck size={40} className="text-purple-500" />} 
                    title="Credit Score" 
                    value={userData.credit_score} 
                />

                <ProfileCard 
                    icon={<CreditCard size={40} className="text-red-500" />} 
                    title="Linked Cards" 
                    value={userData.cards?.join(", ")} 
                />

                <ProfileCard 
                    icon={<Banknote size={40} className="text-orange-500" />} 
                    title="Active Loans" 
                    value={userData.loans?.join(", ")} 
                />

                <ProfileCard 
                    icon={<ShieldCheck size={40} className="text-indigo-500" />} 
                    title="Insurance" 
                    value={userData.insurance?.join(", ")} 
                />
            </div>

            {/* Recent Transactions */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="mt-8 w-full max-w-4xl bg-white p-6 shadow-lg rounded-xl border border-blue-300 hover:shadow-blue-500 transition-all"
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
                <div className="space-y-3">
                    {userData.recent_transactions?.map((txn, index) => (
                        <motion.div 
                            key={index} 
                            whileHover={{ scale: 1.02 }}
                            className="flex justify-between p-3 bg-gray-50 rounded-lg shadow-md border-l-4 border-blue-400 transition-all"
                        >
                            <span>{txn.description}</span>
                            <span className={`font-semibold ${txn.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
                                {txn.type === "Credit" ? "+" : "-"}${txn.amount}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

const ProfileCard = ({ icon, title, value }) => {
    return (
        <motion.div 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(173, 127, 255, 0.5)" }} 
            className="p-6 bg-white shadow-md rounded-xl border border-gray-200 flex flex-col items-center text-center transition-all"
        >
            {icon}
            <h3 className="text-lg font-semibold text-gray-800 mt-3">{title}</h3>
            <p className="text-gray-600 text-sm">{value}</p>
        </motion.div>
    );
};
