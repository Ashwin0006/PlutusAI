import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeHome from "./pages/EmployeeHome";
import CustomerHome from "./pages/CustomerHome";
import LoginScreen from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserInfo from "./pages/UserInfo";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/employee/home/:empId" element={<EmployeeHome />} />
        <Route path="/customer/home/:userId" element={<CustomerHome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
    </Router>
  )
}

export default App;