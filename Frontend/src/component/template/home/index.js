import './index.css';
import Sidebar from '../../organism/sidebar';
import BrandExample from '../../organism/navbar';
import Card from '../../organism/card'
import { BrowserRouter as Router } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { App } from '../../organism/gantt';



let Home = ()=>{
    return(  
      <div className='d-flex'>
        <div className='w-auto'>
            <Sidebar/>
        </div>
        <div className='col'>
            <BrandExample/>
            <div className='row'>
                <div className='col'>
                  <Card/>
                  <App/>
                </div>  

            </div>
            
           
            
        </div>

      </div>
      
    )
}
export default Home;