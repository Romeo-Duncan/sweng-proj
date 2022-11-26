import { useState } from "react"

import UserConfig from "./components/AdminApp/UserConfig.js"
import CreateUser from "./components/AdminApp/CreateUser.js"

import "./App.css"

function AdminApp(props){  
    const [userConfigShow, setUserConfigShow] = useState(false)
    const [createUserShow, setCreateUserShow] = useState(false)    

    return(
        <>
            <div class="container dashboard-container">
                <button type="button" onClick={() => setUserConfigShow(true)} class="btn btn-primary dashboard-action-button"></button>
                ADMIN APPLICATION 
                <UserConfig 
                    show={userConfigShow}
                    onHide={() => setUserConfigShow(false)}
                    onCreateUserRequest={() => {
                        setUserConfigShow(false)
                        setCreateUserShow(true)
                    }}
                /> 
                <CreateUser
                    show={createUserShow}
                    onHide={() => setCreateUserShow(false)}
                    onUserAccountCreated = {() => setCreateUserShow(false)}
                />                   
            </div>            
        </>
    )
}

export default AdminApp