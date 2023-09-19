import Sidebar from "../../organism/sidebar";
import BrandExample from "../../organism/navbar";
import { Outlet } from 'react-router-dom';
import './index.css'
import UserData from "../../../features/authentication/UserData";

let Layout = () => {
    return(
        <>
        <div className='d-flex'>
            <div className='w-auto' hidden={UserData().role_name === undefined ? true : false}>
                <Sidebar/>
            </div>
            <div className='col'>
                    <BrandExample/>    
                <div className='row'>
                    <div className='col'>
                        <Outlet/> 
                    </div>  
                </div>
            </div>
          </div>
        </>
    )
}

export default Layout;