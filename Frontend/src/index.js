import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './component/page/home';
import Region from './component/template/region';
import store from './handler/store'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './component/page/errorPage/404';
import Layout from './component/page/layout';
import Register from './component/page/register/register';
import Login from './component/page/login/login';
import Employee from './component/page/employee/employee';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   {/* <App/> */}
  //   {/* <Home></Home> */}
  //   {/* <Region></Region> */}

  // </React.StrictMode>

  <Provider store = {store}>
    {/* <App></App> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='region' element={<Region/>}/>
          <Route path='employee' element={<Employee/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
