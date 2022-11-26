import { useState } from "react"

import CreateOrder from "./components/CustomerApp/CreateOrder.js"

import "./App.css"

function CustommerApp(props){
    const [createOrderShow, setCreateOrderShow] = useState(false)

    return(
        <>           
            <div class="container dashboard-container">
                <button type="button" onClick={() => setCreateOrderShow(true)} class="btn btn-primary dashboard-action-button"></button>
                CUSTOMER APPLICATION 

                <CreateOrder
                    show={createOrderShow}
                    onHide={() => setCreateOrderShow(false)}
                    onOrderCreated={() => setCreateOrderShow(false)}
                /> 
            </div>
        </>
    )
}

export default CustommerApp