import Sidebar from "../../organism/sidebar";
import BrandExample from "../../organism/navbar";
import { Outlet } from 'react-router-dom';
import './index.css'

let Layout = () => {
    return(
        <div className='d-flex'>
            <div className='w-auto'>
                <Sidebar/>
            </div>
            <div className='col'>
                    <BrandExample/>
                
                {/* <div className='row'> */}
                    <div className='col'>
                            <Outlet/>
                     
                    </div>  
    
                {/* </div> */}
                
               
                
            </div>
    
          </div>

    )
}

export default Layout;