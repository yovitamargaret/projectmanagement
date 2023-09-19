import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './component/template/home';
import store from './handler/store'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './component/page/errorPage/404';
import Layout from './component/page/layout';
import Task from './component/page/task';
import Register from './component/page/register/register';
import Login from './component/page/login/login';
import Employee from './component/page/employee/employee';
import ForgotPassword from './component/page/forgotPassword/forgotPassword';
import GanttChart from './component/template/gantt';
import ProjectApprovePage from './component/template/approval_project';
import { AuthProvider } from './features/authentication/AuthProvider';
import RequireAuth from './features/authentication/RequireAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   {/* <App/> */}
  //   {/* <Home></Home> */}
  //   {/* <Region></Region> */}

  // </React.StrictMode>
  
  <Provider store = {store}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='forgotpassword' element={<ForgotPassword/>}/>

            <Route element={<RequireAuth />}>
              <Route index element={<Home/>}/>
              <Route path='gantt' element={<GanttChart/>}/>
              <Route path='task/:project_id' element={<Task/>}/>
              <Route path='approval_project' element={<ProjectApprovePage/>} />
              <Route path='employee' element={<Employee/>}/>
            </Route>

            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
