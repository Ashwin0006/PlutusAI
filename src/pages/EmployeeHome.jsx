import { useParams } from "react-router-dom";

function EmployeeHome() {
    const params = useParams();
    const user = params.empId;
    return(
        <div>
            Welcome Home Employee {user}!
        </div>
    )
}

export default EmployeeHome;