import { Outlet } from "react-router-dom"
import Header from "../Nav Header/Header"
import SideBar from "./Sidebar/Sidebar"
import './AdminManager.scss'
const AdminManager = () => {
    return (
        <div className="Admin-container">
        <div className="Admin-SideBar">
            <SideBar  />
        </div>
        <div className="Admin-content" >
            <Header/>
            <div style={{marginTop:'80px'}}>
                <Outlet />
            </div>
            
        </div>

    </div>
    )
}
export default AdminManager