import { Outlet } from "react-router-dom"
import Header from "../Nav Header/Header"
import './ShopProduct.scss'
import Footer from "../Footer/Footer"
const ShopProduct = () =>{
    return(
        <div className="ShopProduct-container">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default ShopProduct