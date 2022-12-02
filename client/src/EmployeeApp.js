import ViewAssignedOrders from "./components/EmployeeApp/ViewAssignedOrders.js"

import "./App.css"

function EmployeeApp(props){
    return(
        <>
            <div class="container dashboard-container">
                EMPLOYEE APPLICATION 
            </div>
            <ViewAssignedOrders/>
        </>
    )
}

export default EmployeeApp