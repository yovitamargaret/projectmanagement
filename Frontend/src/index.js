import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Region from './component/template/region';
import store from './handler/store'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './component/page/errorPage/404';
import Layout from './component/page/layout';
import Sidebar from './component/organism/sidebar';
import BrandExample from './component/organism/navbar';
import Home from './component/template/home';
import ProjectApprovePage from './component/template/approval_project';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store = {store}>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Sidebar/>}>
        </Route>
        <Route index element={<Home/>}/> 
      <Route path='approval_project' element={<ProjectApprovePage/>}/>
      </Routes>
      </BrowserRouter>
        
      
 
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
