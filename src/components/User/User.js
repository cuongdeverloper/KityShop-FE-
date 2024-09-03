import { Outlet } from "react-router-dom"
import Header from "../Nav Header/Header"

const User = () =>{
    return(
        <div className="User-container">
            <Header/>
            <Outlet/>
        </div>
    )
}
export default User