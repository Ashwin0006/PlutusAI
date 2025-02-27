import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeHome from './pages/EmployeeHome';
import CustomerHome from './pages/CustomerHome';
import LoginScreen from './pages/Login';
import SignUp from './pages/SignUp';
import UserInfo from './pages/UserInfo';
import AdminDashboard from './pages/AdminDashboard';
import ReviewStatus from './pages/ReviewStatus'; 
import BlockchainExplorer from './pages/BlockchainExplorer'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/employee/home/:empId" element={<EmployeeHome />} />
        <Route path="/customer/home/:userId" element={<CustomerHome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userinfo/:email" element={<UserInfo />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/review-status/:docId" element={<ReviewStatus />} />
        <Route path="/blockchain-explorer" element={<BlockchainExplorer />} /> 

      </Routes>
    </Router>
  );
}

export default App;